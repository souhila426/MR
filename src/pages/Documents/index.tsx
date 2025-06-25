import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Star, 
  MoreVertical,
  Upload,
  FolderPlus,
  Calendar,
  Tag
} from 'lucide-react';

const Documents: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const documents = [
    {
      id: 1,
      title: 'Code du travail algérien - Version consolidée 2024',
      type: 'Loi',
      size: '2.3 MB',
      date: '2024-01-15',
      category: 'Droit du Travail',
      status: 'En vigueur',
      isFavorite: true,
      annotations: 5,
      thumbnail: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 2,
      title: 'Procédures administratives simplifiées - Guide 2024',
      type: 'Guide',
      size: '1.8 MB',
      date: '2024-01-12',
      category: 'Procédures Admin.',
      status: 'Nouveau',
      isFavorite: false,
      annotations: 2,
      thumbnail: 'https://images.pexels.com/photos/5673488/pexels-photo-5673488.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 3,
      title: 'Loi de finances 2024 - Dispositions fiscales',
      type: 'Loi',
      size: '4.1 MB',
      date: '2023-12-30',
      category: 'Droit Fiscal',
      status: 'En vigueur',
      isFavorite: true,
      annotations: 12,
      thumbnail: 'https://images.pexels.com/photos/6913/finance-papers-business-money.jpg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 4,
      title: 'Décret sur les marchés publics - Modifications 2024',
      type: 'Décret',
      size: '976 KB',
      date: '2024-01-10',
      category: 'Droit Commercial',
      status: 'Modifié',
      isFavorite: false,
      annotations: 0,
      thumbnail: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous les documents', count: documents.length },
    { id: 'work', name: 'Droit du Travail', count: documents.filter(d => d.category === 'Droit du Travail').length },
    { id: 'tax', name: 'Droit Fiscal', count: documents.filter(d => d.category === 'Droit Fiscal').length },
    { id: 'admin', name: 'Procédures Admin.', count: documents.filter(d => d.category === 'Procédures Admin.').length },
    { id: 'commercial', name: 'Droit Commercial', count: documents.filter(d => d.category === 'Droit Commercial').length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En vigueur': return 'bg-green-100 text-green-700';
      case 'Nouveau': return 'bg-blue-100 text-blue-700';
      case 'Modifié': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeIcon = (type: string) => {
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion des Documents</h1>
          <p className="text-slate-600 mt-1">
            Organisez et gérez votre bibliothèque juridique
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Importer</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <FolderPlus className="h-4 w-4" />
            <span>Nouveau dossier</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 lg:mr-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher dans vos documents..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Trier par date</option>
              <option>Trier par nom</option>
              <option>Trier par taille</option>
              <option>Trier par pertinence</option>
            </select>
            
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setView('list')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  view === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Liste
              </button>
              <button
                onClick={() => setView('grid')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  view === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Grille
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Catégories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedFilter(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedFilter === category.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Actions rapides</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                  <Star className="h-4 w-4" />
                  <span>Documents favoris</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span>Récemment ajoutés</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                  <Tag className="h-4 w-4" />
                  <span>Documents annotés</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Documents</h2>
                <span className="text-sm text-slate-500">
                  {documents.length} documents
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-200">
              {documents.map((doc) => (
                <div key={doc.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={doc.thumbnail}
                        alt={doc.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-sm font-medium text-slate-900 truncate">
                          {doc.title}
                        </h3>
                        {doc.isFavorite && (
                          <Star className="h-4 w-4 text-amber-500 fill-current flex-shrink-0" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <div className="flex items-center space-x-1">
                          {getTypeIcon(doc.type)}
                          <span>{doc.type}</span>
                        </div>
                        <span>{doc.size}</span>
                        <span>{new Date(doc.date).toLocaleDateString('fr-FR')}</span>
                        <span className="bg-slate-100 px-2 py-1 rounded">{doc.category}</span>
                      </div>

                      {doc.annotations > 0 && (
                        <div className="flex items-center space-x-1 mt-2 text-xs text-blue-600">
                          <Tag className="h-3 w-3" />
                          <span>{doc.annotations} annotation{doc.annotations > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;