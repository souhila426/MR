import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

interface Document {
  id: string
  title: string
  description?: string
  content?: string
  file_url?: string
  document_type: string
  status: string
  category_id?: string
  view_count: number
  download_count: number
  created_at: string
  document_categories?: {
    name: string
    color: string
  }
}

interface SearchFilters {
  category?: string
  type?: string
  status?: string
  dateRange?: { start: string; end: string }
}

export function useDocuments() {
  const { user } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDocuments = async (filters?: SearchFilters) => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('documents')
        .select(`
          *,
          document_categories(name, color)
        `)
        .eq('is_public', true)
        .order('created_at', { ascending: false })

      // Appliquer les filtres
      if (filters?.category) {
        query = query.eq('category_id', filters.category)
      }
      if (filters?.type) {
        query = query.eq('document_type', filters.type)
      }
      if (filters?.status) {
        query = query.eq('status', filters.status)
      }
      if (filters?.dateRange) {
        query = query
          .gte('publication_date', filters.dateRange.start)
          .lte('publication_date', filters.dateRange.end)
      }

      const { data, error } = await query

      if (error) throw error
      setDocuments(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  const searchDocuments = async (query: string, filters?: SearchFilters) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.functions.invoke('document-search', {
        body: {
          query,
          filters,
          searchType: 'text',
          limit: 50
        }
      })

      if (error) throw error
      setDocuments(data.results || [])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de recherche')
      return null
    } finally {
      setLoading(false)
    }
  }

  const getDocument = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select(`
          *,
          document_categories(name, color),
          user_profiles(first_name, last_name)
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      // Incrémenter le compteur de vues
      await supabase.rpc('increment_document_view_count', { doc_id: id })

      return data
    } catch (err) {
      throw err
    }
  }

  const createDocument = async (documentData: Partial<Document>) => {
    if (!user) throw new Error('Non connecté')

    try {
      const { data, error } = await supabase
        .from('documents')
        .insert({
          ...documentData,
          created_by: user.id
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (err) {
      throw err
    }
  }

  const updateDocument = async (id: string, updates: Partial<Document>) => {
    if (!user) throw new Error('Non connecté')

    try {
      const { data, error } = await supabase
        .from('documents')
        .update({
          ...updates,
          updated_by: user.id
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (err) {
      throw err
    }
  }

  const deleteDocument = async (id: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (err) {
      throw err
    }
  }

  const addToFavorites = async (documentId: string) => {
    if (!user) throw new Error('Non connecté')

    try {
      const { error } = await supabase
        .from('document_favorites')
        .insert({
          user_id: user.id,
          document_id: documentId
        })

      if (error) throw error
    } catch (err) {
      throw err
    }
  }

  const removeFromFavorites = async (documentId: string) => {
    if (!user) throw new Error('Non connecté')

    try {
      const { error } = await supabase
        .from('document_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('document_id', documentId)

      if (error) throw error
    } catch (err) {
      throw err
    }
  }

  const getFavorites = async () => {
    if (!user) return []

    try {
      const { data, error } = await supabase
        .from('document_favorites')
        .select(`
          document_id,
          documents(
            *,
            document_categories(name, color)
          )
        `)
        .eq('user_id', user.id)

      if (error) throw error
      return data?.map(fav => fav.documents).filter(Boolean) || []
    } catch (err) {
      return []
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    searchDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
    addToFavorites,
    removeFromFavorites,
    getFavorites
  }
}