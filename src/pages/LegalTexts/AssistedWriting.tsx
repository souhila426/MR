import React, { useState } from 'react';
import { 
  FileText, 
  Users, 
  CheckCircle, 
  Edit3, 
  Brain,
  Shield,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const AssistedWriting: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const documentTemplates = [
    {
      id: 'contract',
      title: 'Contrats commerciaux',
      description: 'Modèles pour différents types de contrats commerciaux',
      count: 15,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'legal-opinion',
      title: 'Avis juridiques',
      description: 'Structures pour rédiger des avis juridiques',
      count: 8,
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'procedures',
      title: 'Procédures internes',
      description: 'Modèles de procédures et règlements internes',
      count: 12,
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const features = [
    {
      title: 'Vérification automatique',
      description: 'Vérifiez automatiquement la conformité et la cohérence de vos documents.',
      action: 'Activer la vérification',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Éditeur collaboratif',
      description: 'Rédigez et collaborez en temps réel avec votre équipe sur des documents juridiques.',
      action: 'Ouvrir l\'éditeur',
      icon: Users,
      color: 'text-blue-600'
    }
  ];

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
            <a href="/textes/catalogue" className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors">
              Catalogue
            </a>
            <a href="/textes/recherche-avancee" className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors">
              Recherche avancée
            </a>
            <a href="/textes/extraction" className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors">
              Extraction de données
            </a>
            <button className="py-4 border-b-2 border-green-500 text-green-600 font-medium text-sm transition-colors">
              Rédaction assistée
            </button>
          </nav>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Rédaction assistée</h2>
          <p className="text-gray-600">
            Outils d'aide à la rédaction de documents juridiques avec suggestions automatiques.
          </p>
        </div>

        {/* Modèles de documents */}
        <div className="mb-8">
          <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            Modèles de documents
          </h3>
          <p className={`text-gray-600 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            Accédez à une bibliothèque de modèles pour différents types de documents juridiques.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {documentTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-3 rounded-xl ${template.bgColor}`}>
                    <template.icon className={`h-6 w-6 ${template.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-500">{template.count} modèles</span>
                </div>

                <h4 className={`font-semibold text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {template.title}
                </h4>
                <p className={`text-sm text-gray-600 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {template.description}
                </p>

                <button className={`text-sm font-medium flex items-center space-x-2 ${template.color} hover:opacity-80 transition-opacity group-hover:translate-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <span>Parcourir les modèles</span>
                  <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6">
              <div className={`flex items-center space-x-3 mb-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
                <h4 className="font-semibold text-gray-900">{feature.title}</h4>
              </div>
              
              <p className={`text-gray-600 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {feature.description}
              </p>

              <button className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium ${isRTL ? 'w-full text-right' : ''}`}>
                {feature.action}
              </button>
            </div>
          ))}
        </div>

        {/* Éditeur collaboratif highlight */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="bg-green-100 p-3 rounded-xl">
                <Edit3 className="h-6 w-6 text-green-600" />
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h4 className="font-semibold text-green-900 mb-1">Éditeur collaboratif</h4>
                <p className="text-green-700 text-sm">
                  Rédigez et collaborez en temps réel avec votre équipe sur des documents juridiques.
                </p>
              </div>
            </div>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
              Ouvrir l'éditeur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistedWriting;