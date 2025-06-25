import React, { useState } from 'react';
import { 
  Building, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronDown, 
  ChevronRight,
  ArrowLeft,
  Save,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Institution {
  id: string;
  name: string;
  type: 'secteur' | 'ministere' | 'administration' | 'direction';
  parentId?: string;
  code?: string;
  description?: string;
  isActive: boolean;
  children?: Institution[];
}

const InstitutionsManagement: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([
    {
      id: '1',
      name: 'Secteur de la Justice',
      type: 'secteur',
      code: 'JUST',
      description: 'Secteur ministériel de la justice',
      isActive: true,
      children: [
        {
          id: '1-1',
          name: 'Ministère de la Justice',
          type: 'ministere',
          parentId: '1',
          code: 'MJ',
          isActive: true,
          children: [
            {
              id: '1-1-1',
              name: 'Direction Générale de l\'Administration Pénitentiaire',
              type: 'direction',
              parentId: '1-1',
              code: 'DGAP',
              isActive: true
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Secteur de l\'Intérieur',
      type: 'secteur',
      code: 'INT',
      description: 'Secteur ministériel de l\'intérieur',
      isActive: true,
      children: [
        {
          id: '2-1',
          name: 'Ministère de l\'Intérieur',
          type: 'ministere',
          parentId: '2',
          code: 'MI',
          isActive: true
        }
      ]
    }
  ]);

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1', '2']));
  const [editingInstitution, setEditingInstitution] = useState<Institution | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'secteur': return 'Secteur';
      case 'ministere': return 'Ministère';
      case 'administration': return 'Administration';
      case 'direction': return 'Direction';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'secteur': return 'bg-blue-100 text-blue-700';
      case 'ministere': return 'bg-green-100 text-green-700';
      case 'administration': return 'bg-purple-100 text-purple-700';
      case 'direction': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderInstitutionTree = (institutions: Institution[], level: number = 0) => {
    return institutions.map((institution) => (
      <div key={institution.id} className={`${level > 0 ? 'ml-6' : ''}`}>
        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg mb-2 hover:shadow-sm transition-shadow">
          <div className="flex items-center space-x-3">
            {institution.children && institution.children.length > 0 ? (
              <button
                onClick={() => toggleNode(institution.id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {expandedNodes.has(institution.id) ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </button>
            ) : (
              <div className="w-6"></div>
            )}
            
            <Building className="h-5 w-5 text-gray-400" />
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{institution.name}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(institution.type)}`}>
                  {getTypeLabel(institution.type)}
                </span>
                {institution.code && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {institution.code}
                  </span>
                )}
              </div>
              {institution.description && (
                <p className="text-sm text-gray-500 mt-1">{institution.description}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEditingInstitution(institution)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {institution.children && expandedNodes.has(institution.id) && (
          <div className="ml-4">
            {renderInstitutionTree(institution.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

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
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Institutions</h1>
        <p className="text-gray-600 mt-2">
          Gérez la hiérarchie des secteurs, ministères et administrations
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
                placeholder="Rechercher une institution..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nouvelle institution</span>
          </button>
        </div>
      </div>

      {/* Institutions Tree */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hiérarchie des Institutions</h2>
        
        <div className="space-y-2">
          {renderInstitutionTree(institutions)}
        </div>
      </div>

      {/* Edit Modal */}
      {editingInstitution && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Modifier l'institution</h3>
              <button
                onClick={() => setEditingInstitution(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  value={editingInstitution.name}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={editingInstitution.type}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="secteur">Secteur</option>
                  <option value="ministere">Ministère</option>
                  <option value="administration">Administration</option>
                  <option value="direction">Direction</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
                <input
                  type="text"
                  value={editingInstitution.code || ''}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingInstitution.description || ''}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingInstitution(null)}
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

export default InstitutionsManagement;