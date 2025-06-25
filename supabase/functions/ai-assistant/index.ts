import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface AIRequest {
  message: string
  conversationId?: string
  context?: {
    type: 'document' | 'search' | 'general'
    data?: any
  }
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

    const { message, conversationId, context }: AIRequest = await req.json()

    // Créer ou récupérer la conversation
    let conversation
    if (conversationId) {
      const { data } = await supabaseClient
        .from('ai_conversations')
        .select('*')
        .eq('id', conversationId)
        .eq('user_id', user.id)
        .single()
      conversation = data
    } else {
      const { data } = await supabaseClient
        .from('ai_conversations')
        .insert({
          user_id: user.id,
          title: message.substring(0, 50) + '...',
          context_type: context?.type || 'general',
          context_data: context?.data || {}
        })
        .select()
        .single()
      conversation = data
    }

    // Enregistrer le message utilisateur
    await supabaseClient
      .from('ai_messages')
      .insert({
        conversation_id: conversation.id,
        role: 'user',
        content: message
      })

    // Récupérer le contexte de la conversation
    const { data: previousMessages } = await supabaseClient
      .from('ai_messages')
      .select('role, content')
      .eq('conversation_id', conversation.id)
      .order('created_at', { ascending: true })
      .limit(10)

    // Construire le contexte pour l'IA
    let systemPrompt = `Tu es un assistant juridique expert en droit algérien. Tu aides les professionnels du droit avec des informations précises et actualisées sur la législation algérienne.

Règles importantes:
- Réponds uniquement en français
- Base tes réponses sur le droit algérien
- Cite les sources juridiques quand possible
- Si tu n'es pas sûr, dis-le clairement
- Propose des actions concrètes quand approprié`

    if (context?.type === 'document' && context?.data) {
      systemPrompt += `\n\nContexte documentaire: ${JSON.stringify(context.data)}`
    }

    // Rechercher dans la base de connaissances
    const { data: knowledgeBase } = await supabaseClient
      .from('ai_knowledge_base')
      .select('title, content, category')
      .textSearch('content', message)
      .eq('is_active', true)
      .limit(3)

    if (knowledgeBase && knowledgeBase.length > 0) {
      systemPrompt += '\n\nInformations pertinentes de la base de connaissances:\n'
      knowledgeBase.forEach(kb => {
        systemPrompt += `- ${kb.title}: ${kb.content.substring(0, 200)}...\n`
      })
    }

    // Simuler une réponse IA (remplacer par un vrai service IA)
    const aiResponse = await generateAIResponse(message, systemPrompt, previousMessages)

    // Enregistrer la réponse de l'IA
    const { data: aiMessage } = await supabaseClient
      .from('ai_messages')
      .insert({
        conversation_id: conversation.id,
        role: 'assistant',
        content: aiResponse.content,
        sources: aiResponse.sources,
        confidence_score: aiResponse.confidence,
        processing_time_ms: aiResponse.processingTime
      })
      .select()
      .single()

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          conversationId: conversation.id,
          message: aiMessage,
          sources: aiResponse.sources
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

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

async function generateAIResponse(message: string, systemPrompt: string, previousMessages: any[]) {
  const startTime = Date.now()
  
  // Simulation d'une réponse IA - remplacer par OpenAI, Claude, etc.
  const responses = [
    {
      content: `Selon la législation algérienne en vigueur, voici les éléments de réponse à votre question "${message}":\n\n• **Cadre juridique**: Les dispositions applicables se trouvent dans le Code du travail (Loi n° 90-11)\n\n• **Procédure à suivre**: \n  1. Respecter les délais légaux\n  2. Notifier les parties concernées\n  3. Constituer le dossier requis\n\n• **Points d'attention**: Vérifiez les dernières modifications réglementaires\n\nPour une application précise à votre situation, je recommande de consulter les textes officiels récents.`,
      sources: [
        { title: 'Code du travail - Loi n° 90-11', type: 'Loi', relevance: 95 },
        { title: 'Décret d\'application n° 91-05', type: 'Décret', relevance: 88 }
      ],
      confidence: 0.85
    },
    {
      content: `Votre question concerne "${message}". Voici une analyse juridique détaillée:\n\n**1. Base légale**\nLa réglementation algérienne prévoit des dispositions spécifiques dans ce domaine.\n\n**2. Éléments constitutifs**\n- Conditions de forme\n- Conditions de fond\n- Délais à respecter\n\n**3. Conséquences juridiques**\nLe non-respect de ces dispositions peut entraîner des sanctions.\n\n**Recommandation**: Consultez un professionnel du droit pour une analyse personnalisée de votre situation.`,
      sources: [
        { title: 'Code civil algérien', type: 'Code', relevance: 92 },
        { title: 'Jurisprudence récente', type: 'Jurisprudence', relevance: 78 }
      ],
      confidence: 0.78
    }
  ]

  const response = responses[Math.floor(Math.random() * responses.length)]
  const processingTime = Date.now() - startTime

  return {
    ...response,
    processingTime
  }
}