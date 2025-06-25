import React, { useState } from 'react';
import { Search, Calendar, Building, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const AdvancedSearch: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [searchForm, setSearchForm] = useState({
    keywords: '',
    textNumber: '',
    startDate: '',
    endDate: '',
    ministry: 'tous'
  });

  const ministries = [
    { value: 'tous', label: 'Tous les ministères' },
    { value: 'justice', label: 'Ministère de la Justice' },
    { value: 'interieur', label: 'Ministère de l\'Intérieur' },
    { value: 'finances', label: 'Ministère des Finances' },
    { value: 'education', label: 'Ministère de l\'Éducation' },
    { value: 'sante', label: 'Ministère de la Santé' },
    { value: 'travail', label: 'Ministère du Travail' },
    { value: 'commerce', label: 'Ministère du Commerce' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    console.log('Recherche avancée:', searchForm);
    // Ici, vous ajouteriez la logique de recherche
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
            <a href="/textes/catalogue" className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors">
              Catalogue
            </a>
            <button className="py-4 border-b-2 border-green-500 text-green-600 font-medium text-sm transition-colors">
              Recherche avancée
            </button>
            <a href="/textes/extraction" className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors">
              Extraction de données
            </a>
            <a href="/textes/redaction" className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors">
              Rédaction assistée
            </a>
          </nav>
        </div>
      </div>

      {/* Formulaire de recherche avancée */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          Recherche avancée
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mots-clés */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              Mots-clés
            </label>
            <div className="relative">
              <Search className={`absolute top-3 h-5 w-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={searchForm.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                placeholder="Rechercher dans le contenu..."
                className={`w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  isRTL ? 'pr-10 text-right' : 'pl-10 text-left'
                }`}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
          </div>

          {/* Numéro de texte */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              Numéro de texte
            </label>
            <input
              type="text"
              value={searchForm.textNumber}
              onChange={(e) => handleInputChange('textNumber', e.target.value)}
              placeholder="Ex: 2025-123"
              className={`w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                isRTL ? 'text-right' : 'text-left'
              }`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Date de début */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              Date de début
            </label>
            <div className="relative">
              <Calendar className={`absolute top-3 h-5 w-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="date"
                value={searchForm.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className={`w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  isRTL ? 'pr-10 text-right' : 'pl-10 text-left'
                }`}
              />
            </div>
          </div>

          {/* Date de fin */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              Date de fin
            </label>
            <div className="relative">
              <Calendar className={`absolute top-3 h-5 w-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="date"
                value={searchForm.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className={`w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  isRTL ? 'pr-10 text-right' : 'pl-10 text-left'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Ministère/Institution */}
        <div className="mt-6">
          <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            Ministère/Institution
          </label>
          <div className="relative">
            <Building className={`absolute top-3 h-5 w-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
            <select
              value={searchForm.ministry}
              onChange={(e) => handleInputChange('ministry', e.target.value)}
              className={`w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                isRTL ? 'pr-10 text-right' : 'pl-10 text-left'
              }`}
            >
              {ministries.map((ministry) => (
                <option key={ministry.value} value={ministry.value}>
                  {ministry.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bouton de recherche */}
        <div className={`mt-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>Lancer la recherche</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;