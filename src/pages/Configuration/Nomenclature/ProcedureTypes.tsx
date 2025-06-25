import React, { useState } from 'react';
import { 
  ClipboardList, 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  ArrowLeft,
  Save,
  X,
  Tag,
  Clock,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProcedureType {
  id: string;
  name: string;
  code: string;
  description: string;
  category: string;
  subcategory?: string;
  estimatedDuration: string;
  complexity: 'simple' | 'moyen' | 'complexe';
  cost: 'gratuit' | 'payant' | 'variable';
  isActive: boolean;
  color: string;
  requiredDocuments: string[];
}

const ProcedureTypes: React.FC = () => {
  const [procedureTypes, setProcedureTypes] = useState<ProcedureType[]>([
    {
      id: '1',
      name: 'Demande de passeport',
      code: 'PASS',
      description: 'Procédure de demande de passeport biométrique',
      category: 'État Civil',
      subcategory: 'Documents d\'identité',
      estimatedDuration: '7-15 jours',
      complexity: 'simple',
      cost: 'payant',
      isActive: true,
      color: '#3B82F6',
      requiredDocuments: ['Acte de naissance', 'Photo d\'identité', 'Justificatif de domicile']
    },
    {
      id: '2',
      name: 'Création d\'entreprise SARL',
      code: 'SARL',
      description: 'Procédure de création d\'une société à responsabilité limitée',
      category: 'Commercial',
      subcategory: 'Création d\'entreprise',
      estimatedDuration: '15-30 jours',
      complexity: 'complexe',
      cost: 'payant',
      isActive: true,
      color: '#10B981',
      requiredDocuments: ['Statuts', 'Attestation de dépôt de capital', 'Formulaire M0']
    },
    {
      id: '3',
      name: 'Déclaration fiscale',
      code: 'FISC',
      description: 'Déclaration annuelle des revenus',
      category: 'Fiscal',
      subcategory: 'Déclarations',
      estimatedDuration: '1-5 jours',
      complexity: 'moyen',
      cost: 'gratuit',
      isActive: true,
      color: '#F59E0B',
      requiredDocuments: ['Relevés de revenus', 'Justificatifs de charges']
    },
    {
      id: '4',
      name: 'Permis de construire',
      code: 'PC',
      description: 'Autorisation de construire un bâtiment',
      category: 'Urbanisme',
      subcategory: 'Autorisations',
      estimatedDuration: '30-90 jours',
      complexity: 'complexe',
      cost: 'payant',
      isActive: true,
      color: '#8B5CF6',
      requiredDocuments: ['Plans architecturaux', 'Étude géotechnique', 'Titre de propriété']
    }
  ]);

  const [editingType, setEditingType] = useState<ProcedureType | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'État Civil',
    'Commercial',
    'Fiscal',
    'Urbanisme',
    'Transport',
    'Éducation',
    'Santé',
    'Social',
    'Environnement'
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-700';
      case 'moyen': return 'bg-amber-100 text-amber-700';
      case 'complexe': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'gratuit': return 'bg-green-100 text-green-700';
      case 'payant': return 'bg-blue-100 text-blue-700';
      case 'variable': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredTypes = procedureTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/config/nomenclature"
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour aux nomenclatures</span>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Types de Procédures Administratives</h1>
        <p className="text-gray-600 mt-2">
          Gérez la classification des procédures administratives et leurs caractéristiques
        </p>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 lg:mr-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une procédure..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nouveau type</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Procédures', value: procedureTypes.length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Procédures Simples', value: procedureTypes.filter(p => p.complexity === 'simple').length, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Procédures Gratuites', value: procedureTypes.filter(p => p.cost === 'gratuit').length, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Catégories', value: new Set(procedureTypes.map(p => p.category)).size, color: 'text-amber-600', bg: 'bg-amber-50' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className={`p-3 rounded-lg ${stat.bg} mb-4 w-fit`}>
              <ClipboardList className={`h-6 w-6 ${stat.color}`} />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Procedures List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Liste des Types de Procédures</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredTypes.map((type) => (
            <div key={type.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: type.color }}
                    ></div>
                    <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-mono">
                      {type.code}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{type.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                      {type.category}
                    </span>
                    {type.subcategory && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {type.subcategory}
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded text-sm ${getComplexityColor(type.complexity)}`}>
                      {type.complexity}
                    </span>
                    <span className={`px-2 py-1 rounded text-sm ${getCostColor(type.cost)}`}>
                      {type.cost}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{type.estimatedDuration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag className="h-4 w-4" />
                      <span>{type.requiredDocuments.length} documents requis</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <strong>Documents requis:</strong> {type.requiredDocuments.join(', ')}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setEditingType(type)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Modifier le type de procédure</h3>
              <button
                onClick={() => setEditingType(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    value={editingType.name}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
                  <input
                    type="text"
                    value={editingType.code}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingType.description}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                  <select
                    value={editingType.category}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sous-catégorie</label>
                  <input
                    type="text"
                    value={editingType.subcategory || ''}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complexité</label>
                  <select
                    value={editingType.complexity}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="simple">Simple</option>
                    <option value="moyen">Moyen</option>
                    <option value="complexe">Complexe</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coût</label>
                  <select
                    value={editingType.cost}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="gratuit">Gratuit</option>
                    <option value="payant">Payant</option>
                    <option value="variable">Variable</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durée estimée</label>
                  <input
                    type="text"
                    value={editingType.estimatedDuration}
                    placeholder="ex: 7-15 jours"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
                <input
                  type="color"
                  value={editingType.color}
                  className="w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Documents requis</label>
                <textarea
                  value={editingType.requiredDocuments.join('\n')}
                  rows={4}
                  placeholder="Un document par ligne"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingType(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Enregistrer</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcedureTypes;