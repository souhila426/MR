import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

interface AIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  sources?: Array<{
    title: string
    type: string
    relevance: number
  }>
  confidence_score?: number
  processing_time_ms?: number
  created_at: string
}

interface AIConversation {
  id: string
  title?: string
  context_type: string
  context_data: Record<string, any>
  messages: AIMessage[]
  created_at: string
}

export function useAI() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<AIConversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<AIConversation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createConversation = async (title?: string, context?: {
    type: 'document' | 'search' | 'general'
    data?: any
  }) => {
    if (!user) throw new Error('Non connecté')

    try {
      const { data, error } = await supabase
        .from('ai_conversations')
        .insert({
          user_id: user.id,
          title: title || 'Nouvelle conversation',
          context_type: context?.type || 'general',
          context_data: context?.data || {}
        })
        .select()
        .single()

      if (error) throw error

      const newConversation: AIConversation = {
        ...data,
        messages: []
      }

      setCurrentConversation(newConversation)
      return newConversation
    } catch (err) {
      throw err
    }
  }

  const sendMessage = async (message: string, conversationId?: string) => {
    if (!user) throw new Error('Non connecté')

    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          message,
          conversationId,
          context: currentConversation?.context_data
        }
      })

      if (error) throw error

      // Mettre à jour la conversation courante
      if (currentConversation && data.conversationId === currentConversation.id) {
        setCurrentConversation(prev => ({
          ...prev!,
          messages: [...prev!.messages, data.message]
        }))
      }

      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur IA')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const loadConversation = async (conversationId: string) => {
    try {
      const { data: conversation, error: convError } = await supabase
        .from('ai_conversations')
        .select('*')
        .eq('id', conversationId)
        .eq('user_id', user?.id)
        .single()

      if (convError) throw convError

      const { data: messages, error: msgError } = await supabase
        .from('ai_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (msgError) throw msgError

      const fullConversation: AIConversation = {
        ...conversation,
        messages: messages || []
      }

      setCurrentConversation(fullConversation)
      return fullConversation
    } catch (err) {
      throw err
    }
  }

  const loadConversations = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('ai_conversations')
        .select(`
          *,
          ai_messages(count)
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('updated_at', { ascending: false })

      if (error) throw error
      setConversations(data || [])
    } catch (err) {
      console.error('Erreur lors du chargement des conversations:', err)
    }
  }

  const deleteConversation = async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from('ai_conversations')
        .update({ is_active: false })
        .eq('id', conversationId)
        .eq('user_id', user?.id)

      if (error) throw error

      setConversations(prev => prev.filter(conv => conv.id !== conversationId))
      
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(null)
      }
    } catch (err) {
      throw err
    }
  }

  const provideFeedback = async (messageId: string, feedback: {
    type: 'helpful' | 'not_helpful' | 'incorrect' | 'incomplete' | 'excellent'
    rating?: number
    comment?: string
  }) => {
    if (!user) throw new Error('Non connecté')

    try {
      const { error } = await supabase
        .from('ai_feedback')
        .insert({
          message_id: messageId,
          user_id: user.id,
          feedback_type: feedback.type,
          rating: feedback.rating,
          comment: feedback.comment
        })

      if (error) throw error

      // Mettre à jour le score de feedback du message
      const feedbackScore = feedback.type === 'helpful' || feedback.type === 'excellent' ? 1 : 
                           feedback.type === 'not_helpful' || feedback.type === 'incorrect' ? -1 : 0

      await supabase
        .from('ai_messages')
        .update({ feedback_score: feedbackScore })
        .eq('id', messageId)

    } catch (err) {
      throw err
    }
  }

  const getSearchSuggestions = async (query: string) => {
    try {
      const { data, error } = await supabase
        .rpc('get_search_suggestions', {
          p_query: query,
          p_limit: 5
        })

      if (error) throw error
      return data || []
    } catch (err) {
      return []
    }
  }

  return {
    conversations,
    currentConversation,
    loading,
    error,
    createConversation,
    sendMessage,
    loadConversation,
    loadConversations,
    deleteConversation,
    provideFeedback,
    getSearchSuggestions,
    setCurrentConversation
  }
}