import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are configured
if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'https://your-project-id.supabase.co' || 
    supabaseAnonKey === 'your_anon_key_here') {
  console.warn('⚠️ Supabase not configured. Please set up your environment variables.')
  console.warn('📖 See SUPABASE_SETUP.md for detailed setup instructions.')
  console.warn('🔧 Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file')
}

// Create a mock client if variables are not properly configured
const createMockClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signOut: () => Promise.resolve({ error: null }),
    resetPasswordForEmail: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
  },
  from: () => ({
    select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }),
    insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }),
    update: () => ({ eq: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }) }),
    delete: () => ({ eq: () => Promise.resolve({ error: { message: 'Supabase not configured' } }) }),
    upsert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) })
  }),
  functions: {
    invoke: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
  },
  rpc: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
  removeChannel: () => {},
  channel: () => ({
    on: () => ({ subscribe: () => {} })
  })
})

export const supabase = (!supabaseUrl || !supabaseAnonKey || 
  supabaseUrl === 'https://your-project-id.supabase.co' || 
  supabaseAnonKey === 'your_anon_key_here') 
  ? createMockClient()
  : createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      },
      global: {
        headers: {
          'X-Client-Info': 'dalil-dz-legal-platform'
        }
      }
    })

// Types pour TypeScript générés automatiquement
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          avatar_url?: string
          phone?: string
          address?: string
          organization_id?: string
          role_id?: string
          specializations: string[]
          bio?: string
          preferences: Record<string, any>
          notification_settings: Record<string, any>
          privacy_settings: Record<string, any>
          last_login_at?: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name: string
          last_name: string
          avatar_url?: string
          phone?: string
          address?: string
          organization_id?: string
          role_id?: string
          specializations?: string[]
          bio?: string
          preferences?: Record<string, any>
          notification_settings?: Record<string, any>
          privacy_settings?: Record<string, any>
          last_login_at?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          avatar_url?: string
          phone?: string
          address?: string
          organization_id?: string
          role_id?: string
          specializations?: string[]
          bio?: string
          preferences?: Record<string, any>
          notification_settings?: Record<string, any>
          privacy_settings?: Record<string, any>
          last_login_at?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          type: string
          address?: string
          phone?: string
          email?: string
          website?: string
          logo_url?: string
          subscription_plan: string
          subscription_status: string
          settings: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          address?: string
          phone?: string
          email?: string
          website?: string
          logo_url?: string
          subscription_plan?: string
          subscription_status?: string
          settings?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          address?: string
          phone?: string
          email?: string
          website?: string
          logo_url?: string
          subscription_plan?: string
          subscription_status?: string
          settings?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          title: string
          description?: string
          content?: string
          file_url?: string
          file_name?: string
          file_size?: number
          file_type?: string
          mime_type?: string
          category_id?: string
          document_type: string
          status: string
          publication_date?: string
          effective_date?: string
          expiry_date?: string
          reference_number?: string
          source_url?: string
          language: string
          created_by?: string
          updated_by?: string
          organization_id?: string
          view_count: number
          download_count: number
          is_featured: boolean
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          content?: string
          file_url?: string
          file_name?: string
          file_size?: number
          file_type?: string
          mime_type?: string
          category_id?: string
          document_type: string
          status?: string
          publication_date?: string
          effective_date?: string
          expiry_date?: string
          reference_number?: string
          source_url?: string
          language?: string
          created_by?: string
          updated_by?: string
          organization_id?: string
          view_count?: number
          download_count?: number
          is_featured?: boolean
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          content?: string
          file_url?: string
          file_name?: string
          file_size?: number
          file_type?: string
          mime_type?: string
          category_id?: string
          document_type?: string
          status?: string
          publication_date?: string
          effective_date?: string
          expiry_date?: string
          reference_number?: string
          source_url?: string
          language?: string
          created_by?: string
          updated_by?: string
          organization_id?: string
          view_count?: number
          download_count?: number
          is_featured?: boolean
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      ai_conversations: {
        Row: {
          id: string
          user_id?: string
          title?: string
          context_type: string
          context_data: Record<string, any>
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          title?: string
          context_type?: string
          context_data?: Record<string, any>
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          context_type?: string
          context_data?: Record<string, any>
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      ai_messages: {
        Row: {
          id: string
          conversation_id?: string
          role: string
          content: string
          metadata: Record<string, any>
          sources: any[]
          confidence_score?: number
          processing_time_ms?: number
          tokens_used?: number
          feedback_score?: number
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id?: string
          role: string
          content: string
          metadata?: Record<string, any>
          sources?: any[]
          confidence_score?: number
          processing_time_ms?: number
          tokens_used?: number
          feedback_score?: number
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          role?: string
          content?: string
          metadata?: Record<string, any>
          sources?: any[]
          confidence_score?: number
          processing_time_ms?: number
          tokens_used?: number
          feedback_score?: number
          created_at?: string
        }
      }
      workspaces: {
        Row: {
          id: string
          name: string
          description?: string
          type: string
          settings: Record<string, any>
          created_by?: string
          organization_id?: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          type?: string
          settings?: Record<string, any>
          created_by?: string
          organization_id?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          type?: string
          settings?: Record<string, any>
          created_by?: string
          organization_id?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_document_view_count: {
        Args: {
          doc_id: string
        }
        Returns: undefined
      }
      increment_document_download_count: {
        Args: {
          doc_id: string
        }
        Returns: undefined
      }
      semantic_search: {
        Args: {
          p_query: string
          p_limit?: number
        }
        Returns: {
          id: string
          title: string
          content: string
          category: string
          relevance_score: number
        }[]
      }
      get_search_suggestions: {
        Args: {
          p_query: string
          p_limit?: number
        }
        Returns: {
          suggestion: string
          frequency: number
        }[]
      }
      check_workspace_permission: {
        Args: {
          p_workspace_id: string
          p_user_id: string
          p_permission: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper pour les types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Fonctions utilitaires
export const getSupabaseErrorMessage = (error: any): string => {
  if (error?.message) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'Une erreur inattendue s\'est produite'
}

export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey && 
    supabaseUrl !== 'https://your-project-id.supabase.co' && 
    supabaseAnonKey !== 'your_anon_key_here')
}

// Test de connexion
export const testSupabaseConnection = async (): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    return false
  }
  
  try {
    const { data, error } = await supabase.from('user_profiles').select('count').limit(1)
    return !error
  } catch (error) {
    console.error('Erreur de connexion Supabase:', error)
    return false
  }
}