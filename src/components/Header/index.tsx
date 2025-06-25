import React, { useState } from 'react';
import { Menu, Bell, Search, MessageSquare, User, ChevronDown, Plus } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSelector from '../LanguageSelector';

interface HeaderProps {
  user: {
    name: string;
    role: string;
    organization: string;
    avatar: string;
  };
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onMenuClick }) => {
  const { t, isRTL } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'home',
      label: t('home'),
      href: '/',
      hasDropdown: false
    },
    {
      id: 'legal-texts',
      label: t('legalTexts'),
      hasDropdown: true,
      items: [
        { label: 'Catalogue', href: '/textes/catalogue', description: 'Liste complète des textes disponibles' },
        { label: 'Ajouter un texte juridique', href: '/textes/ajouter', description: 'Créer un nouveau texte juridique', icon: 'plus', highlight: true },
        { label: 'Extraction automatique', href: '/textes/extraction', description: 'Conversion PDF vers texte structuré' },
        { label: 'Recherche interactive', href: '/textes/recherche-interactive', description: 'Recherche assistée par IA' },
        { label: 'Recherche avancée', href: '/textes/recherche-avancee', description: 'Recherche avec filtres avancés' },
        { label: 'Recherches sauvegardées', href: '/textes/recherches-sauvegardees', description: 'Vos recherches enregistrées' },
        { label: 'Recherche universelle', href: '/textes/recherche-universelle', description: 'Accès à toutes les ressources' },
        { label: 'Rédaction assistée', href: '/textes/redaction-assistee', description: 'Création de contenu juridique par IA' }
      ]
    },
    {
      id: 'procedures',
      label: t('procedures'),
      hasDropdown: true,
      items: [
        { label: 'Catalogue', href: '/procedures/catalogue', description: 'Liste des procédures disponibles', icon: 'list' },
        { label: 'Ajouter une procédure', href: '/procedures/ajouter', description: 'Créer une nouvelle procédure', icon: 'plus', highlight: true },
        { label: 'Recherche universelle', href: '/procedures/recherche-universelle', description: 'Accès à toutes les procédures' },
        { label: 'Recherche interactive', href: '/procedures/recherche-interactive', description: 'Requêtes administratives automatisées' },
        { label: 'Recherche avancée', href: '/procedures/recherche-avancee', description: 'Recherche par domaine et critères' },
        { label: 'Recherches sauvegardées', href: '/procedures/recherches-sauvegardees', description: 'Vos recherches enregistrées' },
        { label: 'Formulaires', href: '/procedures/formulaires', description: 'Modèles et formulaires requis' },
        { label: 'Guide pratique', href: '/procedures/guide-pratique', description: 'Guides détaillés avec illustrations' }
      ]
    },
    {
      id: 'analysis',
      label: t('analysis'),
      hasDropdown: true,
      items: [
        { label: 'Tableaux de bord', href: '/analyse/tableaux-de-bord', description: 'Visualisation des données juridiques' },
        { label: 'Analyse comparative', href: '/analyse/comparative', description: 'Comparaison et historique des modifications' },
        { label: 'Rapports personnalisés', href: '/analyse/rapports', description: 'Génération de rapports sur mesure' }
      ]
    },
    {
      id: 'collaboration',
      label: t('collaboration'),
      hasDropdown: true,
      items: [
        { label: 'Partage d\'information', href: '/collaboration/partage', description: 'Partage de documents et recherches' },
        { label: 'Commentaires & annotations', href: '/collaboration/annotations', description: 'Travail collaboratif sur documents' },
        { label: 'Espaces de travail', href: '/collaboration/espaces', description: 'Espaces collaboratifs privés/publics' },
        { label: 'Forum juridique', href: '/collaboration/forum', description: 'Contributions et discussions' },
        { label: 'Ressources', href: '/collaboration/ressources', description: 'Documents explicatifs' }
      ]
    },
    {
      id: 'news',
      label: t('news'),
      hasDropdown: true,
      items: [
        { label: 'Actualités', href: '/actualites/news', description: 'Dernières nouvelles juridiques' },
        { label: 'Activités', href: '/actualites/activites', description: 'Événements et formations' },
        { label: 'Dictionnaires', href: '/actualites/dictionnaires', description: 'Dictionnaires juridiques' },
        { label: 'Annuaires', href: '/actualites/annuaires', description: 'Annuaires professionnels' }
      ]
    },
    {
      id: 'configuration',
      label: t('configuration'),
      hasDropdown: true,
      items: [
        { label: 'Nomenclature', href: '/config/nomenclature', description: 'Gestion des classifications' },
        { label: 'Ressources externes', href: '/config/ressources-externes', description: 'Liens vers ressources externes' },
        { label: 'Alertes & Notifications', href: '/config/alertes', description: 'Configuration des alertes' },
        { label: 'Gestion utilisateurs', href: '/config/utilisateurs', description: 'Administration des utilisateurs' },
        { label: 'Sécurité', href: '/config/securite', description: 'Paramètres de sécurité' }
      ]
    },
    {
      id: 'help',
      label: t('help'),
      hasDropdown: true,
      items: [
        { label: 'À propos', href: '/aide/a-propos', description: 'Informations sur la plateforme' },
        { label: 'Contactez-nous', href: '/aide/contact', description: 'Nous contacter' },
        { label: 'FAQ', href: '/aide/faq', description: 'Questions fréquemment posées' },
        { label: 'Assistance interactive', href: '/aide/chat', description: 'Chat d\'assistance en ligne' },
        { label: 'Support technique', href: '/aide/support-technique', description: 'Support technique spécialisé' }
      ]
    }
  ];

  const handleMouseEnter = (menuId: string) => {
    setActiveDropdown(menuId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Government Bar */}
      <div className="bg-gradient-to-r from-teal-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className={`flex items-center justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <span className="font-medium">{t('algerianRepublic')}</span>
              <span className="text-teal-200">|</span>
              <span className="text-teal-100">{t('algerianRepublicFr')}</span>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Main Header with Logo and User Info */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Logo and Title */}
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              
              <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <div className="bg-gradient-to-r from-teal-600 to-emerald-700 p-2 rounded-lg">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h1 className="text-xl font-bold text-teal-700">{t('appName')}</h1>
                  <p className="text-xs text-gray-600">{t('appDescription')}</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t('quickSearch')}
                  className={`border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-full py-2 px-4 ${
                    isRTL ? 'text-right pr-10 pl-4' : 'text-left pl-10 pr-4'
                  }`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <Search className={`h-4 w-4 text-gray-400 absolute top-3 ${isRTL ? 'right-3' : 'left-3'}`} />
              </div>
            </div>

            {/* User Actions */}
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <MessageSquare className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>

              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">7</span>
              </button>

              <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
                />
                <div className={`hidden md:block ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Navigation Menu */}
      <nav className="hidden lg:block bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`flex items-center justify-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={item.href || '#'}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors hover:text-teal-600 hover:bg-white rounded-t-lg ${
                    activeDropdown === item.id ? 'text-teal-600 bg-white shadow-sm' : 'text-gray-700'
                  } ${isRTL ? 'space-x-reverse' : ''}`}
                >
                  <span className={isRTL ? 'text-right' : 'text-left'}>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      activeDropdown === item.id ? 'rotate-180' : ''
                    }`} />
                  )}
                </a>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.id && (
                  <div className={`absolute top-full w-96 bg-white border border-gray-200 rounded-b-lg rounded-tr-lg shadow-lg z-50 ${
                    isRTL ? 'right-0' : 'left-0'
                  }`}>
                    <div className="p-2 max-h-96 overflow-y-auto">
                      {item.items?.map((subItem, index) => (
                        <a
                          key={index}
                          href={subItem.href}
                          className={`block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group ${
                            subItem.highlight ? 'bg-teal-50 border border-teal-200' : ''
                          }`}
                        >
                          <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                            {subItem.icon === 'plus' && (
                              <Plus className={`h-4 w-4 ${subItem.highlight ? 'text-teal-600' : 'text-gray-400'}`} />
                            )}
                            <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                              <div className={`font-medium text-sm ${
                                subItem.highlight ? 'text-teal-700' : 'text-gray-900 group-hover:text-teal-600'
                              }`}>
                                {subItem.label}
                              </div>
                              <div className={`text-xs mt-1 ${
                                subItem.highlight ? 'text-teal-600' : 'text-gray-500'
                              }`}>
                                {subItem.description}
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;