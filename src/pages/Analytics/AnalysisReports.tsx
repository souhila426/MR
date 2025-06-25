import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  Search,
  BarChart3,
  TrendingUp,
  Eye,
  Share2,
  Star,
  Clock,
  User,
  Tag
} from 'lucide-react';

const AnalysisReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('analyses');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const stats = [
    { title: 'Analyses publiées', value: '1,247', change: '+12%', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Téléchargements', value: '34,567', change: '+23%', icon: Download, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Lectures', value: '128,945', change: '+18%', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Partages', value: '2,834', change: '+15%', icon: Share2, color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  const analyses = [
    {
      id: 1,
      type: 'Analyse juridique',
      category: 'Droit des affaires',
      title: 'Impact de la réforme du droit des sociétés sur les PME',
      author: 'Dr. Marie Dubois',
      date: '12 janvier 2025',
      views: 2647,
      readTime: '15 min de lecture',
      description: 'Analyse approfondie des conséquences de la loi n° 2025-123 sur les petites et moyennes entreprises françaises.',
      tags: ['réforme', 'PME', 'sociétés', 'impact économique'],
      downloads: 156,
      isFeatured: true
    },
    {
      id: 2,
      type: 'Étude comparative',
      category: 'Droit de l\'environnement',
      title: 'Évolution de la jurisprudence en matière environnementale',
      author: 'Prof. Jean Martin',
      date: '8 janvier 2025',
      views: 1923,
      readTime: '22 min de lecture',
      description: 'Étude comparative des décisions récentes des juridictions administratives en matière de protection de l\'environnement.',
      tags: ['jurisprudence', 'environnement', 'évolution', 'comparative'],
      downloads: 89,
      isFeatured: false
    }
  ];

  const reports = [
    {
      id: 1,
      type: 'Rapport officiel',
      title: 'Rapport annuel sur l\'évolution législative 2024',
      date: 'Décembre 2024',
      pages: 156,
      downloads: 1247,
      size: '12.4 MB',
      description: 'Synthèse complète des principales évolutions législatives et réglementaires de l\'année 2024.',
      format: 'PDF'
    },
    {
      id: 2,
      type: 'Rapport officiel',
      title: 'Baromètre trimestriel de la jurisprudence - Q4 2024',
      date: 'Octobre 2024',
      pages: 87,
      downloads: 892,
      size: '8.7 MB',
      description: 'Analyse statistique et qualitative des décisions de justice du dernier trimestre 2024.',
      format: 'PDF'
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'droit-affaires', name: 'Droit des affaires' },
    { id: 'droit-travail', name: 'Droit du travail' },
    { id: 'droit-environnement', name: 'Droit de l\'environnement' },
    { id: 'droit-fiscal', name: 'Droit fiscal' },
    { id: 'droit-civil', name: 'Droit civil' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analyses et Rapports</h1>
        <p className="text-gray-600 mt-2">
          Expertise juridique et rapports d'analyse approfondie
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 lg:mr-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une analyse ou un rapport..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filtres</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('analyses')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'analyses'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Analyses Juridiques
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'reports'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Rapports Institutionnels
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'analyses' && (
            <div className="space-y-6">
              {analyses.map((analysis) => (
                <div key={analysis.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          {analysis.type}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {analysis.category}
                        </span>
                        {analysis.isFeatured && (
                          <Star className="h-4 w-4 text-amber-500 fill-current" />
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-green-600 cursor-pointer">
                        {analysis.title}
                      </h3>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{analysis.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{analysis.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{analysis.views} vues</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{analysis.readTime}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {analysis.description}
                      </p>

                      <div className="flex items-center space-x-2 mb-4">
                        <Tag className="h-4 w-4 text-gray-400" />
                        <div className="flex flex-wrap gap-2">
                          {analysis.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{analysis.downloads} téléchargements</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <Eye className="h-4 w-4" />
                        <span>Lire</span>
                      </button>
                      <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <Download className="h-4 w-4" />
                        <span>Télécharger</span>
                      </button>
                      <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <Share2 className="h-4 w-4" />
                        <span>Partager</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              {reports.map((report) => (
                <div key={report.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                          {report.type}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {report.format} - {report.size}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-green-600 cursor-pointer">
                        {report.title}
                      </h3>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{report.date}</span>
                        </div>
                        <span>{report.pages} pages</span>
                        <div className="flex items-center space-x-1">
                          <Download className="h-4 w-4" />
                          <span>{report.downloads} téléchargements</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {report.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Synthèse complète des principales évolutions législatives et réglementaires de l'année 2024.
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Télécharger</span>
                      </button>
                      <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <Eye className="h-4 w-4" />
                        <span>Aperçu</span>
                      </button>
                      <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <Share2 className="h-4 w-4" />
                        <span>Partager</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisReports;