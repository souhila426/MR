import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'Comment rechercher un texte juridique spécifique ?',
      answer: 'Vous pouvez utiliser la barre de recherche principale en saisissant des mots-clés, le numéro du texte, ou naviguer par catégories dans la section "Textes Juridiques". La recherche avancée permet d\'affiner vos critères par date, type de texte, et ministère.',
      category: 'Recherche',
      tags: ['recherche', 'textes', 'navigation']
    },
    {
      id: '2',
      question: 'Comment configurer des alertes personnalisées ?',
      answer: 'Rendez-vous dans la section "Alertes & Notifications", cliquez sur "Nouvelle alerte", définissez vos mots-clés et critères, puis choisissez la fréquence de notification (immédiate, quotidienne, hebdomadaire).',
      category: 'Alertes',
      tags: ['alertes', 'notifications', 'personnalisation']
    },
    {
      id: '3',
      question: 'L\'assistant IA peut-il répondre à toutes les questions juridiques ?',
      answer: 'L\'assistant IA est spécialisé dans le droit algérien et peut répondre à la plupart des questions. Cependant, pour des conseils juridiques personnalisés ou des cas complexes, nous recommandons de consulter un professionnel du droit.',
      category: 'Assistant IA',
      tags: ['ia', 'assistant', 'limitations']
    },
    {
      id: '4',
      question: 'Comment télécharger des documents ?',
      answer: 'Cliquez sur l\'icône de téléchargement à côté du document souhaité. Les documents sont disponibles en format PDF. Certains documents peuvent nécessiter une connexion ou des permissions spéciales.',
      category: 'Documents',
      tags: ['téléchargement', 'pdf', 'documents']
    },
    {
      id: '5',
      question: 'Puis-je utiliser la plateforme sans créer de compte ?',
      answer: 'Vous pouvez consulter les textes publics sans compte, mais la création d\'un compte gratuit vous donne accès aux alertes, favoris, historique de recherche, et assistant IA.',
      category: 'Compte',
      tags: ['compte', 'inscription', 'accès']
    },
    {
      id: '6',
      question: 'Comment signaler une erreur dans un texte ?',
      answer: 'Utilisez le bouton "Signaler une erreur" sur la page du document, ou contactez-nous via le formulaire de contact en précisant la référence du texte et la nature de l\'erreur.',
      category: 'Signalement',
      tags: ['erreur', 'signalement', 'correction']
    },
    {
      id: '7',
      question: 'La plateforme est-elle accessible sur mobile ?',
      answer: 'Oui, la plateforme est entièrement responsive et optimisée pour tous les appareils (smartphones, tablettes, ordinateurs). Vous pouvez également installer l\'application web progressive (PWA).',
      category: 'Technique',
      tags: ['mobile', 'responsive', 'pwa']
    },
    {
      id: '8',
      question: 'Comment collaborer avec d\'autres utilisateurs ?',
      answer: 'Créez un espace de travail dans la section "Collaboration", invitez des membres, et partagez des documents. Vous pouvez annoter, commenter et éditer collaborativement en temps réel.',
      category: 'Collaboration',
      tags: ['collaboration', 'partage', 'équipe']
    }
  ];

  const categories = [
    'all',
    ...Array.from(new Set(faqItems.map(item => item.category)))
  ];

  const filteredItems = faqItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/aide"
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour à l'aide</span>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Questions Fréquemment Posées</h1>
        <p className="text-gray-600 mt-2">
          Trouvez rapidement des réponses aux questions les plus courantes sur l'utilisation de la plateforme.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 lg:mr-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher dans les questions..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Toutes les catégories</option>
              {categories.filter(cat => cat !== 'all').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune question trouvée</h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche ou contactez-nous directement.
            </p>
            <Link
              to="/aide/contact"
              className="mt-4 inline-flex items-center space-x-2 text-green-600 hover:text-green-700"
            >
              <span>Nous contacter</span>
            </Link>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleExpanded(item.id)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4">
                    {expandedItems.has(item.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
              </button>
              
              {expandedItems.has(item.id) && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <div className="pt-4">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 text-white text-center">
        <h2 className="text-xl font-bold mb-2">Vous ne trouvez pas votre réponse ?</h2>
        <p className="text-green-100 mb-4">
          Notre équipe de support est là pour vous aider avec toutes vos questions.
        </p>
        <Link
          to="/aide/contact"
          className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors inline-flex items-center space-x-2"
        >
          <HelpCircle className="h-5 w-5" />
          <span>Contactez le support</span>
        </Link>
      </div>
    </div>
  );
};

export default FAQPage;