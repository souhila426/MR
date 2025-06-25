import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  ArrowLeft,
  Save,
  X,
  Tag
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface LegalTextType {
  id: string;
  name: string;
  code: string;
  description: string;
  category: string;
  hierarchy: number;
  isActive: boolean;
  color: string;
  icon: string;
}

const LegalTextsTypes: React.FC = () => {
  const [textTypes, setTextTypes] = useState<LegalTextType[]>([
    {
      id: '1',
      name: 'Constitution',
      code: 'CONST',
      description: 'Loi fondamentale de l\'État',
      category: 'Constitutionnel',
      hierarchy: 1,
      isActive: true,
      color: '#DC2626',
      icon: 'Crown'
    },
    {
      id: '2',
      name: 'Loi Organique',
      code: 'LO',
      description: 'Loi relative à l\'organisation des pouvoirs publics',
      category: 'Législatif',
      hierarchy: 2,
      isActive: true,
      color: '#7C2D12',
      icon: 'Scale'
    },
    {
      id: '3',
      name: 'Loi Ordinaire',
      code: 'LOI',
      description: 'Loi votée par le Parlement',
      category: 'Législatif',
      hierarchy: 3,
      isActive: true,
      color: '#1D4ED8',
      icon: 'FileText'
    },
    {
      id: '4',
      name: 'Ordonnance',
      code: 'ORD',
      description: 'Acte pris par le Président de la République',
      category: 'Exécutif',
      hierarchy: 4,
      isActive: true,
      color: '#7C3AED',
      icon: 'Scroll'
    },
    {
      id: '5',
      name: 'Décret Exécutif',
      code: 'DE',
      description: 'Acte réglementaire du Premier Ministre',
      category: 'Exécutif',
      hierarchy: 5,
      isActive: true,
      color: '#059669',
      icon: 'FileCheck'
    },
    {
      id: '6',
      name: 'Arrêté Ministériel',
      code: 'AM',
      description: 'Acte administratif d\'un ministre',
      category: 'Administratif',
      hierarchy: 6,
      isActive: true,
      color: '#D97706',
      icon: 'FileSignature'
    },
    {
      id: '7',
      name: 'Circulaire',
      code: 'CIRC',
      description: 'Instruction administrative',
      category: 'Administratif',
      hierarchy: 7,
      isActive: true,
      color: '#6B7280',
      icon: 'MessageCircle'
    }
  ]);

  const [editingType, setEditingType] = useState<LegalTextType | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Constitutionnel', 'Législatif', 'Exécutif', 'Administratif', 'Judiciaire'];

  const getHierarchyLabel = (hierarchy: number) => {
    const labels = {
      1: 'Niveau 1 - Suprême',
      2: 'Niveau 2 - Organique',
      3: 'Niveau 3 - Législatif',
      4: 'Niveau 4 - Ordonnance',
      5: 'Niveau 5 - Réglementaire',
      6: 'Niveau 6 - Ministériel',
      7: 'Niveau 7 - Administratif'
    };
    return labels[hierarchy as keyof typeof labels] || `Niveau ${hierarchy}`;
  };

  const filteredTypes = textTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
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
        <h1 className="text-3xl font-bold text-gray-900">Types de Textes Juridiques</h1>
        <p className="text-gray-600 mt-2">
          Gérez la classification et la hiérarchie des types de textes juridiques
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
                placeholder="Rechercher un type de texte..."
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

      {/* Hierarchy Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hiérarchie des Normes</h2>
        <div className="space-y-3">
          {textTypes
            .sort((a, b) => a.hierarchy - b.hierarchy)
            .map((type, index) => (
              <div key={type.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
                    {type.hierarchy}
                  </span>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: type.color }}
                  ></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{type.name}</span>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {type.code}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
                <span className="text-sm text-gray-500">{type.category}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Types List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Liste des Types</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hiérarchie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTypes.map((type) => (
                <tr key={type.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: type.color }}
                      ></div>
                      <div>
                        <div className="font-medium text-gray-900">{type.name}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                      {type.code}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{type.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {getHierarchyLabel(type.hierarchy)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      type.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {type.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Modifier le type de texte</h3>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Niveau hiérarchique</label>
                  <select
                    value={editingType.hierarchy}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(level => (
                      <option key={level} value={level}>Niveau {level}</option>
                    ))}
                  </select>
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

export default LegalTextsTypes;