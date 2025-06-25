import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  MessageSquare, 
  Mail, 
  Phone, 
  Book, 
  Users, 
  ArrowRight,
  Search,
  FileText,
  Settings,
  AlertCircle
} from 'lucide-react';

const HelpDashboard: React.FC = () => {
  const helpSections = [
    {
      id: 'about',
      title: 'À propos',
      description: 'Découvrez notre mission et l\'équipe derrière la plateforme',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      href: '/aide/a-propos'
    },
    {
      id: 'contact',
      title: 'Contactez-nous',
      description: 'Formulaire de contact pour vos questions et signalements',
      icon: Mail,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      href: '/aide/contact'
    },
    {
      id: 'faq',
      title: 'FAQ',
      description: 'Questions fréquemment posées sur l\'utilisation de la plateforme',
      icon: HelpCircle,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      href: '/aide/faq'
    },
    {
      id: 'chat',
      title: 'Assistance interactive',
      description: 'Chat d\'assistance en ligne pour un support immédiat',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      href: '/aide/chat'
    },
    {
      id: 'support',
      title: 'Support technique',
      description: 'Signaler un dysfonctionnement ou demander une amélioration',
      icon: Settings,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      href: '/aide/support-technique'
    }
  ];

  const quickHelp = [
    {
      question: 'Comment rechercher un texte juridique ?',
      answer: 'Utilisez la barre de recherche en haut de la page ou accédez à la section "Textes Juridiques".',
      category: 'Recherche'
    },
    {
      question: 'Comment configurer des alertes ?',
      answer: 'Rendez-vous dans la section "Alertes & Notifications" pour paramétrer vos alertes personnalisées.',
      category: 'Alertes'
    },
    {
      question: 'Comment utiliser l\'assistant IA ?',
      answer: 'Cliquez sur "Assistant IA" dans le menu principal et posez votre question juridique.',
      category: 'IA'
    },
    {
      question: 'Comment télécharger un document ?',
      answer: 'Cliquez sur l\'icône de téléchargement à côté du document souhaité.',
      category: 'Documents'
    }
  ];

  const contactInfo = {
    email: 'support@dalil.dz',
    phone: '+213 21 XX XX XX',
    address: 'Alger, Algérie',
    hours: 'Lun-Ven: 8h00-17h00'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Centre d'Aide et Support</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Trouvez rapidement les réponses à vos questions ou contactez notre équipe de support
        </p>
      </div>

      {/* Search Help */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher dans l'aide..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Help Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {helpSections.map((section) => (
          <Link
            key={section.id}
            to={section.href}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${section.bgColor}`}>
                <section.icon className={`h-6 w-6 ${section.textColor}`} />
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {section.title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed">
              {section.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Help */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Aide Rapide</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickHelp.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <HelpCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.answer}</p>
                  <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Besoin d'aide supplémentaire ?</h2>
            <p className="text-green-100 mb-4">
              Notre équipe de support est là pour vous aider. N'hésitez pas à nous contacter.
            </p>
            <Link
              to="/aide/contact"
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-2"
            >
              <Mail className="h-4 w-4" />
              <span>Nous contacter</span>
            </Link>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-green-200" />
              <span className="text-green-100">{contactInfo.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-green-200" />
              <span className="text-green-100">{contactInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-green-200" />
              <span className="text-green-100">{contactInfo.hours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Ressources Utiles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/textes"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="font-medium text-gray-900">Guide d'utilisation</h3>
              <p className="text-sm text-gray-600">Documentation complète</p>
            </div>
          </Link>
          
          <Link
            to="/procedures"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Book className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-medium text-gray-900">Tutoriels</h3>
              <p className="text-sm text-gray-600">Guides pas à pas</p>
            </div>
          </Link>
          
          <Link
            to="/assistant"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageSquare className="h-6 w-6 text-purple-600" />
            <div>
              <h3 className="font-medium text-gray-900">Assistant IA</h3>
              <p className="text-sm text-gray-600">Aide intelligente</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpDashboard;