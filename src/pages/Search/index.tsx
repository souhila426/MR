import React, { useState } from 'react';
import { Search as SearchIcon, Filter, Calendar, FileText, Scale, BookOpen, Tag } from 'lucide-react';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = [
    { id: 'type', label: 'Type de Document', options: ['Loi', 'Décret', 'Arrêté', 'Circulaire', 'Ordonnance'] },
    { id: 'domain', label: 'Domaine', options: ['Droit du Travail', 'Droit Fiscal', 'Droit Commercial', 'Procédures Admin.'] },
    { id: 'date', label: 'Période', options: ['Cette semaine', 'Ce mois', 'Cette année', 'Personnalisé'] },
    { id: 'status', label: 'Statut', options: ['En vigueur', 'Abrogé', 'Modifié', 'En cours'] }
  ];

  const searchResults = [
    {
      id: 1,
      title: 'Code du travail - Loi n° 90-11 du 21 avril 1990',
      type: 'Loi',
      domain: 'Droit du Travail',
      date: '1990-04-21',
      status: 'En vigueur',
      excerpt: 'La présente loi définit les relations individuelles et collectives de travail ainsi que les conditions d\'emploi et de travail des salariés...',
      relevance: 95,
      tags: ['travail', 'emploi', 'salaire', 'contrat']
    },
    {
      id: 2,
      title: 'Décret exécutif n° 24-01 relatif aux procédures administratives',
      type: 'Décret',
      domain: 'Procédures Admin.',
      date: '2024-01-15',
      status: 'En vigueur',
      excerpt: 'Ce décret fixe les modalités d\'application des procédures administratives simplifiées pour les citoyens et les entreprises...',
      relevance: 88,
      tags: ['procédure', 'administration', 'simplification']
    },
    {
      id: 3,
      title: 'Loi de finances 2024 - Loi n° 23-16 du 30 décembre 2023',
      type: 'Loi',
      domain: 'Droit Fiscal',
      date: '2023-12-30',
      status: 'En vigueur',
      excerpt: 'La loi de finances pour 2024 prévoit les recettes et les charges de l\'État ainsi que les dispositions fiscales...',
      relevance: 82,
      tags: ['budget', 'fiscalité', 'impôts', 'finances']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Recherche Avancée</h1>
        
        <div className="relative mb-6">
          <SearchIcon className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher dans la base juridique (ex: contrat de travail, impôt sur les sociétés...)"
            className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {filters.map((filter) => (
            <div key={filter.id}>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {filter.label}
              </label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="">Tous</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <SearchIcon className="h-4 w-4" />
              <span>Rechercher</span>
            </button>
            <button className="text-slate-600 hover:text-slate-800 flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filtres avancés</span>
            </button>
          </div>
          <span className="text-sm text-slate-500">
            {searchResults.length} résultats trouvés
          </span>
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        {searchResults.map((result) => (
          <div key={result.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-lg font-semibold text-slate-900 hover:text-green-600 cursor-pointer">
                    {result.title}
                  </h2>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    result.type === 'Loi' ? 'bg-green-100 text-green-700' :
                    result.type === 'Décret' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {result.type}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Scale className="h-4 w-4" />
                    <span>{result.domain}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(result.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    result.status === 'En vigueur' ? 'bg-green-100 text-green-700' :
                    result.status === 'Modifié' ? 'bg-red-100 text-red-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {result.status}
                  </span>
                </div>

                <p className="text-slate-700 mb-4 leading-relaxed">
                  {result.excerpt}
                </p>

                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-slate-400" />
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, index) => (
                      <span key={index} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2 ml-6">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">Pertinence:</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-20 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${result.relevance}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-slate-700">{result.relevance}%</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <FileText className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <BookOpen className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 py-6">
        <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          Précédent
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg">1</button>
        <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">2</button>
        <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">3</button>
        <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Search;