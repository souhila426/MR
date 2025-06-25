import React, { useState } from 'react'
import { Database, Server, Key, Shield, Activity, AlertTriangle } from 'lucide-react'
import { useSupabaseStatus } from '../../hooks/useSupabaseStatus'
import SupabaseStatus from '../../components/SupabaseStatus'

const SupabaseSettings: React.FC = () => {
  const { isConfigured, isConnected, projectInfo } = useSupabaseStatus()
  const [showKeys, setShowKeys] = useState(false)

  const configSteps = [
    {
      title: "1. Créer un projet Supabase",
      description: "Rendez-vous sur supabase.com et créez un nouveau projet",
      status: isConfigured ? 'completed' : 'pending',
      action: !isConfigured ? (
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          Créer un projet
        </a>
      ) : null
    },
    {
      title: "2. Configurer les variables d'environnement",
      description: "Ajoutez vos clés Supabase dans le fichier .env",
      status: isConfigured ? 'completed' : 'pending',
      action: null
    },
    {
      title: "3. Exécuter les migrations",
      description: "Appliquez le schéma de base de données",
      status: isConnected ? 'completed' : 'pending',
      action: isConfigured && !isConnected ? (
        <a
          href={`${projectInfo.url}/project/default/sql`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          SQL Editor
        </a>
      ) : null
    },
    {
      title: "4. Configurer l'authentification",
      description: "Paramétrer les URLs de redirection et les providers",
      status: isConnected ? 'completed' : 'pending',
      action: isConnected ? (
        <a
          href={`${projectInfo.url}/project/default/auth/settings`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
        >
          Auth Settings
        </a>
      ) : null
    }
  ]

  const features = [
    {
      name: "Base de données PostgreSQL",
      description: "Base de données relationnelle avec support JSON",
      icon: Database,
      enabled: isConnected
    },
    {
      name: "Authentification",
      description: "Système d'auth complet avec RLS",
      icon: Shield,
      enabled: isConnected
    },
    {
      name: "Edge Functions",
      description: "Fonctions serverless pour l'IA et la collaboration",
      icon: Server,
      enabled: isConnected
    },
    {
      name: "Temps réel",
      description: "Synchronisation en temps réel pour la collaboration",
      icon: Activity,
      enabled: isConnected
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuration Supabase</h2>
        <p className="text-gray-600">
          Gérez votre connexion et configuration Supabase pour Dalil.dz
        </p>
      </div>

      {/* Status */}
      <SupabaseStatus />

      {/* Configuration Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Étapes de Configuration</h3>
        <div className="space-y-4">
          {configSteps.map((step, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.status === 'completed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {step.status === 'completed' ? '✓' : index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
              {step.action}
            </div>
          ))}
        </div>
      </div>

      {/* Features Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fonctionnalités Supabase</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className={`p-4 border rounded-lg ${
              feature.enabled 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <feature.icon className={`h-6 w-6 ${
                  feature.enabled ? 'text-green-600' : 'text-gray-400'
                }`} />
                <div>
                  <h4 className={`font-medium ${
                    feature.enabled ? 'text-green-900' : 'text-gray-600'
                  }`}>
                    {feature.name}
                  </h4>
                  <p className={`text-sm ${
                    feature.enabled ? 'text-green-700' : 'text-gray-500'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environment Variables */}
      {isConfigured && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Variables d'Environnement</h3>
            <button
              onClick={() => setShowKeys(!showKeys)}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1"
            >
              <Key className="h-4 w-4" />
              <span>{showKeys ? 'Masquer' : 'Afficher'} les clés</span>
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VITE_SUPABASE_URL
              </label>
              <input
                type="text"
                value={projectInfo.url || ''}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VITE_SUPABASE_ANON_KEY
              </label>
              <input
                type={showKeys ? 'text' : 'password'}
                value={showKeys ? import.meta.env.VITE_SUPABASE_ANON_KEY || '' : '••••••••••••••••'}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* Migration Guide */}
      {isConfigured && !isConnected && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-amber-900 mb-2">Migrations Requises</h3>
              <p className="text-amber-800 mb-4">
                Votre projet Supabase est configuré mais les migrations de base de données doivent être appliquées.
              </p>
              
              <div className="bg-white rounded-lg p-4 border border-amber-200">
                <h4 className="font-medium text-amber-900 mb-2">Instructions :</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-amber-800">
                  <li>Ouvrez le <strong>SQL Editor</strong> dans votre dashboard Supabase</li>
                  <li>Exécutez les migrations dans l'ordre suivant :</li>
                  <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                    <li><code>supabase/migrations/20250620000841_bitter_glade.sql</code></li>
                    <li><code>supabase/migrations/20250620000915_tight_jungle.sql</code></li>
                    <li><code>supabase/migrations/20250620001050_fragrant_brook.sql</code></li>
                    <li><code>supabase/migrations/20250625095408_square_grove.sql</code></li>
                  </ul>
                  <li>Vérifiez que toutes les tables sont créées correctement</li>
                </ol>
              </div>
              
              <div className="mt-4 flex space-x-3">
                <a
                  href={`${projectInfo.url}/project/default/sql`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm"
                >
                  Ouvrir SQL Editor
                </a>
                <a
                  href="/SUPABASE_SETUP.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-amber-700 border border-amber-300 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors text-sm"
                >
                  Guide Complet
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SupabaseSettings