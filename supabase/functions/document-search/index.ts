import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface SearchRequest {
  query: string
  filters?: {
    category?: string
    type?: string
    dateRange?: { start: string; end: string }
    status?: string
  }
  searchType?: 'text' | 'semantic' | 'ai_assisted'
  limit?: number
  offset?: number
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

    const searchRequest: SearchRequest = await req.json()
    const { query, filters, searchType = 'text', limit = 20, offset = 0 } = searchRequest

    const startTime = Date.now()

    // Enregistrer la requête de recherche
    const { data: searchQuery } = await supabaseClient
      .from('search_queries')
      .insert({
        user_id: user.id,
        query_text: query,
        query_type: searchType,
        filters: filters || {}
      })
      .select()
      .single()

    // Construire la requête de recherche
    let searchQueryBuilder = supabaseClient
      .from('documents')
      .select(`
        id,
        title,
        description,
        content,
        document_type,
        status,
        publication_date,
        reference_number,
        category_id,
        document_categories(name, color),
        view_count,
        download_count,
        created_at
      `)
      .eq('is_public', true)

    // Recherche textuelle
    if (searchType === 'text' || searchType === 'ai_assisted') {
      searchQueryBuilder = searchQueryBuilder
        .textSearch('search_vector', query, {
          type: 'websearch',
          config: 'french'
        })
    }

    // Appliquer les filtres
    if (filters?.category) {
      searchQueryBuilder = searchQueryBuilder.eq('category_id', filters.category)
    }

    if (filters?.type) {
      searchQueryBuilder = searchQueryBuilder.eq('document_type', filters.type)
    }

    if (filters?.status) {
      searchQueryBuilder = searchQueryBuilder.eq('status', filters.status)
    }

    if (filters?.dateRange) {
      searchQueryBuilder = searchQueryBuilder
        .gte('publication_date', filters.dateRange.start)
        .lte('publication_date', filters.dateRange.end)
    }

    // Pagination et tri
    const { data: documents, error } = await searchQueryBuilder
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      throw error
    }

    // Calculer les scores de pertinence et préparer les résultats
    const results = documents?.map((doc, index) => {
      const relevanceScore = calculateRelevanceScore(doc, query)
      return {
        ...doc,
        relevance_score: relevanceScore,
        ranking_position: offset + index + 1,
        match_type: 'text',
        excerpt: generateExcerpt(doc.content || doc.description || '', query)
      }
    }) || []

    // Trier par pertinence
    results.sort((a, b) => b.relevance_score - a.relevance_score)

    const executionTime = Date.now() - startTime

    // Mettre à jour la requête avec les résultats
    await supabaseClient
      .from('search_queries')
      .update({
        results_count: results.length,
        execution_time_ms: executionTime
      })
      .eq('id', searchQuery.id)

    // Enregistrer les résultats pour analytics
    if (results.length > 0) {
      const searchResults = results.map((result, index) => ({
        query_id: searchQuery.id,
        document_id: result.id,
        relevance_score: result.relevance_score,
        ranking_position: index + 1,
        match_type: result.match_type
      }))

      await supabaseClient
        .from('search_results')
        .insert(searchResults)
    }

    // Recherche sémantique avancée si demandée
    let semanticResults = []
    if (searchType === 'semantic' || searchType === 'ai_assisted') {
      const { data: semanticData } = await supabaseClient
        .rpc('semantic_search', {
          p_query: query,
          p_limit: Math.min(limit, 10)
        })

      semanticResults = semanticData || []
    }

    // Suggestions de recherche
    const { data: suggestions } = await supabaseClient
      .rpc('get_search_suggestions', {
        p_query: query,
        p_limit: 5
      })

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          results: results,
          semantic_results: semanticResults,
          suggestions: suggestions || [],
          total_count: results.length,
          execution_time_ms: executionTime,
          search_id: searchQuery.id
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

function calculateRelevanceScore(document: any, query: string): number {
  let score = 0
  const queryLower = query.toLowerCase()
  
  // Score basé sur le titre
  if (document.title?.toLowerCase().includes(queryLower)) {
    score += 50
  }
  
  // Score basé sur la description
  if (document.description?.toLowerCase().includes(queryLower)) {
    score += 30
  }
  
  // Score basé sur le contenu
  if (document.content?.toLowerCase().includes(queryLower)) {
    score += 20
  }
  
  // Bonus pour les documents récents
  const daysSinceCreation = (Date.now() - new Date(document.created_at).getTime()) / (1000 * 60 * 60 * 24)
  if (daysSinceCreation < 30) {
    score += 10
  }
  
  // Bonus pour les documents populaires
  score += Math.min(document.view_count / 10, 20)
  
  return Math.min(score, 100)
}

function generateExcerpt(content: string, query: string, maxLength: number = 200): string {
  if (!content) return ''
  
  const queryLower = query.toLowerCase()
  const contentLower = content.toLowerCase()
  const queryIndex = contentLower.indexOf(queryLower)
  
  if (queryIndex === -1) {
    return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '')
  }
  
  const start = Math.max(0, queryIndex - 50)
  const end = Math.min(content.length, start + maxLength)
  
  let excerpt = content.substring(start, end)
  if (start > 0) excerpt = '...' + excerpt
  if (end < content.length) excerpt = excerpt + '...'
  
  return excerpt
}