import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X,
  ChevronDown,
  ChevronRight,
  Home,
  FileText,
  ClipboardList,
  BarChart3,
  Users,
  Newspaper,
  Settings,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t, isRTL } = useLanguage();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const location = useLocation();

  const menuItems = [
    {
      id: 'home',
      label: t('home'),
      href: '/',
      icon: Home,
      hasSubmenu: false
    },
    {
      id: 'legal-texts',
      label: t('legalTexts'),
      icon: FileText,
      hasSubmenu: true,
      items: [
        { label: 'Catalogue', href: '/textes/catalogue' },
        { label: 'Mise à jour', href: '/textes/mise-a-jour' },
        { label: 'Extraction automatique', href: '/textes/extraction' },
        { label: 'Recherche interactive', href: '/textes/recherche-interactive' },
        { label: 'Recherche avancée', href: '/textes/recherche-avancee' },
        { label: 'Recherches sauvegardées', href: '/textes/recherches-sauvegardees' },
        { label: 'Recherche universelle', href: '/textes/recherche-universelle' },
        { label: 'Rédaction assistée', href: '/textes/redaction-assistee' }
      ]
    },
    {
      id: 'procedures',
      label: t('procedures'),
      icon: ClipboardList,
      hasSubmenu: true,
      items: [
        { label: 'Catalogue', href: '/procedures/catalogue' },
        { label: 'Mise à jour', href: '/procedures/mise-a-jour' },
        { label: 'Recherche universelle', href: '/procedures/recherche-universelle' },
        { label: 'Recherche interactive', href: '/procedures/recherche-interactive' },
        { label: 'Recherche avancée', href: '/procedures/recherche-avancee' },
        { label: 'Recherches sauvegardées', href: '/procedures/recherches-sauvegardees' },
        { label: 'Formulaires', href: '/procedures/formulaires' },
        { label: 'Guide pratique', href: '/procedures/guide-pratique' }
      ]
    },
    {
      id: 'analysis',
      label: t('analysis'),
      icon: BarChart3,
      hasSubmenu: true,
      items: [
        { label: 'Tableaux de bord', href: '/analyse/tableaux-de-bord' },
        { label: 'Analyse comparative', href: '/analyse/comparative' },
        { label: 'Rapports personnalisés', href: '/analyse/rapports' }
      ]
    },
    {
      id: 'collaboration',
      label: t('collaboration'),
      icon: Users,
      hasSubmenu: true,
      items: [
        { label: 'Partage d\'information', href: '/collaboration/partage' },
        { label: 'Commentaires & annotations', href: '/collaboration/annotations' },
        { label: 'Espaces de travail', href: '/collaboration/espaces' },
        { label: 'Forum juridique', href: '/collaboration/forum' },
        { label: 'Ressources', href: '/collaboration/ressources' }
      ]
    },
    {
      id: 'news',
      label: t('news'),
      icon: Newspaper,
      hasSubmenu: true,
      items: [
        { label: 'Actualités', href: '/actualites/news' },
        { label: 'Activités', href: '/actualites/activites' },
        { label: 'Dictionnaires', href: '/actualites/dictionnaires' },
        { label: 'Annuaires', href: '/actualites/annuaires' }
      ]
    },
    {
      id: 'configuration',
      label: t('configuration'),
      icon: Settings,
      hasSubmenu: true,
      items: [
        { label: 'Nomenclature', href: '/config/nomenclature' },
        { label: 'Ressources externes', href: '/config/ressources-externes' },
        { label: 'Alertes & Notifications', href: '/config/alertes' },
        { label: 'Gestion utilisateurs', href: '/config/utilisateurs' },
        { label: 'Sécurité', href: '/config/securite' }
      ]
    },
    {
      id: 'help',
      label: t('help'),
      icon: HelpCircle,
      hasSubmenu: true,
      items: [
        { label: 'À propos', href: '/aide/a-propos' },
        { label: 'Contactez-nous', href: '/aide/contact' },
        { label: 'FAQ', href: '/aide/faq' },
        { label: 'Assistance interactive', href: '/aide/chat' },
        { label: 'Support technique', href: '/aide/support-technique' }
      ]
    }
  ];

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId);
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed top-0 h-full w-80 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out z-50 lg:hidden
        ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}
        ${isRTL ? 'right-0' : 'left-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h2 className="text-lg font-semibold text-green-700">{t('appName')}</h2>
                <p className="text-xs text-gray-500">Navigation</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.hasSubmenu ? (
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}
                    >
                      <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <item.icon className="h-5 w-5 text-gray-500" />
                        <span>{item.label}</span>
                      </div>
                      {expandedMenu === item.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                  ) : (
                    <Link
                      to={item.href!}
                      onClick={onClose}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === item.href
                          ? 'bg-green-50 text-green-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      } ${isRTL ? 'space-x-reverse text-right flex-row-reverse' : 'text-left'}`}
                    >
                      <item.icon className={`h-5 w-5 ${
                        location.pathname === item.href ? 'text-green-700' : 'text-gray-500'
                      }`} />
                      <span>{item.label}</span>
                    </Link>
                  )}

                  {/* Submenu */}
                  {item.hasSubmenu && expandedMenu === item.id && (
                    <div className={`mt-2 space-y-1 ${isRTL ? 'mr-8' : 'ml-8'}`}>
                      {item.items?.map((subItem, index) => (
                        <Link
                          key={index}
                          to={subItem.href}
                          onClick={onClose}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                            location.pathname === subItem.href
                              ? 'bg-green-50 text-green-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                          } ${isRTL ? 'text-right' : 'text-left'}`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;