import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Clock, 
  Building, 
  Users, 
  AlertCircle,
  ChevronRight,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle,
  ArrowLeft,
  Plus,
  Tag,
  RefreshCw,
  Hash
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import AddProcedure from './AddProcedure';

const ProceduresList: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedProcedure, setSelectedProcedure] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'Toutes les catégories', count: 156 },
    { id: 'civil', name: 'État Civil', count: 28 },
    { id: 'commercial', name: 'Commercial', count: 34 },
    { id: 'fiscal', name: 'Fiscal', count: 22 },
    { id: 'social', name: 'Social', count: 18 },
    { id: 'urbanisme', name: 'Urbanisme', count: 16 },
    { id: 'transport', name: 'Transport', count: 14 },
    { id: 'education', name: 'Éducation', count: 12 },
    { id: 'sante', name: 'Santé', count: 12 }
  ];

  const domains = [
    { id: 'all', name: 'Tous les domaines' },
    { id: 'particulier', name: 'Particuliers' },
    { id: 'entreprise', name: 'Entreprises' },
    { id: 'association', name: 'Associations' },
    { id: 'professionnel', name: 'Professionnels' }
  ];

  const difficulties = [
    { id: 'all', name: 'Toutes difficultés' },
    { id: 'facile', name: 'Facile', color: 'text-green-600', bg: 'bg-green-100' },
    { id: 'moyen', name: 'Moyen', color: 'text-amber-600', bg: 'bg-amber-100' },
    { id: 'difficile', name: 'Difficile', color: 'text-red-600', bg: 'bg-red-100' }
  ];

  const procedures = [
    {
      id: 1,
      title: 'Création d\'entreprise SARL',
      category: 'commercial',
      categoryName: 'Commercial',
      domain: 'entreprise',
      difficulty: 'moyen',
      duration: '15-30 jours',
      cost: '50,000 - 100,000 DA',
      institution: 'CNRC - Centre National du Registre de Commerce',
      description: 'Procédure complète pour créer une société à responsabilité limitée en Algérie',
      version: '2.1',
      lastUpdate: '2024-12-15',
      steps: [
        'Réservation de la dénomination sociale',
        'Dépôt du capital social',
        'Rédaction des statuts',
        'Enregistrement au registre de commerce',
        'Publication au BOAL',
        'Immatriculation fiscale'
      ],
      documents: [
        'Formulaire de demande d\'immatriculation',
        'Statuts de la société',
        'Attestation de dépôt de capital',
        'Pièce d\'identité des associés',
        'Justificatif de domicile du siège social'
      ],
      forms: [
        { name: 'Formulaire G50 - Demande d\'immatriculation', url: '/forms/g50.pdf' },
        { name: 'Modèle de statuts SARL', url: '/forms/statuts-sarl.pdf' }
      ],
      contact: {
        address: 'Palais du Gouvernement, Alger',
        phone: '+213 21 73 80 00',
        email: 'info@cnrc.dz',
        website: 'www.cnrc.dz'
      },
      rating: 4.2,
      completions: 1247
    },
    {
      id: 2,
      title: 'Demande de passeport biométrique',
      category: 'civil',
      categoryName: 'État Civil',
      domain: 'particulier',
      difficulty: 'facile',
      duration: '7-15 jours',
      cost: '6,000 DA',
      institution: 'Direction Générale de la Sûreté Nationale',
      description: 'Procédure pour obtenir ou renouveler un passeport biométrique algérien',
      version: '3.0',
      lastUpdate: '2024-11-20',
      steps: [
        'Prise de rendez-vous en ligne',
        'Préparation du dossier',
        'Dépôt de la demande',
        'Paiement des frais',
        'Prise d\'empreintes et photo',
        'Retrait du passeport'
      ],
      documents: [
        'Formulaire de demande rempli',
        'Acte de naissance (moins de 3 mois)',
        'Carte d\'identité nationale',
        '2 photos d\'identité récentes',
        'Justificatif de paiement'
      ],
      forms: [
        { name: 'Formulaire de demande de passeport', url: '/forms/passeport.pdf' }
      ],
      contact: {
        address: 'Commissariats de police et daïras',
        phone: '+213 21 73 30 00',
        email: 'contact@dgsn.dz',
        website: 'www.dgsn.dz'
      },
      rating: 4.5,
      completions: 3456
    },
    {
      id: 3,
      title: 'Déclaration fiscale annuelle',
      category: 'fiscal',
      categoryName: 'Fiscal',
      domain: 'entreprise',
      difficulty: 'moyen',
      duration: '1-5 jours',
      cost: 'Gratuit',
      institution: 'Direction Générale des Impôts',
      description: 'Déclaration annuelle des revenus et bénéfices pour les entreprises',
      version: '1.8',
      lastUpdate: '2024-01-10',
      steps: [
        'Préparation des documents comptables',
        'Calcul des impôts dus',
        'Remplissage de la déclaration',
        'Dépôt en ligne ou physique',
        'Paiement des impôts',
        'Obtention du quitus fiscal'
      ],
      documents: [
        'Bilan comptable certifié',
        'Compte de résultat',
        'Tableau des amortissements',
        'État des stocks',
        'Relevé bancaire'
      ],
      forms: [
        { name: 'Formulaire G4 - Déclaration annuelle', url: '/forms/g4.pdf' },
        { name: 'Annexes fiscales', url: '/forms/annexes-fiscales.pdf' }
      ],
      contact: {
        address: 'Centres des impôts de wilaya',
        phone: '+213 21 74 20 00',
        email: 'contact@mfdgi.gov.dz',
        website: 'www.mfdgi.gov.dz'
      },
      rating: 3.8,
      completions: 892
    },
    {
      id: 4,
      title: 'Permis de construire',
      category: 'urbanisme',
      categoryName: 'Urbanisme',
      domain: 'particulier',
      difficulty: 'difficile',
      duration: '30-90 jours',
      cost: '2% de la valeur des travaux',
      institution: 'Direction de l\'Urbanisme et de la Construction',
      description: 'Autorisation administrative pour construire ou modifier un bâtiment',
      version: '4.2',
      lastUpdate: '2024-10-05',
      steps: [
        'Étude de faisabilité',
        'Préparation des plans architecturaux',
        'Constitution du dossier technique',
        'Dépôt de la demande',
        'Instruction du dossier',
        'Délivrance du permis'
      ],
      documents: [
        'Plans architecturaux',
        'Étude géotechnique',
        'Titre de propriété',
        'Certificat d\'urbanisme',
        'Étude d\'impact environnemental'
      ],
      forms: [
        { name: 'Formulaire de demande de permis', url: '/forms/permis-construire.pdf' },
        { name: 'Notice descriptive', url: '/forms/notice-descriptive.pdf' }
      ],
      contact: {
        address: 'Directions de wilaya',
        phone: '+213 21 74 50 00',
        email: 'contact@urbanisme.gov.dz',
        website: 'www.urbanisme.gov.dz'
      },
      rating: 3.5,
      completions: 234
    }
  ];

  const filteredProcedures = procedures.filter(procedure => {
    const matchesSearch = procedure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         procedure.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || procedure.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || procedure.difficulty === selectedDifficulty;
    const matchesDomain = selectedDomain === 'all' || procedure.domain === selectedDomain;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesDomain;
  });

  const getDifficultyStyle = (difficulty: string) => {
    const diff = difficulties.find(d => d.id === difficulty);
    return diff ? { color: diff.color, bg: diff.bg } : { color: 'text-gray-600', bg: 'bg-gray-100' };
  };

  const handleProcedureClick = (procedure: any) => {
    setSelectedProcedure(procedure);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedProcedure(null);
  };

  if (viewMode === 'detail' && selectedProcedure) {
    return (
      <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Header avec retour */}
        <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
          <button
            onClick={handleBackToList}
            className={`flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors ${isRTL ? 'space-x-reverse' : ''}`}
          >
            <ArrowLeft className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
            <span>Retour à la liste</span>
          </button>
        </div>

        {/* Détail de la procédure */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* En-tête */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-white">
            <div className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h1 className="text-3xl font-bold mb-4">{selectedProcedure.title}</h1>
                <p className="text-green-100 text-lg mb-4">{selectedProcedure.description}</p>
                
                <div className={`flex flex-wrap gap-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <Clock className="h-5 w-5" />
                    <span>{selectedProcedure.duration}</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <Building className="h-5 w-5" />
                    <span>{selectedProcedure.cost}</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <Users className="h-5 w-5" />
                    <span>{selectedProcedure.completions} complétées</span>
                  </div>
                </div>
              </div>
              
              <div className={`flex flex-col items-center space-y-2 ${isRTL ? 'ml-8' : 'mr-8'}`}>
                <div className={`px-4 py-2 rounded-full ${getDifficultyStyle(selectedProcedure.difficulty).bg} ${getDifficultyStyle(selectedProcedure.difficulty).color} font-medium`}>
                  {difficulties.find(d => d.id === selectedProcedure.difficulty)?.name}
                </div>
                <div className={`flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{selectedProcedure.rating}/5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contenu principal */}
              <div className="lg:col-span-2 space-y-8">
                {/* Étapes */}
                <div>
                  <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    Étapes de la procédure
                  </h2>
                  <div className="space-y-4">
                    {selectedProcedure.steps.map((step: string, index: number) => (
                      <div key={index} className={`flex items-start space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                          <p className="text-gray-900 font-medium">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents requis */}
                <div>
                  <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    Documents requis
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-3">
                      {selectedProcedure.documents.map((doc: string, index: number) => (
                        <div key={index} className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-900">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Formulaires */}
                <div>
                  <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    Formulaires à télécharger
                  </h2>
                  <div className="space-y-3">
                    {selectedProcedure.forms.map((form: any, index: number) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <FileText className="h-6 w-6 text-red-600" />
                            <span className="font-medium text-gray-900">{form.name}</span>
                          </div>
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                            <Download className="h-4 w-4" />
                            <span>Télécharger</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Institution responsable */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className={`text-lg font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    Institution responsable
                  </h3>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">{selectedProcedure.institution}</h4>
                    
                    <div className={`flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                      <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{selectedProcedure.contact.address}</span>
                    </div>
                    
                    <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                      <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{selectedProcedure.contact.phone}</span>
                    </div>
                    
                    <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                      <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{selectedProcedure.contact.email}</span>
                    </div>
                    
                    <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                      <ExternalLink className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <a href={`https://${selectedProcedure.contact.website}`} className="text-green-600 hover:text-green-700 text-sm">
                        {selectedProcedure.contact.website}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Informations pratiques */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className={`text-lg font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    Informations pratiques
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Catégorie</span>
                      <p className="text-gray-900">{selectedProcedure.categoryName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Durée moyenne</span>
                      <p className="text-gray-900">{selectedProcedure.duration}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Coût</span>
                      <p className="text-gray-900">{selectedProcedure.cost}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Difficulté</span>
                      <p className="text-gray-900">{difficulties.find(d => d.id === selectedProcedure.difficulty)?.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Version</span>
                      <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <Hash className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">{selectedProcedure.version}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Dernière mise à jour</span>
                      <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <RefreshCw className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">{new Date(selectedProcedure.lastUpdate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Procédures complétées</span>
                      <p className="text-gray-900">{selectedProcedure.completions}</p>
                    </div>
                  </div>
                </div>

                {/* Aide */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <div className={`flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-amber-900 mb-2">Besoin d'aide ?</h3>
                      <p className="text-amber-800 text-sm mb-3">
                        Notre équipe d'experts peut vous accompagner dans cette procédure.
                      </p>
                      <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm">
                        Contacter un expert
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-bold text-gray-900">Procédures Administratives</h1>
          <p className="text-gray-600 mt-2">
            Catalogue complet des procédures administratives algériennes avec guides détaillés
          </p>
        </div>
        
        <a
          href="/procedures/ajouter"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Ajouter une procédure</span>
        </a>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Procédures', value: '156', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'Procédures Faciles', value: '89', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { title: 'Formulaires', value: '234', icon: Download, color: 'text-purple-600', bg: 'bg-purple-50' },
          { title: 'Institutions', value: '45', icon: Building, color: 'text-amber-600', bg: 'bg-amber-50' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar avec filtres */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            {/* Recherche */}
            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                Rechercher
              </label>
              <div className="relative">
                <Search className={`absolute top-3 h-5 w-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une procédure..."
                  className={`w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    isRTL ? 'pr-10 text-right' : 'pl-10 text-left'
                  }`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            {/* Catégories */}
            <div>
              <h3 className={`text-sm font-medium text-gray-700 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                Catégories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    } ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                  >
                    <span>{category.name}</span>
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Domaine */}
            <div>
              <h3 className={`text-sm font-medium text-gray-700 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                Domaine
              </h3>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {domains.map((domain) => (
                  <option key={domain.id} value={domain.id}>{domain.name}</option>
                ))}
              </select>
            </div>

            {/* Difficulté */}
            <div>
              <h3 className={`text-sm font-medium text-gray-700 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                Difficulté
              </h3>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty.id} value={difficulty.id}>{difficulty.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Liste des procédures */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h2 className="text-lg font-semibold text-gray-900">
                  Procédures ({filteredProcedures.length})
                </h2>
                <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>Trier par pertinence</option>
                    <option>Trier par popularité</option>
                    <option>Trier par difficulté</option>
                    <option>Trier par durée</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredProcedures.map((procedure) => (
                <div
                  key={procedure.id}
                  onClick={() => handleProcedureClick(procedure)}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <div className={`flex items-center space-x-3 mb-2 ${isRTL ? 'space-x-reverse flex-row-reverse' : ''}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                          {procedure.title}
                        </h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getDifficultyStyle(procedure.difficulty).bg} ${getDifficultyStyle(procedure.difficulty).color}`}>
                          {difficulties.find(d => d.id === procedure.difficulty)?.name}
                        </span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                          {procedure.categoryName}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3 leading-relaxed">
                        {procedure.description}
                      </p>
                      
                      <div className={`flex flex-wrap gap-4 text-sm text-gray-500 mb-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                          <Clock className="h-4 w-4" />
                          <span>{procedure.duration}</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                          <Building className="h-4 w-4" />
                          <span>{procedure.cost}</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                          <Users className="h-4 w-4" />
                          <span>{procedure.completions} complétées</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{procedure.rating}/5</span>
                        </div>
                      </div>

                      <div className={`flex items-center space-x-4 text-xs text-gray-500 ${isRTL ? 'space-x-reverse justify-end' : 'justify-start'}`}>
                        <div className={`flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                          <Hash className="h-3 w-3" />
                          <span>v{procedure.version}</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                          <RefreshCw className="h-3 w-3" />
                          <span>Mis à jour le {new Date(procedure.lastUpdate).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      
                      <div className={`mt-3 text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <span className="font-medium">Institution:</span> {procedure.institution}
                      </div>
                    </div>
                    
                    <ChevronRight className={`h-5 w-5 text-gray-400 flex-shrink-0 ${isRTL ? 'rotate-180 ml-4' : 'mr-4'}`} />
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

const Procedures: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProceduresList />} />
      <Route path="/ajouter" element={<AddProcedure />} />
      <Route path="/*" element={<ProceduresList />} />
    </Routes>
  );
};

export default Procedures;