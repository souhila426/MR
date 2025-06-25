import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface CollaborationRequest {
  action: 'join' | 'leave' | 'edit' | 'cursor' | 'comment'
  documentId: string
  data?: any
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Vérifier l'authentification
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabaseClient.auth.getUser(token)

    if (!user) {
      throw new Error('Non autorisé')
    }

    const { action, documentId, data }: CollaborationRequest = await req.json()

    switch (action) {
      case 'join':
        return await handleJoinDocument(supabaseClient, user.id, documentId)
      
      case 'leave':
        return await handleLeaveDocument(supabaseClient, user.id, documentId)
      
      case 'edit':
        return await handleDocumentEdit(supabaseClient, user.id, documentId, data)
      
      case 'cursor':
        return await handleCursorUpdate(supabaseClient, user.id, documentId, data)
      
      case 'comment':
        return await handleComment(supabaseClient, user.id, documentId, data)
      
      default:
        throw new Error('Action non supportée')
    }

  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})

async function handleJoinDocument(supabaseClient: any, userId: string, documentId: string) {
  // Vérifier les permissions
  const { data: document } = await supabaseClient
    .from('collaborative_documents')
    .select(`
      *,
      workspace_id,
      workspaces(*)
    `)
    .eq('id', documentId)
    .single()

  if (!document) {
    throw new Error('Document non trouvé')
  }

  // Vérifier l'appartenance à l'espace de travail
  const { data: membership } = await supabaseClient
    .from('workspace_members')
    .select('*')
    .eq('workspace_id', document.workspace_id)
    .eq('user_id', userId)
    .eq('is_active', true)
    .single()

  if (!membership) {
    throw new Error('Accès non autorisé')
  }

  // Créer ou mettre à jour la session de collaboration
  const sessionToken = crypto.randomUUID()
  
  const { data: session } = await supabaseClient
    .from('collaboration_sessions')
    .upsert({
      document_id: documentId,
      user_id: userId,
      session_token: sessionToken,
      is_active: true,
      last_activity_at: new Date().toISOString()
    }, {
      onConflict: 'document_id,user_id'
    })
    .select()
    .single()

  // Mettre à jour le statut en ligne du collaborateur
  await supabaseClient
    .from('document_collaborators')
    .upsert({
      document_id: documentId,
      user_id: userId,
      is_online: true,
      last_seen_at: new Date().toISOString()
    }, {
      onConflict: 'document_id,user_id'
    })

  // Récupérer les collaborateurs actifs
  const { data: activeCollaborators } = await supabaseClient
    .from('document_collaborators')
    .select(`
      user_id,
      cursor_position,
      is_online,
      user_profiles(first_name, last_name, avatar_url)
    `)
    .eq('document_id', documentId)
    .eq('is_online', true)

  return new Response(
    JSON.stringify({
      success: true,
      data: {
        sessionToken,
        document,
        activeCollaborators
      }
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    }
  )
}

async function handleLeaveDocument(supabaseClient: any, userId: string, documentId: string) {
  // Marquer la session comme inactive
  await supabaseClient
    .from('collaboration_sessions')
    .update({
      is_active: false,
      last_activity_at: new Date().toISOString()
    })
    .eq('document_id', documentId)
    .eq('user_id', userId)

  // Marquer le collaborateur comme hors ligne
  await supabaseClient
    .from('document_collaborators')
    .update({
      is_online: false,
      last_seen_at: new Date().toISOString()
    })
    .eq('document_id', documentId)
    .eq('user_id', userId)

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Session fermée'
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    }
  )
}

async function handleDocumentEdit(supabaseClient: any, userId: string, documentId: string, editData: any) {
  const { operation, position, content, version } = editData

  // Vérifier que le document n'est pas verrouillé par un autre utilisateur
  const { data: document } = await supabaseClient
    .from('collaborative_documents')
    .select('is_locked, locked_by, version')
    .eq('id', documentId)
    .single()

  if (document.is_locked && document.locked_by !== userId) {
    throw new Error('Document verrouillé par un autre utilisateur')
  }

  // Enregistrer l'opération d'édition
  const { data: edit } = await supabaseClient
    .from('real_time_edits')
    .insert({
      document_id: documentId,
      user_id: userId,
      operation_type: operation.type,
      operation_data: operation,
      position_start: position?.start,
      position_end: position?.end,
      version_before: version,
      version_after: version + 1
    })
    .select()
    .single()

  // Mettre à jour le document
  await supabaseClient
    .from('collaborative_documents')
    .update({
      content: content,
      version: version + 1,
      updated_at: new Date().toISOString()
    })
    .eq('id', documentId)

  // Mettre à jour l'activité du collaborateur
  await supabaseClient
    .from('document_collaborators')
    .update({
      last_seen_at: new Date().toISOString()
    })
    .eq('document_id', documentId)
    .eq('user_id', userId)

  return new Response(
    JSON.stringify({
      success: true,
      data: {
        editId: edit.id,
        newVersion: version + 1
      }
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    }
  )
}

async function handleCursorUpdate(supabaseClient: any, userId: string, documentId: string, cursorData: any) {
  // Mettre à jour la position du curseur
  await supabaseClient
    .from('document_collaborators')
    .update({
      cursor_position: cursorData,
      last_seen_at: new Date().toISOString()
    })
    .eq('document_id', documentId)
    .eq('user_id', userId)

  // Mettre à jour la session
  await supabaseClient
    .from('collaboration_sessions')
    .update({
      cursor_position: cursorData,
      last_activity_at: new Date().toISOString()
    })
    .eq('document_id', documentId)
    .eq('user_id', userId)

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Curseur mis à jour'
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    }
  )
}

async function handleComment(supabaseClient: any, userId: string, documentId: string, commentData: any) {
  const { content, position, parentId } = commentData

  // Créer le commentaire
  const { data: comment } = await supabaseClient
    .from('comments')
    .insert({
      target_type: 'document',
      target_id: documentId,
      user_id: userId,
      content: content,
      position_data: position,
      parent_id: parentId
    })
    .select(`
      *,
      user_profiles(first_name, last_name, avatar_url)
    `)
    .single()

  // Notifier les autres collaborateurs
  const { data: collaborators } = await supabaseClient
    .from('document_collaborators')
    .select('user_id')
    .eq('document_id', documentId)
    .neq('user_id', userId)

  if (collaborators) {
    const notifications = collaborators.map(collab => ({
      user_id: collab.user_id,
      type: 'comment',
      title: 'Nouveau commentaire',
      message: `Un commentaire a été ajouté sur le document`,
      data: {
        document_id: documentId,
        comment_id: comment.id
      }
    }))

    await supabaseClient
      .from('notifications')
      .insert(notifications)
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: comment
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    }
  )
}