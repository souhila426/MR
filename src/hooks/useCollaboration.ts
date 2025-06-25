import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

interface Workspace {
  id: string
  name: string
  description?: string
  type: 'private' | 'public' | 'organization'
  created_by?: string
  created_at: string
}

interface WorkspaceMember {
  id: string
  user_id: string
  role: 'owner' | 'admin' | 'editor' | 'member' | 'viewer'
  permissions: string[]
  user_profiles: {
    first_name: string
    last_name: string
    avatar_url?: string
  }
}

interface CollaborativeDocument {
  id: string
  workspace_id: string
  title: string
  content: Record<string, any>
  version: number
  is_locked: boolean
  locked_by?: string
  created_at: string
}

interface Comment {
  id: string
  target_id: string
  user_id: string
  content: string
  position_data?: Record<string, any>
  status: 'active' | 'resolved' | 'deleted'
  created_at: string
  user_profiles: {
    first_name: string
    last_name: string
    avatar_url?: string
  }
}

export function useCollaboration() {
  const { user } = useAuth()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null)
  const [workspaceMembers, setWorkspaceMembers] = useState<WorkspaceMember[]>([])
  const [documents, setDocuments] = useState<CollaborativeDocument[]>([])
  const [currentDocument, setCurrentDocument] = useState<CollaborativeDocument | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [activeCollaborators, setActiveCollaborators] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Charger les espaces de travail de l'utilisateur
  const loadWorkspaces = useCallback(async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('workspaces')
        .select(`
          *,
          workspace_members!inner(role)
        `)
        .eq('workspace_members.user_id', user.id)
        .eq('workspace_members.is_active', true)
        .eq('is_active', true)

      if (error) throw error
      setWorkspaces(data || [])
    } catch (err) {
      console.error('Erreur lors du chargement des espaces de travail:', err)
    }
  }, [user])

  // Créer un nouvel espace de travail
  const createWorkspace = async (workspaceData: {
    name: string
    description?: string
    type?: 'private' | 'public' | 'organization'
  }) => {
    if (!user) throw new Error('Non connecté')

    try {
      const { data: workspace, error } = await supabase
        .from('workspaces')
        .insert({
          ...workspaceData,
          created_by: user.id
        })
        .select()
        .single()

      if (error) throw error

      // Ajouter l'utilisateur comme propriétaire
      await supabase
        .from('workspace_members')
        .insert({
          workspace_id: workspace.id,
          user_id: user.id,
          role: 'owner',
          permissions: ['view', 'edit', 'delete', 'manage_members', 'admin']
        })

      await loadWorkspaces()
      return workspace
    } catch (err) {
      throw err
    }
  }

  // Charger les membres d'un espace de travail
  const loadWorkspaceMembers = async (workspaceId: string) => {
    try {
      const { data, error } = await supabase
        .from('workspace_members')
        .select(`
          *,
          user_profiles(first_name, last_name, avatar_url)
        `)
        .eq('workspace_id', workspaceId)
        .eq('is_active', true)

      if (error) throw error
      setWorkspaceMembers(data || [])
    } catch (err) {
      console.error('Erreur lors du chargement des membres:', err)
    }
  }

  // Inviter un utilisateur à un espace de travail
  const inviteToWorkspace = async (workspaceId: string, email: string, role: string = 'member') => {
    if (!user) throw new Error('Non connecté')

    try {
      const token = crypto.randomUUID()
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 7) // Expire dans 7 jours

      const { error } = await supabase
        .from('workspace_invitations')
        .insert({
          workspace_id: workspaceId,
          email,
          invited_by: user.id,
          role,
          token,
          expires_at: expiresAt.toISOString()
        })

      if (error) throw error

      // Ici, vous pourriez envoyer un email d'invitation
      // await sendInvitationEmail(email, token, workspaceId)

      return { success: true }
    } catch (err) {
      throw err
    }
  }

  // Charger les documents d'un espace de travail
  const loadWorkspaceDocuments = async (workspaceId: string) => {
    try {
      const { data, error } = await supabase
        .from('collaborative_documents')
        .select('*')
        .eq('workspace_id', workspaceId)
        .order('updated_at', { ascending: false })

      if (error) throw error
      setDocuments(data || [])
    } catch (err) {
      console.error('Erreur lors du chargement des documents:', err)
    }
  }

  // Créer un nouveau document collaboratif
  const createDocument = async (workspaceId: string, documentData: {
    title: string
    content?: Record<string, any>
  }) => {
    if (!user) throw new Error('Non connecté')

    try {
      const { data, error } = await supabase
        .from('collaborative_documents')
        .insert({
          workspace_id: workspaceId,
          title: documentData.title,
          content: documentData.content || {},
          created_by: user.id
        })
        .select()
        .single()

      if (error) throw error
      await loadWorkspaceDocuments(workspaceId)
      return data
    } catch (err) {
      throw err
    }
  }

  // Rejoindre un document pour collaboration
  const joinDocument = async (documentId: string) => {
    if (!user) throw new Error('Non connecté')

    try {
      const { data, error } = await supabase.functions.invoke('collaboration-sync', {
        body: {
          action: 'join',
          documentId
        }
      })

      if (error) throw error

      setCurrentDocument(data.document)
      setActiveCollaborators(data.activeCollaborators || [])
      
      return data
    } catch (err) {
      throw err
    }
  }

  // Quitter un document
  const leaveDocument = async (documentId: string) => {
    if (!user) return

    try {
      await supabase.functions.invoke('collaboration-sync', {
        body: {
          action: 'leave',
          documentId
        }
      })

      setCurrentDocument(null)
      setActiveCollaborators([])
    } catch (err) {
      console.error('Erreur lors de la sortie du document:', err)
    }
  }

  // Mettre à jour le contenu d'un document
  const updateDocument = async (documentId: string, content: Record<string, any>, version: number) => {
    if (!user) throw new Error('Non connecté')

    try {
      const { data, error } = await supabase.functions.invoke('collaboration-sync', {
        body: {
          action: 'edit',
          documentId,
          data: {
            operation: { type: 'update', content },
            position: null,
            content,
            version
          }
        }
      })

      if (error) throw error
      return data
    } catch (err) {
      throw err
    }
  }

  // Charger les commentaires d'un document
  const loadComments = async (documentId: string) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          user_profiles(first_name, last_name, avatar_url)
        `)
        .eq('target_type', 'document')
        .eq('target_id', documentId)
        .eq('status', 'active')
        .order('created_at', { ascending: true })

      if (error) throw error
      setComments(data || [])
    } catch (err) {
      console.error('Erreur lors du chargement des commentaires:', err)
    }
  }

  // Ajouter un commentaire
  const addComment = async (documentId: string, content: string, position?: Record<string, any>) => {
    if (!user) throw new Error('Non connecté')

    try {
      const { data, error } = await supabase.functions.invoke('collaboration-sync', {
        body: {
          action: 'comment',
          documentId,
          data: {
            content,
            position
          }
        }
      })

      if (error) throw error
      await loadComments(documentId)
      return data
    } catch (err) {
      throw err
    }
  }

  // Écouter les changements en temps réel
  useEffect(() => {
    if (!currentDocument) return

    const channel = supabase
      .channel(`document-${currentDocument.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'real_time_edits',
          filter: `document_id=eq.${currentDocument.id}`
        },
        (payload) => {
          // Gérer les éditions en temps réel
          console.log('Édition en temps réel:', payload)
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `target_id=eq.${currentDocument.id}`
        },
        (payload) => {
          // Nouveau commentaire
          loadComments(currentDocument.id)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [currentDocument])

  useEffect(() => {
    loadWorkspaces()
  }, [loadWorkspaces])

  return {
    workspaces,
    currentWorkspace,
    workspaceMembers,
    documents,
    currentDocument,
    comments,
    activeCollaborators,
    loading,
    setCurrentWorkspace,
    createWorkspace,
    loadWorkspaceMembers,
    inviteToWorkspace,
    loadWorkspaceDocuments,
    createDocument,
    joinDocument,
    leaveDocument,
    updateDocument,
    loadComments,
    addComment
  }
}