import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Building, 
  FileText, 
  ClipboardList, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import InstitutionsManagement from './InstitutionsManagement';
import LegalTextsTypes from './LegalTextsTypes';
import ProcedureTypes from './ProcedureTypes';

const NomenclatureManagement: React.FC = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/config/nomenclature' || location.pathname === '/config/nomenclature/';

  const nomenclatureTypes = [
    {
      id: 'institutions',
      title: 'Institutions',
      description: 'Gestion des secteurs, ministères et administrations',
      icon: Building,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      count: 45,
      href: '/config/nomenclature/institutions'
    },
    {
      id: 'textes',
      title: 'Textes Juridiques',
      description: 'Types et catégories de textes réglementaires',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      count: 12,
      href: '/config/nomenclature/textes'
    },
    {
      id: 'procedures',
      title: 'Procédures Administratives',
      description: 'Classification des types de procédures',
      icon: ClipboardList,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      count: 28,
      href: '/config/nomenclature/procedures'
    }
  ];

  if (!isMainPage) {
    return (
      <Routes>
        <Route path="/institutions/*" element={<InstitutionsManagement />} />
        <Route path="/textes/*" element={<LegalTextsTypes />} />
        <Route path="/procedures/*" element={<ProcedureTypes />} />
      </Routes>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/config"
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour à la configuration</span>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Nomenclatures</h1>
        <p className="text-gray-600 mt-2">
          Configurez les nomenclatures et classifications utilisées dans la plateforme
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
                placeholder="Rechercher dans les nomenclatures..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filtres</span>
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nouvelle nomenclature</span>
            </button>
          </div>
        </div>
      </div>

      {/* Nomenclature Types Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {nomenclatureTypes.map((type) => (
          <Link
            key={type.id}
            to={type.href}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${type.bgColor}`}>
                <type.icon className={`h-6 w-6 ${type.color}`} />
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                  {type.count}
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {type.title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed">
              {type.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Changes */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Modifications Récentes</h2>
        
        <div className="space-y-4">
          {[
            {
              type: 'Institution',
              name: 'Ministère de la Transformation Numérique',
              action: 'Ajouté',
              date: '2024-01-15',
              user: 'Admin Système'
            },
            {
              type: 'Texte Juridique',
              name: 'Type "Instruction"',
              action: 'Modifié',
              date: '2024-01-14',
              user: 'Marie Dubois'
            },
            {
              type: 'Procédure',
              name: 'Catégorie "Digitalisation"',
              action: 'Ajouté',
              date: '2024-01-12',
              user: 'Jean Martin'
            }
          ].map((change, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">
                    {change.type}: {change.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {change.action} par {change.user}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{change.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NomenclatureManagement;