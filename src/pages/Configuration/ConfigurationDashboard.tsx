import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Building, 
  FileText, 
  ClipboardList, 
  Database, 
  Bell, 
  Users, 
  Shield,
  ArrowRight,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const ConfigurationDashboard: React.FC = () => {
  const configSections = [
    {
      id: 'nomenclature',
      title: 'Nomenclature',
      description: 'Gestion des nomenclatures et classifications',
      icon: Building,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      items: [
        'Institutions et administrations',
        'Types de textes juridiques',
        'Catégories de procédures'
      ],
      href: '/config/nomenclature'
    },
    {
      id: 'resources',
      title: 'Ressources Complémentaires',
      description: 'Connexions externes et intégrations',
      icon: Database,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      items: [
        'Bases de données externes',
        'Bibliothèque de références',
        'APIs et intégrations'
      ],
      href: '/config/ressources'
    },
    {
      id: 'alerts',
      title: 'Alertes & Notifications',
      description: 'Configuration des alertes et notifications',
      icon: Bell,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      items: [
        'Paramétrage des alertes',
        'Notifications personnalisées',
        'Gestion des échéances'
      ],
      href: '/config/alertes'
    },
    {
      id: 'users',
      title: 'Gestion des Utilisateurs',
      description: 'Administration des utilisateurs et rôles',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      items: [
        'Profils utilisateurs',
        'Rôles et permissions',
        'Logs d\'activité'
      ],
      href: '/config/utilisateurs'
    },
    {
      id: 'security',
      title: 'Sécurité & Confidentialité',
      description: 'Paramètres de sécurité et audit',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      items: [
        'Droits d\'accès',
        'Authentification sécurisée',
        'Audits et traçabilité'
      ],
      href: '/config/securite'
    }
  ];

  const systemStatus = [
    { label: 'Base de données', status: 'operational', value: '99.9%' },
    { label: 'APIs externes', status: 'operational', value: '98.5%' },
    { label: 'Notifications', status: 'warning', value: '95.2%' },
    { label: 'Sauvegardes', status: 'operational', value: '100%' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuration & Personnalisation</h1>
        <p className="text-gray-600 mt-2">
          Gérez les paramètres système, nomenclatures et configurations de la plateforme
        </p>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Activity className="h-6 w-6 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">État du Système</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {systemStatus.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                {getStatusIcon(item.status)}
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
              <span className="text-sm text-gray-600">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {configSections.map((section) => (
          <Link
            key={section.id}
            to={section.href}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${section.bgColor}`}>
                <section.icon className={`h-6 w-6 ${section.textColor}`} />
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {section.title}
            </h3>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              {section.description}
            </p>
            
            <div className="space-y-2">
              {section.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Actions Rapides</h3>
            <p className="text-green-100">
              Accédez rapidement aux configurations les plus utilisées
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Link
              to="/config/nomenclature/institutions"
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              Gérer Institutions
            </Link>
            <Link
              to="/config/alertes/parametrage"
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              Configurer Alertes
            </Link>
            <Link
              to="/config/utilisateurs/roles"
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              Gérer Rôles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationDashboard;