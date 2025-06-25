import { useState, useEffect } from 'react'
import { supabase, testSupabaseConnection, isSupabaseConfigured } from '../lib/supabase'

interface SupabaseStatus {
  isConfigured: boolean
  isConnected: boolean
  isLoading: boolean
  error: string | null
  projectInfo: {
    url?: string
    hasValidKey?: boolean
  }
}

export function useSupabaseStatus() {
  const [status, setStatus] = useState<SupabaseStatus>({
    isConfigured: false,
    isConnected: false,
    isLoading: true,
    error: null,
    projectInfo: {}
  })

  useEffect(() => {
    checkSupabaseStatus()
  }, [])

  const checkSupabaseStatus = async () => {
    setStatus(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Vérifier la configuration
      const configured = isSupabaseConfigured()
      
      if (!configured) {
        setStatus({
          isConfigured: false,
          isConnected: false,
          isLoading: false,
          error: 'Supabase n\'est pas configuré. Vérifiez vos variables d\'environnement.',
          projectInfo: {}
        })
        return
      }

      // Tester la connexion
      const connected = await testSupabaseConnection()
      
      // Récupérer les informations du projet
      const projectUrl = import.meta.env.VITE_SUPABASE_URL
      const hasValidKey = !!import.meta.env.VITE_SUPABASE_ANON_KEY

      setStatus({
        isConfigured: configured,
        isConnected: connected,
        isLoading: false,
        error: connected ? null : 'Impossible de se connecter à Supabase',
        projectInfo: {
          url: projectUrl,
          hasValidKey
        }
      })

    } catch (error) {
      setStatus({
        isConfigured: false,
        isConnected: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        projectInfo: {}
      })
    }
  }

  const retryConnection = () => {
    checkSupabaseStatus()
  }

  return {
    ...status,
    retryConnection
  }
}