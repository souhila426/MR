import React from 'react'
import { AlertCircle, CheckCircle, RefreshCw, ExternalLink } from 'lucide-react'
import { useSupabaseStatus } from '../hooks/useSupabaseStatus'

const SupabaseStatus: React.FC = () => {
  const { isConfigured, isConnected, isLoading, error, projectInfo, retryConnection } = useSupabaseStatus()

  if (isLoading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Vérification de Supabase...</h3>
            <p className="text-sm text-blue-700">Test de la connexion en cours</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isConfigured) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-900">Configuration Supabase Manquante</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <div className="mt-3">
              <h4 className="text-sm font-medium text-red-900">Pour configurer Supabase :</h4>
              <ol className="text-sm text-red-700 mt-1 list-decimal list-inside space-y-1">
                <li>Créez un projet sur <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
                <li>Copiez l'URL et la clé API de votre projet</li>
                <li>Créez un fichier <code className="bg-red-100 px-1 rounded">.env</code> avec :</li>
              </ol>
              <pre className="bg-red-100 p-2 rounded text-xs mt-2 overflow-x-auto">
{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-amber-900">Problème de Connexion Supabase</h3>
            <p className="text-sm text-amber-700 mt-1">{error}</p>
            <div className="mt-3 flex items-center space-x-3">
              <button
                onClick={retryConnection}
                className="bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700 transition-colors flex items-center space-x-1"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Réessayer</span>
              </button>
              {projectInfo.url && (
                <a
                  href={projectInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:text-amber-800 text-sm flex items-center space-x-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Ouvrir Supabase</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <div>
          <h3 className="text-sm font-medium text-green-900">Supabase Connecté</h3>
          <p className="text-sm text-green-700">Base de données opérationnelle</p>
        </div>
        {projectInfo.url && (
          <a
            href={projectInfo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-green-700 hover:text-green-800 flex items-center space-x-1"
          >
            <ExternalLink className="h-3 w-3" />
            <span className="text-sm">Dashboard</span>
          </a>
        )}
      </div>
    </div>
  )
}

export default SupabaseStatus