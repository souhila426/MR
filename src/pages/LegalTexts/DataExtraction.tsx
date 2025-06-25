import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Download, 
  Settings, 
  Brain, 
  Database,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const DataExtraction: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [activeService, setActiveService] = useState<string | null>(null);

  const extractionServices = [
    {
      id: 'metadata',
      title: 'Extraction de métadonnées',
      description: 'Extrayez automatiquement les dates, numéros, ministères et autres métadonnées.',
      icon: Database,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      features: [
        'Extraction automatique des dates',
        'Identification des numéros de référence',
        'Reconnaissance des ministères',
        'Classification par type de document'
      ]
    },
    {
      id: 'content',
      title: 'Analyse de contenu',
      description: 'Identifiez les concepts clés, entités nommées et relations dans les textes.',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      features: [
        'Extraction d\'entités nommées',
        'Identification des concepts juridiques',
        'Analyse des relations sémantiques',
        'Détection des références croisées'
      ]
    },
    {
      id: 'export',
      title: 'Export de données',
      description: 'Exportez les données extraites dans différents formats (CSV, JSON, XML).',
      icon: Download,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      features: [
        'Export en format CSV',
        'Export en format JSON',
        'Export en format XML',
        'Intégration API disponible'
      ]
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
            <button className="py-4 border-b-2 border-green-500 text-green-600 font-medium text-sm transition-colors">
              Extraction de données
            </button>
            <a href="/textes/redaction" className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors">
              Rédaction assistée
            </a>
          </nav>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Extraction automatique des données</h2>
          <p className="text-gray-600">
            Extrayez automatiquement des données structurées à partir des textes juridiques pour vos analyses.
          </p>
        </div>

        {/* Services d'extraction */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {extractionServices.map((service) => (
            <div
              key={service.id}
              className={`border border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                activeService === service.id ? 'ring-2 ring-green-500 border-green-500' : ''
              }`}
              onClick={() => setActiveService(activeService === service.id ? null : service.id)}
            >
              <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`p-3 rounded-xl ${service.bgColor}`}>
                  <service.icon className={`h-6 w-6 ${service.textColor}`} />
                </div>
                {activeService === service.id && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </div>

              <h3 className={`font-semibold text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                {service.title}
              </h3>
              <p className={`text-sm text-gray-600 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {service.description}
              </p>

              <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                <button className={`text-sm font-medium flex items-center space-x-2 ${service.textColor} hover:opacity-80 transition-opacity ${isRTL ? 'space-x-reverse' : ''}`}>
                  <span>Configurer</span>
                  <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Détails du service */}
              {activeService === service.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className={`font-medium text-gray-900 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    Fonctionnalités incluses :
                  </h4>
                  <ul className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {service.features.map((feature, index) => (
                      <li key={index} className={`flex items-center space-x-2 text-sm text-gray-600 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Zone d'upload */}
        {activeService && (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-gray-100 p-4 rounded-full">
                <Upload className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Téléchargez vos documents
                </h3>
                <p className="text-gray-600 mb-4">
                  Glissez-déposez vos fichiers PDF ou utilisez le bouton ci-dessous
                </p>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                  Sélectionner des fichiers
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Formats supportés: PDF, DOC, DOCX (max. 10MB par fichier)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataExtraction;