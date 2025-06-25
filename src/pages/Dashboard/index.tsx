import React from 'react';
import { 
  TrendingUp, 
  FileText, 
  AlertCircle, 
  Users, 
  Calendar,
  ArrowUpRight,
  Scale,
  BookOpen,
  Clock,
  BarChart3,
  Download,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface DashboardProps {
  user: {
    name: string;
    role: string;
    organization: string;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const { t, isRTL } = useLanguage();

  const stats = [
    {
      title: t('newTexts'),
      value: '156',
      change: '+12%',
      trend: 'up' as const,
      icon: FileText,
      color: 'from-teal-600 to-emerald-700',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-700'
    },
    {
      title: t('activeAlerts'),
      value: '23',
      change: '+3',
      trend: 'up' as const,
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      title: t('followedDocuments'),
      value: '1,247',
      change: '+8%',
      trend: 'up' as const,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: t('aiConsultations'),
      value: '89',
      change: '+24%',
      trend: 'up' as const,
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  const recentDocuments = [
    {
      title: 'Décret exécutif n° 24-01 relatif aux procédures administratives',
      type: 'Décret',
      date: '2024-01-15',
      status: 'Nouveau',
      importance: 'high'
    },
    {
      title: 'Loi n° 23-12 modifiant le code du travail',
      type: 'Loi',
      date: '2024-01-12',
      status: 'Modifié',
      importance: 'high'
    },
    {
      title: 'Arrêté ministériel sur la fiscalité des entreprises',
      type: 'Arrêté',
      date: '2024-01-10',
      status: 'Nouveau',
      importance: 'medium'
    },
    {
      title: 'Circulaire relative aux marchés publics',
      type: 'Circulaire',
      date: '2024-01-08',
      status: 'Amendé',
      importance: 'medium'
    }
  ];

  const quickActions = [
    {
      title: t('search'),
      description: 'Rechercher dans la base juridique',
      icon: FileText,
      color: 'from-teal-600 to-emerald-700',
      href: '/search'
    },
    {
      title: 'Assistant IA',
      description: 'Poser une question juridique',
      icon: MessageSquare,
      color: 'from-blue-500 to-blue-600',
      href: '/assistant'
    },
    {
      title: 'Nouvelle Alerte',
      description: 'Configurer une alerte',
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      href: '/alerts'
    },
    {
      title: 'Nouveau Document',
      description: 'Ajouter un document',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      href: '/documents'
    }
  ];

  const legalDomains = [
    { name: t('laborLaw'), count: 45, trend: '+5', color: 'bg-teal-600' },
    { name: t('taxLaw'), count: 32, trend: '+2', color: 'bg-blue-500' },
    { name: t('adminProcedures'), count: 28, trend: '+8', color: 'bg-red-500' },
    { name: t('commercialLaw'), count: 19, trend: '+1', color: 'bg-purple-500' }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-700 rounded-2xl p-8 text-white">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl font-bold mb-2">
                {t('welcome')}, {user.name.split(' ')[isRTL ? 0 : 1]}
              </h1>
              <p className="text-teal-100 mb-4">
                {t('todayOverview')}
              </p>
              <div className={`flex items-center space-x-4 text-teal-100 ${isRTL ? 'space-x-reverse' : ''}`}>
                <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    {new Date().toLocaleDateString(isRTL ? 'ar-DZ' : 'fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="Legal workspace"
                className="w-32 h-32 rounded-xl object-cover opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
              <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
                <div className={`flex items-center space-x-1 text-teal-600 text-sm font-medium ${isRTL ? 'space-x-reverse' : ''}`}>
                  <TrendingUp className="h-4 w-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className={`text-sm font-medium text-gray-600 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h2 className="text-lg font-semibold text-gray-900">{t('recentActivity')}</h2>
                <button className={`text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <span>Voir tout</span>
                  <ArrowUpRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div className="space-y-4">
                {recentDocuments.map((doc, index) => (
                  <div key={index} className={`flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer ${isRTL ? 'space-x-reverse' : ''}`}>
                    <div className={`
                      p-2 rounded-lg flex-shrink-0
                      ${doc.importance === 'high' ? 'bg-red-100 text-red-600' : 'bg-teal-100 text-teal-600'}
                    `}>
                      <Scale className="h-4 w-4" />
                    </div>
                    <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {doc.title}
                      </h3>
                      <div className={`flex items-center justify-${isRTL ? 'end' : 'start'} space-x-4 mt-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <span className="text-xs text-gray-500">{doc.type}</span>
                        <span className={`text-xs text-gray-500 flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                          <Clock className="h-3 w-3" />
                          <span>{new Date(doc.date).toLocaleDateString(isRTL ? 'ar-DZ' : 'fr-FR')}</span>
                        </span>
                      </div>
                    </div>
                    <span className={`
                      px-3 py-1 text-xs font-medium rounded-full flex-shrink-0
                      ${doc.status === 'Nouveau' ? 'bg-teal-100 text-teal-700' : 'bg-red-100 text-red-700'}
                    `}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className={`flex items-center space-x-2 mb-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                <BarChart3 className="h-5 w-5 text-teal-600" />
                <h2 className="text-lg font-semibold text-gray-900">{t('quickActions')}</h2>
              </div>
              
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group ${isRTL ? 'space-x-reverse text-right' : 'text-left'}`}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} text-white group-hover:scale-105 transition-transform`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-sm font-medium text-gray-900">{action.title}</h3>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Legal Domains Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className={`text-lg font-semibold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                Aperçu par domaine juridique
              </h2>
              <div className="space-y-4">
                {legalDomains.map((domain, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-3 h-3 rounded-full ${domain.color}`}></div>
                      <span className="text-xs text-teal-600 font-medium">{domain.trend}</span>
                    </div>
                    <h3 className={`font-medium text-gray-900 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                      {domain.name}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{domain.count}</p>
                    <p className={`text-xs text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}>
                      Nouveau cette semaine
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;