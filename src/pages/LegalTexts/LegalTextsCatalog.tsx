import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  Scale, 
  BookOpen, 
  Building,
  Calendar,
  Eye,
  Download,
  ArrowRight,
  Tag
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const LegalTextsCatalog: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('catalogue');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('tous');
  const [sortBy, setSortBy] = useState('date-recent');

  const tabs = [
    { id: 'catalogue', label: 'Catalogue', active: true },
    { id: 'recherche-avancee', label: 'Recherche avancée' },
    { id: 'extraction', label: 'Extraction de données' },
    { id: 'redaction', label: 'Rédaction assistée' }
  ];

  const quickAccessCards = [
    {
      title: 'Codes en vigueur',
      description: 'Accédez aux codes juridiques actuellement en application',
      count: '25 codes',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Jurisprudence récente',
      description: 'Dernières décisions des cours et tribunaux',
      count: '1,234 décisions',
      icon: Scale,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Textes consolidés',
      description: 'Versions consolidées des textes avec modifications',
      count: '5,678 textes',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Institutions',
      description: 'Textes relatifs aux institutions publiques',
      count: '892 textes',
      icon: Building,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    }
  ];

  const filters = [
    { id: 'tous', label: 'Tous les textes (245,678)' },
    { id: 'lois', label: 'Lois' },
    { id: 'decrets', label: 'Décrets' },
    { id: 'arretes', label: 'Arrêtés' },
    { id: 'circulaires', label: 'Circulaires' },
    { id: 'ordonnances', label: 'Ordonnances' }
  ];

  const dateFilters = [
    { id: 'toutes', label: 'Toutes les dates' },
    { id: 'semaine', label: 'Cette semaine' },
    { id: 'mois', label: 'Ce mois' },
    { id: 'annee', label: 'Cette année' },
    { id: 'personnalise', label: 'Période personnalisée' }
  ];

  const recentTexts = [
    {
      id: 1,
      type: 'Loi',
      status: 'En vigueur',
      date: '15 janvier 2025',
      views: 1247,
      title: 'Loi n° 2025-123 du 15 janvier 2025 relative à la modernisation du droit des sociétés',
      ministry: 'Ministère de la Justice',
      reference: 'JO N° 12 du 23 janvier 2025, Page 16',
      description: 'Cette loi introduit de nouvelles dispositions pour moderniser le fonctionnement des sociétés commerciales et améliorer la gouvernance d\'entreprise.',
      tags: ['Droit des sociétés', 'Modernisation', 'Gouvernement d\'entreprise']
    },
    {
      id: 2,
      type: 'Décret',
      status: 'En vigueur',
      date: '12 janvier 2025',
      views: 892,
      title: 'Décret exécutif n° 25-15 fixant les modalités d\'application de la loi sur la digitalisation',
      ministry: 'Ministère de la Transformation Numérique',
      reference: 'JO N° 11 du 20 janvier 2025, Page 8',
      description: 'Ce décret précise les conditions et modalités d\'application de la loi relative à la transformation numérique de l\'administration.',
      tags: ['Digitalisation', 'Administration', 'Transformation numérique']
    },
    {
      id: 3,
      type: 'Arrêté',
      status: 'En vigueur',
      date: '10 janvier 2025',
      views: 654,
      title: 'Arrêté ministériel du 10 janvier 2025 portant organisation des examens professionnels',
      ministry: 'Ministère de l\'Éducation Nationale',
      reference: 'JO N° 10 du 18 janvier 2025, Page 24',
      description: 'Cet arrêté définit les modalités d\'organisation et de déroulement des examens professionnels pour l\'année 2025.',
      tags: ['Éducation', 'Examens', 'Formation professionnelle']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En vigueur': return 'bg-green-100 text-green-700';
      case 'Abrogé': return 'bg-red-100 text-red-700';
      case 'Modifié': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Loi': return 'bg-blue-100 text-blue-700';
      case 'Décret': return 'bg-green-100 text-green-700';
      case 'Arrêté': return 'bg-purple-100 text-purple-700';
      case 'Circulaire': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className={isRTL ? 'text-right' : 'text-left'}>
        <h1 className="text-3xl font-bold text-gray-900">Textes Juridiques et Réglementaires</h1>
        <p className="text-gray-600 mt-2">
          Consultez l'ensemble des textes officiels en vigueur
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className={`flex space-x-8 px-6 ${isRTL ? 'space-x-reverse' : ''}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Accès rapide */}
      <div>
        <h2 className={`text-xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          Accès rapide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickAccessCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`p-3 rounded-xl ${card.bgColor}`}>
                  <card.icon className={`h-6 w-6 ${card.textColor}`} />
                </div>
                <ArrowRight className={`h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors ${isRTL ? 'rotate-180' : ''}`} />
              </div>
              <h3 className={`font-semibold text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                {card.title}
              </h3>
              <p className={`text-sm text-gray-600 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                {card.description}
              </p>
              <p className={`text-sm font-medium text-green-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                {card.count}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recherche et filtres */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="relative mb-6">
          <Search className={`absolute top-4 h-5 w-5 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par titre, numéro, ou mots-clés..."
            className={`w-full border border-gray-300 rounded-lg py-4 px-4 focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              isRTL ? 'pr-12 text-right' : 'pl-12 text-left'
            }`}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>

        <div className={`flex items-center space-x-4 mb-6 ${isRTL ? 'space-x-reverse' : ''}`}>
          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtres:</span>
          </div>
          
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {filters.map((filter) => (
              <option key={filter.id} value={filter.id}>{filter.label}</option>
            ))}
          </select>

          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent">
            {dateFilters.map((filter) => (
              <option key={filter.id} value={filter.id}>{filter.label}</option>
            ))}
          </select>
        </div>

        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-sm text-gray-500">5 textes trouvés</span>
          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            <span className="text-sm text-gray-500">Trier par:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="date-recent">Date (plus récent)</option>
              <option value="date-ancien">Date (plus ancien)</option>
              <option value="titre">Titre</option>
              <option value="pertinence">Pertinence</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des textes */}
      <div className="space-y-4">
        {recentTexts.map((text) => (
          <div key={text.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(text.type)}`}>
                  {text.type}
                </span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(text.status)}`}>
                  {text.status}
                </span>
                <div className={`flex items-center space-x-1 text-xs text-gray-500 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <Calendar className="h-3 w-3" />
                  <span>{text.date}</span>
                </div>
                <div className={`flex items-center space-x-1 text-xs text-gray-500 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <Eye className="h-3 w-3" />
                  <span>{text.views} vues</span>
                </div>
              </div>
              <ArrowRight className={`h-5 w-5 text-gray-400 ${isRTL ? 'rotate-180' : ''}`} />
            </div>

            <h3 className={`text-lg font-semibold text-gray-900 mb-2 hover:text-green-600 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}>
              {text.title}
            </h3>

            <div className={`text-sm text-gray-600 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="mb-1"><strong>{text.ministry}</strong> • {text.reference}</p>
            </div>

            <p className={`text-gray-700 mb-4 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {text.description}
            </p>

            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                <Tag className="h-4 w-4 text-gray-400" />
                <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  {text.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium">
                  <Eye className="h-4 w-4" />
                  <span>Consulter</span>
                </button>
                <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium">
                  <Download className="h-4 w-4" />
                  <span>Télécharger</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 py-6">
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
          Précédent
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">1</button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">2</button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">3</button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
          Suivant
        </button>
      </div>
    </div>
  );
};

export default LegalTextsCatalog;