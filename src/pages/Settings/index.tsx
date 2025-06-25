import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Globe, 
  Shield, 
  Palette, 
  Download,
  Trash2,
  AlertTriangle,
  Check,
  Database,
  User,
  Wrench
} from 'lucide-react';
import SupabaseSettings from './SupabaseSettings';
import ConfigurationSettings from './ConfigurationSettings';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newsletter: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityVisible: false,
    analyticsEnabled: true
  });

  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('fr');

  const settingSections = [
    {
      id: 'configuration',
      title: 'Configuration',
      icon: Wrench,
      description: 'Paramètres généraux de la plateforme'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Gérez vos préférences de notification'
    },
    {
      id: 'privacy',
      title: 'Confidentialité',
      icon: Shield,
      description: 'Contrôlez la visibilité de vos données'
    },
    {
      id: 'appearance',
      title: 'Apparence',
      icon: Palette,
      description: 'Personnalisez l\'interface utilisateur'
    },
    {
      id: 'language',
      title: 'Langue & Région',
      icon: Globe,
      description: 'Définissez votre langue et fuseau horaire'
    },
    {
      id: 'supabase',
      title: 'Base de Données',
      icon: Database,
      description: 'Configuration Supabase et migrations'
    },
    {
      id: 'data',
      title: 'Données',
      icon: Download,
      description: 'Exportez ou supprimez vos données'
    }
  ];

  const [activeSection, setActiveSection] = useState('configuration');

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-slate-600 mt-1">
          Personnalisez votre expérience sur la plateforme
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <nav className="space-y-2">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <section.icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{section.title}</p>
                    <p className="text-xs text-slate-500 truncate">{section.description}</p>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            {activeSection === 'configuration' && <ConfigurationSettings />}
            {activeSection === 'supabase' && <SupabaseSettings />}
            
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Notifications</h2>
                  <p className="text-slate-600 mb-6">
                    Choisissez comment vous souhaitez être informé des mises à jour.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-slate-200">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900">Notifications par email</h3>
                      <p className="text-sm text-slate-500">Recevez les alertes importantes par email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={(e) => handleNotificationChange('email', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-slate-200">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900">Notifications push</h3>
                      <p className="text-sm text-slate-500">Recevez les notifications dans votre navigateur</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={(e) => handleNotificationChange('push', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-slate-200">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900">Notifications SMS</h3>
                      <p className="text-sm text-slate-500">Recevez les alertes urgentes par SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900">Newsletter</h3>
                      <p className="text-sm text-slate-500">Recevez notre newsletter mensuelle</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.newsletter}
                        onChange={(e) => handleNotificationChange('newsletter', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Confidentialité</h2>
                  <p className="text-slate-600 mb-6">
                    Contrôlez la visibilité de vos informations et activités.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-slate-200">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900">Profil public</h3>
                      <p className="text-sm text-slate-500">Permettre aux autres utilisateurs de voir votre profil</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy.profileVisible}
                        onChange={(e) => handlePrivacyChange('profileVisible', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-slate-200">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900">Activité visible</h3>
                      <p className="text-sm text-slate-500">Permettre aux autres de voir votre activité récente</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy.activityVisible}
                        onChange={(e) => handlePrivacyChange('activityVisible', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900">Analytiques</h3>
                      <p className="text-sm text-slate-500">Permettre la collecte de données d'usage anonymes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy.analyticsEnabled}
                        onChange={(e) => handlePrivacyChange('analyticsEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Apparence</h2>
                  <p className="text-slate-600 mb-6">
                    Personnalisez l'apparence de l'interface utilisateur.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Thème</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'light', name: 'Clair', preview: 'bg-white border-2' },
                      { id: 'dark', name: 'Sombre', preview: 'bg-slate-800 border-2' },
                      { id: 'auto', name: 'Automatique', preview: 'bg-gradient-to-r from-white to-slate-800 border-2' }
                    ].map((themeOption) => (
                      <button
                        key={themeOption.id}
                        onClick={() => setTheme(themeOption.id)}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          theme === themeOption.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-full h-12 rounded ${themeOption.preview} mb-2`}></div>
                        <p className="text-sm font-medium text-slate-900">{themeOption.name}</p>
                        {theme === themeOption.id && (
                          <Check className="h-4 w-4 text-blue-600 mx-auto mt-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'language' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Langue & Région</h2>
                  <p className="text-slate-600 mb-6">
                    Définissez votre langue préférée et votre fuseau horaire.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Langue</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="fr">Français</option>
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Fuseau horaire</label>
                    <select className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="Africa/Algiers">Alger (GMT+1)</option>
                      <option value="Europe/Paris">Paris (GMT+1)</option>
                      <option value="UTC">UTC (GMT+0)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'data' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Gestion des Données</h2>
                  <p className="text-slate-600 mb-6">
                    Exportez ou supprimez vos données personnelles.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">Exporter mes données</h3>
                        <p className="text-sm text-slate-500">Téléchargez une copie de toutes vos données</p>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Exporter</span>
                      </button>
                    </div>
                  </div>

                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-red-900">Zone de danger</h3>
                        <p className="text-sm text-red-700 mb-4">
                          La suppression de votre compte est irréversible. Toutes vos données seront définitivement supprimées.
                        </p>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                          <Trash2 className="h-4 w-4" />
                          <span>Supprimer mon compte</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            {activeSection !== 'supabase' && activeSection !== 'configuration' && (
              <div className="flex justify-end pt-6 border-t border-slate-200 mt-8">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Check className="h-4 w-4" />
                  <span>Enregistrer les modifications</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;