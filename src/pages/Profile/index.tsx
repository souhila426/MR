import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  Edit,
  Save,
  Bell,
  Shield,
  Download,
  Activity
} from 'lucide-react';

interface ProfileProps {
  user: {
    name: string;
    role: string;
    organization: string;
    avatar: string;
  };
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const profileData = {
    personalInfo: {
      firstName: 'Youcef',
      lastName: 'LAHOUAZI',
      email: 'youcef.lahouazi@cabinet-juridique.dz',
      phone: '+213 555 123 456',
      address: 'Alger, Algérie',
      organization: user.organization,
      position: user.role,
      joinDate: '2023-03-15'
    },
    preferences: {
      language: 'Français',
      timezone: 'Africa/Algiers',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profileVisible: true,
        activityVisible: false
      }
    },
    subscription: {
      plan: 'Premium',
      status: 'Actif',
      renewalDate: '2024-03-15',
      features: ['Accès illimité', 'Assistant IA', 'Alertes personnalisées', 'Rapports avancés']
    }
  };

  const activityStats = [
    { label: 'Documents consultés', value: '247', period: 'Ce mois' },
    { label: 'Recherches effectuées', value: '89', period: 'Ce mois' },
    { label: 'Questions à l\'IA', value: '34', period: 'Cette semaine' },
    { label: 'Alertes reçues', value: '156', period: 'Ce mois' }
  ];

  const recentActivity = [
    {
      action: 'Consultation',
      item: 'Code du travail - Article 87',
      date: '2024-01-15 14:30',
      type: 'document'
    },
    {
      action: 'Question IA',
      item: 'Procédure de licenciement économique',
      date: '2024-01-15 11:20',
      type: 'ai'
    },
    {
      action: 'Téléchargement',
      item: 'Loi de finances 2024',
      date: '2024-01-14 16:45',
      type: 'download'
    },
    {
      action: 'Alerte',
      item: 'Modification du SNMG',
      date: '2024-01-14 09:15',
      type: 'alert'
    }
  ];

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'preferences', name: 'Préférences', icon: Bell },
    { id: 'security', name: 'Sécurité', icon: Shield },
    { id: 'activity', name: 'Activité', icon: Activity }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 text-white">
        <div className="flex items-center space-x-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-slate-300 text-lg mb-1">{user.role}</p>
            <p className="text-slate-400">{user.organization}</p>
            <div className="flex items-center space-x-4 mt-4 text-slate-300">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Membre depuis Mars 2023</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Alger, Algérie</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            <span>{isEditing ? 'Enregistrer' : 'Modifier'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Informations Personnelles</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Prénom</label>
                    <input
                      type="text"
                      value={profileData.personalInfo.firstName}
                      disabled={!isEditing}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nom</label>
                    <input
                      type="text"
                      value={profileData.personalInfo.lastName}
                      disabled={!isEditing}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={profileData.personalInfo.email}
                      disabled={!isEditing}
                      className="w-full pl-10 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="tel"
                      value={profileData.personalInfo.phone}
                      disabled={!isEditing}
                      className="w-full pl-10 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Adresse</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={profileData.personalInfo.address}
                      disabled={!isEditing}
                      className="w-full pl-10 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Informations Professionnelles</h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Organisation</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={profileData.personalInfo.organization}
                      disabled={!isEditing}
                      className="w-full pl-10 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Poste</label>
                  <input
                    type="text"
                    value={profileData.personalInfo.position}
                    disabled={!isEditing}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-slate-50"
                  />
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-3">Abonnement</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Plan:</span>
                      <span className="text-sm font-medium text-slate-900">{profileData.subscription.plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Statut:</span>
                      <span className="text-sm font-medium text-teal-600">{profileData.subscription.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Renouvellement:</span>
                      <span className="text-sm font-medium text-slate-900">
                        {new Date(profileData.subscription.renewalDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {activityStats.map((stat, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-slate-600 mb-1">{stat.label}</h4>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.period}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Activité Récente</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'document' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'ai' ? 'bg-purple-100 text-purple-600' :
                        activity.type === 'download' ? 'bg-teal-100 text-teal-600' :
                        'bg-amber-100 text-amber-600'
                      }`}>
                        {activity.type === 'document' && <User className="h-4 w-4" />}
                        {activity.type === 'ai' && <User className="h-4 w-4" />}
                        {activity.type === 'download' && <Download className="h-4 w-4" />}
                        {activity.type === 'alert' && <Bell className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                        <p className="text-sm text-slate-600">{activity.item}</p>
                      </div>
                      <span className="text-xs text-slate-500">{activity.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;