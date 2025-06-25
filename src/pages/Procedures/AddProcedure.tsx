import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Upload, 
  FileText, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  DollarSign,
  Clock,
  Users,
  Building,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Step {
  id: string;
  title: string;
  description: string;
  demonstration?: string;
}

interface Document {
  id: string;
  name: string;
  required: boolean;
  type: 'existing' | 'new';
}

interface Contact {
  address: string;
  phone: string;
  greenNumber: string;
  email: string;
}

const AddProcedure: React.FC = () => {
  const { t, isRTL } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    sector: '',
    steps: [] as Step[],
    conditions: '',
    requiredDocuments: [] as Document[],
    complementaryDocuments: [] as Document[],
    targetCategory: [] as string[],
    submissionLocation: '',
    concernedAdministration: '',
    validityStart: '',
    validityEnd: '',
    isPeriodic: false,
    isOpen: true,
    processingDuration: '',
    fees: '',
    isFree: true,
    isDigitized: false,
    digitizationDate: '',
    electronicPortalLink: '',
    mobileAppLink: '',
    thirdPartySubmission: false,
    withdrawalWhen: '',
    withdrawalHow: '',
    documentValidity: '',
    hasAppeal: false,
    appealLocation: '',
    appealDeadlines: '',
    appealFees: '',
    legalBasis: '',
    userGuideFile: null as File | null,
    formFile: null as File | null,
    faq: '',
    contact: {
      address: '',
      phone: '',
      greenNumber: '',
      email: ''
    } as Contact
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const targetCategories = [
    'Citoyen',
    'Administration',
    'Entreprises',
    'Investisseur',
    'Associations',
    'Professionnels libéraux',
    'Étudiants',
    'Étrangers'
  ];

  const procedureTypes = [
    'Autorisation',
    'Déclaration',
    'Enregistrement',
    'Certification',
    'Licence',
    'Permis',
    'Agrément',
    'Habilitation',
    'Autre'
  ];

  const addStep = () => {
    const newStep: Step = {
      id: Date.now().toString(),
      title: '',
      description: '',
      demonstration: ''
    };
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const updateStep = (stepId: string, field: keyof Step, value: string) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId ? { ...step, [field]: value } : step
      )
    }));
  };

  const removeStep = (stepId: string) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId)
    }));
  };

  const addDocument = (type: 'requiredDocuments' | 'complementaryDocuments') => {
    const newDoc: Document = {
      id: Date.now().toString(),
      name: '',
      required: type === 'requiredDocuments',
      type: 'new'
    };
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], newDoc]
    }));
  };

  const updateDocument = (
    type: 'requiredDocuments' | 'complementaryDocuments',
    docId: string,
    field: keyof Document,
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map(doc => 
        doc.id === docId ? { ...doc, [field]: value } : doc
      )
    }));
  };

  const removeDocument = (type: 'requiredDocuments' | 'complementaryDocuments', docId: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter(doc => doc.id !== docId)
    }));
  };

  const handleTargetCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      targetCategory: prev.targetCategory.includes(category)
        ? prev.targetCategory.filter(c => c !== category)
        : [...prev.targetCategory, category]
    }));
  };

  const handleFileUpload = (field: 'userGuideFile' | 'formFile', file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Données de la procédure:', formData);
    // Ici, vous ajouteriez la logique pour sauvegarder la procédure
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
              step <= currentStep 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
            </div>
            {step < totalSteps && (
              <div className={`w-16 h-1 mx-2 ${
                step < currentStep ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">
          Étape {currentStep} sur {totalSteps}
        </span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations générales</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom de la procédure *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Ex: Demande de passeport biométrique"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de procédure *
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="">Sélectionner un type</option>
            {procedureTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Description détaillée de la procédure..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Secteur et/ou administration *
        </label>
        <input
          type="text"
          value={formData.sector}
          onChange={(e) => setFormData(prev => ({ ...prev, sector: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Ex: Ministère de l'Intérieur, Direction de l'État Civil"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Catégorie ciblée *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {targetCategories.map(category => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.targetCategory.includes(category)}
                onChange={() => handleTargetCategoryChange(category)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Étapes et conditions</h2>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Étapes de la procédure
          </label>
          <button
            type="button"
            onClick={addStep}
            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Ajouter une étape</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {formData.steps.map((step, index) => (
            <div key={step.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Étape {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeStep(step.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre de l'étape
                  </label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ex: Dépôt du dossier"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Démonstration (optionnel)
                  </label>
                  <input
                    type="text"
                    value={step.demonstration || ''}
                    onChange={(e) => updateStep(step.id, 'demonstration', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Lien vers une démonstration"
                  />
                </div>
              </div>
              
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={step.description}
                  onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Description détaillée de l'étape..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Conditions d'utilisation du service
        </label>
        <textarea
          value={formData.conditions}
          onChange={(e) => setFormData(prev => ({ ...prev, conditions: e.target.value }))}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Conditions et prérequis pour utiliser ce service..."
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents requis</h2>
      
      {/* Documents requis */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Documents demandés
          </label>
          <button
            type="button"
            onClick={() => addDocument('requiredDocuments')}
            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Ajouter un document</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.requiredDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <FileText className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={doc.name}
                onChange={(e) => updateDocument('requiredDocuments', doc.id, 'name', e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Nom du document"
              />
              <select
                value={doc.type}
                onChange={(e) => updateDocument('requiredDocuments', doc.id, 'type', e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="new">Nouveau</option>
                <option value="existing">Existant</option>
              </select>
              <button
                type="button"
                onClick={() => removeDocument('requiredDocuments', doc.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Documents complémentaires */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Documents complémentaires (si nécessaire après validation)
          </label>
          <button
            type="button"
            onClick={() => addDocument('complementaryDocuments')}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Ajouter un document</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.complementaryDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center space-x-3 p-3 border border-blue-200 rounded-lg bg-blue-50">
              <FileText className="h-5 w-5 text-blue-400" />
              <input
                type="text"
                value={doc.name}
                onChange={(e) => updateDocument('complementaryDocuments', doc.id, 'name', e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nom du document complémentaire"
              />
              <select
                value={doc.type}
                onChange={(e) => updateDocument('complementaryDocuments', doc.id, 'type', e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="new">Nouveau</option>
                <option value="existing">Existant</option>
              </select>
              <button
                type="button"
                onClick={() => removeDocument('complementaryDocuments', doc.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Modalités et délais</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Où déposer le dossier
          </label>
          <textarea
            value={formData.submissionLocation}
            onChange={(e) => setFormData(prev => ({ ...prev, submissionLocation: e.target.value }))}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Adresse et lieu de dépôt du dossier..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Administration concernée
          </label>
          <input
            type="text"
            value={formData.concernedAdministration}
            onChange={(e) => setFormData(prev => ({ ...prev, concernedAdministration: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Administration responsable"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Validité de la procédure - Du
          </label>
          <input
            type="date"
            value={formData.validityStart}
            onChange={(e) => setFormData(prev => ({ ...prev, validityStart: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Au
          </label>
          <input
            type="date"
            value={formData.validityEnd}
            onChange={(e) => setFormData(prev => ({ ...prev, validityEnd: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isPeriodic"
              checked={formData.isPeriodic}
              onChange={(e) => setFormData(prev => ({ ...prev, isPeriodic: e.target.checked }))}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="isPeriodic" className="text-sm font-medium text-gray-700">
              Procédure périodique
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isOpen"
              checked={formData.isOpen}
              onChange={(e) => setFormData(prev => ({ ...prev, isOpen: e.target.checked }))}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="isOpen" className="text-sm font-medium text-gray-700">
              Procédure ouverte
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Durée du traitement (en jours)
          </label>
          <input
            type="number"
            value={formData.processingDuration}
            onChange={(e) => setFormData(prev => ({ ...prev, processingDuration: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Ex: 15"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Frais
        </label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="freeService"
              name="fees"
              checked={formData.isFree}
              onChange={() => setFormData(prev => ({ ...prev, isFree: true, fees: '' }))}
              className="text-green-600 focus:ring-green-500"
            />
            <label htmlFor="freeService" className="text-sm font-medium text-gray-700">
              Gratuit
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="paidService"
              name="fees"
              checked={!formData.isFree}
              onChange={() => setFormData(prev => ({ ...prev, isFree: false }))}
              className="text-green-600 focus:ring-green-500"
            />
            <label htmlFor="paidService" className="text-sm font-medium text-gray-700">
              Payant
            </label>
          </div>
          
          {!formData.isFree && (
            <input
              type="text"
              value={formData.fees}
              onChange={(e) => setFormData(prev => ({ ...prev, fees: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Montant en DA"
            />
          )}
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Numérisation et modalités</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isDigitized"
              checked={formData.isDigitized}
              onChange={(e) => setFormData(prev => ({ ...prev, isDigitized: e.target.checked }))}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="isDigitized" className="text-sm font-medium text-gray-700">
              Numérisation de la procédure
            </label>
          </div>

          {formData.isDigitized && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de la numérisation
              </label>
              <input
                type="date"
                value={formData.digitizationDate}
                onChange={(e) => setFormData(prev => ({ ...prev, digitizationDate: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="thirdPartySubmission"
              checked={formData.thirdPartySubmission}
              onChange={(e) => setFormData(prev => ({ ...prev, thirdPartySubmission: e.target.checked }))}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="thirdPartySubmission" className="text-sm font-medium text-gray-700">
              Dépôt par une tierce personne
            </label>
          </div>
        </div>
      </div>

      {formData.isDigitized && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lien du portail électronique
            </label>
            <input
              type="url"
              value={formData.electronicPortalLink}
              onChange={(e) => setFormData(prev => ({ ...prev, electronicPortalLink: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lien de l'application mobile (si elle existe)
            </label>
            <input
              type="url"
              value={formData.mobileAppLink}
              onChange={(e) => setFormData(prev => ({ ...prev, mobileAppLink: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quand retirer l'acte ou le service administratif demandé
          </label>
          <textarea
            value={formData.withdrawalWhen}
            onChange={(e) => setFormData(prev => ({ ...prev, withdrawalWhen: e.target.value }))}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Délais et conditions de retrait..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comment retirer l'acte ou le service administratif demandé
          </label>
          <textarea
            value={formData.withdrawalHow}
            onChange={(e) => setFormData(prev => ({ ...prev, withdrawalHow: e.target.value }))}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Modalités de retrait..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Validité de l'acte ou du service administratif demandé
        </label>
        <input
          type="text"
          value={formData.documentValidity}
          onChange={(e) => setFormData(prev => ({ ...prev, documentValidity: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Ex: 10 ans, permanent, etc."
        />
      </div>

      {/* Section Recours */}
      <div className="border-t pt-6">
        <div className="flex items-center space-x-3 mb-4">
          <input
            type="checkbox"
            id="hasAppeal"
            checked={formData.hasAppeal}
            onChange={(e) => setFormData(prev => ({ ...prev, hasAppeal: e.target.checked }))}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label htmlFor="hasAppeal" className="text-sm font-medium text-gray-700">
            Possibilité de recours
          </label>
        </div>

        {formData.hasAppeal && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Où déposer le recours
              </label>
              <textarea
                value={formData.appealLocation}
                onChange={(e) => setFormData(prev => ({ ...prev, appealLocation: e.target.value }))}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Lieu de dépôt du recours..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Les délais
              </label>
              <input
                type="text"
                value={formData.appealDeadlines}
                onChange={(e) => setFormData(prev => ({ ...prev, appealDeadlines: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex: 30 jours"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Les frais
              </label>
              <input
                type="text"
                value={formData.appealFees}
                onChange={(e) => setFormData(prev => ({ ...prev, appealFees: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Montant ou gratuit"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations complémentaires</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ancrage juridique
        </label>
        <textarea
          value={formData.legalBasis}
          onChange={(e) => setFormData(prev => ({ ...prev, legalBasis: e.target.value }))}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Références juridiques (lois, décrets, arrêtés...)..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guide d'utilisation à télécharger
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              onChange={(e) => handleFileUpload('userGuideFile', e.target.files?.[0] || null)}
              className="hidden"
              id="userGuideFile"
              accept=".pdf,.doc,.docx"
            />
            <label htmlFor="userGuideFile" className="cursor-pointer flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                {formData.userGuideFile ? formData.userGuideFile.name : 'Cliquer pour télécharger'}
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Formulaire à télécharger
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              onChange={(e) => handleFileUpload('formFile', e.target.files?.[0] || null)}
              className="hidden"
              id="formFile"
              accept=".pdf,.doc,.docx"
            />
            <label htmlFor="formFile" className="cursor-pointer flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                {formData.formFile ? formData.formFile.name : 'Cliquer pour télécharger'}
              </span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Questions fréquemment posées
        </label>
        <textarea
          value={formData.faq}
          onChange={(e) => setFormData(prev => ({ ...prev, faq: e.target.value }))}
          rows={6}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Questions et réponses fréquentes..."
        />
      </div>

      {/* Section Contact */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Adresse
            </label>
            <textarea
              value={formData.contact.address}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                contact: { ...prev.contact, address: e.target.value }
              }))}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Adresse complète..."
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline h-4 w-4 mr-1" />
                N° Téléphone
              </label>
              <input
                type="tel"
                value={formData.contact.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  contact: { ...prev.contact, phone: e.target.value }
                }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="+213 XX XX XX XX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline h-4 w-4 mr-1 text-green-600" />
                N° Vert
              </label>
              <input
                type="tel"
                value={formData.contact.greenNumber}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  contact: { ...prev.contact, greenNumber: e.target.value }
                }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="3030"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                E-mail
              </label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  contact: { ...prev.contact, email: e.target.value }
                }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="contact@administration.dz"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className={`flex items-center justify-between mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <button
              onClick={() => window.history.back()}
              className={`flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors ${isRTL ? 'space-x-reverse' : ''}`}
            >
              <ArrowLeft className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              <span>Retour</span>
            </button>
          </div>
          
          <h1 className={`text-3xl font-bold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
            Ajouter une nouvelle procédure
          </h1>
          
          <div></div>
        </div>

        {/* Progress Indicator */}
        {renderStepIndicator()}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}

          {/* Navigation Buttons */}
          <div className={`flex items-center justify-between mt-8 pt-6 border-t border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${isRTL ? 'ml-4' : 'mr-4'}`}
            >
              Précédent
            </button>

            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <span>Suivant</span>
                  <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : 'rotate-180'}`} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Enregistrer la procédure</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProcedure;