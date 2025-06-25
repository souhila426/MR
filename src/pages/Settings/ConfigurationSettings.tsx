import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Globe, 
  Palette, 
  Download, 
  Upload,
  Save,
  Settings as SettingsIcon,
  Users,
  Shield,
  Database,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff
} from 'lucide-react';

const ConfigurationSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

  // États pour les différentes sections
  const [profileData, setProfileData] = useState({
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@cabinet-juridique.fr',
    function: 'Avocat spécialisé en droit des sociétés',
    organization: 'Cabinet Dubois & Associés',
    expertise: 'Droit des sociétés, Droit commercial, Gouvernance d\'entreprise, Fusions-acquisitions'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newTexts: true,
    discussions: true,
    reports: false,
    collaborationInvites: true,
    maintenance: true
  });

  const [generalPreferences, setGeneralPreferences] = useState({
    language: 'Français',
    timezone: 'Europe/Paris (UTC+1)',
    displayMode: 'Compact',
    theme: 'Clair'
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    colorTheme: 'green',
    fontSize: 'normal'
  });

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'preferences', name: 'Préférences', icon: SettingsIcon },
    { id: 'data', name: 'Données', icon: Database },
    { id: 'appearance', name: 'Apparence', icon: Palette }
  ];

  const colorThemes = [
    { id: 'green', name: 'Vert (défaut)', color: 'bg-green-500', selected: true },
    { id: 'blue', name: 'Bleu', color: 'bg-blue-500', selected: false },
    { id: 'purple', name: 'Violet', color: 'bg-purple-500', selected: false }
  ];

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handlePreferenceChange = (setting: string, value: string) => {
    setGeneralPreferences(prev => ({ ...prev, [setting]: value }));
  };

  const handleAppearanceChange = (setting: string, value: string) => {
    setAppearanceSettings(prev => ({ ...prev, [setting]: value }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Informations du profil</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) => handleProfileChange('firstName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => handleProfileChange('lastName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={profileData.email}
          onChange={(e) => handleProfileChange('email', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fonction</label>
          <input
            type="text"
            value={profileData.function}
            onChange={(e) => handleProfileChange('function', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Organisation</label>
          <input
            type="text"
            value={profileData.organization}
            onChange={(e) => handleProfileChange('organization', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Domaines d'expertise</label>
        <textarea
          value={profileData.expertise}
          onChange={(e) => handleProfileChange('expertise', e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Décrivez vos domaines d'expertise..."
        />
      </div>

      <div className="flex justify-end">
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Enregistrer</span>
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Préférences de notification</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Nouveaux textes juridiques</h3>
            <p className="text-sm text-gray-500">Recevez une notification lors de la publication de nouveaux textes</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings.newTexts}
              onChange={(e) => handleNotificationChange('newTexts', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Discussions et commentaires</h3>
            <p className="text-sm text-gray-500">Notifications pour les réponses à vos messages et mentions</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings.discussions}
              onChange={(e) => handleNotificationChange('discussions', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Nouveaux rapports et analyses</h3>
            <p className="text-sm text-gray-500">Alertes lors de la publication de nouveaux rapports</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings.reports}
              onChange={(e) => handleNotificationChange('reports', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Invitations à collaborer</h3>
            <p className="text-sm text-gray-500">Notifications pour les invitations à rejoindre des projets</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings.collaborationInvites}
              onChange={(e) => handleNotificationChange('collaborationInvites', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Maintenances et mises à jour</h3>
            <p className="text-sm text-gray-500">Informations importantes sur la plateforme</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings.maintenance}
              onChange={(e) => handleNotificationChange('maintenance', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Enregistrer</span>
        </button>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Préférences générales</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
          <select
            value={generalPreferences.language}
            onChange={(e) => handlePreferenceChange('language', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="Français">Français</option>
            <option value="العربية">العربية</option>
            <option value="English">English</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuseau horaire</label>
          <select
            value={generalPreferences.timezone}
            onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="Europe/Paris (UTC+1)">Europe/Paris (UTC+1)</option>
            <option value="Africa/Algiers (UTC+1)">Africa/Algiers (UTC+1)</option>
            <option value="UTC (GMT+0)">UTC (GMT+0)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mode d'affichage</label>
          <select
            value={generalPreferences.displayMode}
            onChange={(e) => handlePreferenceChange('displayMode', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="Compact">Compact</option>
            <option value="Confortable">Confortable</option>
            <option value="Spacieux">Spacieux</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Thème</label>
          <select
            value={generalPreferences.theme}
            onChange={(e) => handlePreferenceChange('theme', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="Clair">Clair</option>
            <option value="Sombre">Sombre</option>
            <option value="Automatique">Automatique</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Enregistrer</span>
        </button>
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Gestion des données</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Download className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Exporter mes données</h3>
              <p className="text-blue-800 mb-4">
                Téléchargez une copie de toutes vos données personnelles et activités.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Demander l'export
              </button>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Upload className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-orange-900 mb-2">Importer des données</h3>
              <p className="text-orange-800 mb-4">
                Importez vos données depuis une autre plateforme juridique.
              </p>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                Importer
              </button>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Trash2 className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-red-900 mb-2">Supprimer mon compte</h3>
              <p className="text-red-800 mb-4">
                Suppression définitive de votre compte et de toutes vos données.
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Supprimer le compte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Personnalisation de l'apparence</h2>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Thème de couleur</h3>
        <div className="grid grid-cols-3 gap-4">
          {colorThemes.map((theme) => (
            <div
              key={theme.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                appearanceSettings.colorTheme === theme.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleAppearanceChange('colorTheme', theme.id)}
            >
              <div className={`w-full h-16 ${theme.color} rounded-lg mb-3`}></div>
              <p className="text-sm font-medium text-gray-900 text-center">{theme.name}</p>
              {appearanceSettings.colorTheme === theme.id && (
                <div className="flex justify-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Taille de police</h3>
        <div className="space-y-3">
          {[
            { id: 'small', label: 'Petite', selected: false },
            { id: 'normal', label: 'Normale', selected: true },
            { id: 'large', label: 'Grande', selected: false },
            { id: 'xlarge', label: 'Très grande', selected: false }
          ].map((size) => (
            <label key={size.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="fontSize"
                value={size.id}
                checked={appearanceSettings.fontSize === size.id}
                onChange={(e) => handleAppearanceChange('fontSize', e.target.value)}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-900">{size.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Enregistrer</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuration</h1>
        <p className="text-gray-600 mt-2">Personnalisez votre expérience LexWatch</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'preferences' && renderPreferencesTab()}
            {activeTab === 'data' && renderDataTab()}
            {activeTab === 'appearance' && renderAppearanceTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationSettings;