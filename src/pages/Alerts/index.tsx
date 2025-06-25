import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Mail,
  Smartphone,
  Settings
} from 'lucide-react';

const Alerts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  const alerts = [
    {
      id: 1,
      title: 'Modifications du Code du Travail',
      keywords: ['code travail', 'salaire minimum', 'congés payés'],
      frequency: 'Immédiat',
      status: 'active',
      lastTriggered: '2024-01-15',
      triggerCount: 3,
      channels: ['email', 'push'],
      category: 'Droit du Travail'
    },
    {
      id: 2,
      title: 'Nouvelles dispositions fiscales',
      keywords: ['loi finances', 'impôt société', 'TVA'],
      frequency: 'Quotidien',
      status: 'active',
      lastTriggered: '2024-01-14',
      triggerCount: 1,
      channels: ['email'],
      category: 'Droit Fiscal'
    },
    {
      id: 3,
      title: 'Procédures administratives',
      keywords: ['procédure administrative', 'dématérialisation'],
      frequency: 'Hebdomadaire',
      status: 'paused',
      lastTriggered: '2024-01-08',
      triggerCount: 5,
      channels: ['email', 'push'],
      category: 'Procédures Admin.'
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      title: 'Nouveau décret sur les procédures administratives',
      content: 'Un nouveau décret simplifiant les procédures administratives a été publié au Journal Officiel.',
      date: '2024-01-15',
      read: false,
      alertId: 3,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Modification du salaire minimum',
      content: 'Le salaire national minimum garanti (SNMG) a été révisé dans le nouveau décret.',
      date: '2024-01-14',
      read: true,
      alertId: 1,
      priority: 'high'
    },
    {
      id: 3,
      title: 'Nouvelles dispositions TVA',
      content: 'Les taux de TVA pour certains secteurs ont été modifiés dans la loi de finances 2024.',
      date: '2024-01-13',
      read: true,
      alertId: 2,
      priority: 'medium'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'paused':
        return <Clock className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-green-500 bg-green-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Alertes & Notifications</h1>
          <p className="text-slate-600 mt-1">
            Gérez vos alertes personnalisées et restez informé des évolutions juridiques
          </p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nouvelle alerte</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Alertes actives', value: '12', color: 'text-green-600', bg: 'bg-green-50' },
          { title: 'Notifications cette semaine', value: '28', color: 'text-green-600', bg: 'bg-green-50' },
          { title: 'Alertes en pause', value: '3', color: 'text-red-600', bg: 'bg-red-50' },
          { title: 'Domaines suivis', value: '6', color: 'text-emerald-600', bg: 'bg-emerald-50' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-slate-200 p-6">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <Bell className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Management */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Mes Alertes</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  Actives
                </button>
                <button
                  onClick={() => setActiveTab('paused')}
                  className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'paused'
                      ? 'bg-green-100 text-green-700'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  En pause
                </button>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher dans vos alertes..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {alerts
              .filter(alert => activeTab === 'active' ? alert.status === 'active' : alert.status === 'paused')
              .map((alert) => (
                <div key={alert.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(alert.status)}
                        <h3 className="font-medium text-slate-900">{alert.title}</h3>
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                          {alert.category}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {alert.keywords.map((keyword, index) => (
                          <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <div className="flex items-center space-x-4">
                          <span>Fréquence: {alert.frequency}</span>
                          <span>Déclenchements: {alert.triggerCount}</span>
                          <span>Dernière: {new Date(alert.lastTriggered).toLocaleDateString('fr-FR')}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {alert.channels.includes('email') && (
                            <Mail className="h-4 w-4 text-slate-400" />
                          )}
                          {alert.channels.includes('push') && (
                            <Smartphone className="h-4 w-4 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Settings className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Notifications Récentes</h2>
          </div>

          <div className="p-6 space-y-4">
            {recentNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-l-4 p-4 rounded-r-lg ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'bg-opacity-100' : 'bg-opacity-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`text-sm font-medium ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
                
                <p className="text-sm text-slate-600 mb-3">
                  {notification.content}
                </p>
                
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{new Date(notification.date).toLocaleDateString('fr-FR')}</span>
                  <button className="text-green-600 hover:text-green-700 font-medium">
                    Voir détails
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-slate-200">
            <button className="w-full text-center text-green-600 hover:text-green-700 text-sm font-medium">
              Voir toutes les notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;