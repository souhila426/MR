import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Search, 
  Users, 
  BookOpen,
  Shield,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Youtube
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const quickAccessLinks = [
    { label: 'Textes récents', href: '/textes/recents', icon: FileText },
    { label: 'Jurisprudence', href: '/textes/jurisprudence', icon: Scale },
    { label: 'Analyses', href: '/textes/analyses', icon: BookOpen },
    { label: 'Documentation', href: '/textes/documentation', icon: Search }
  ];

  const servicesLinks = [
    { label: 'Alertes personnalisées', href: '/services/alertes' },
    { label: 'Rapports sur mesure', href: '/services/rapports' },
    { label: 'Formation', href: '/services/formation' },
    { label: 'Support technique', href: '/services/support' }
  ];

  const legalLinks = [
    { label: 'Mentions légales', href: '/legal/mentions' },
    { label: 'Politique de confidentialité', href: '/legal/privacy' },
    { label: 'Conditions d\'utilisation', href: '/legal/terms' },
    { label: 'Cookies', href: '/legal/cookies' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gradient-to-r from-teal-700 to-emerald-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className={`flex items-center space-x-3 mb-4 ${isRTL ? 'space-x-reverse flex-row-reverse' : ''}`}>
              <div className="bg-white/20 p-2 rounded-lg">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('appName')}</h3>
                <p className="text-teal-100 text-sm">Veille Juridique</p>
              </div>
            </div>
            <p className="text-teal-100 text-sm leading-relaxed mb-6">
              Plateforme professionnelle de veille juridique et réglementaire pour les professionnels du droit.
            </p>
            
            {/* Réseaux sociaux */}
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Accès rapide */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Accès rapide</span>
            </h4>
            <ul className="space-y-3">
              {quickAccessLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className={`flex items-center space-x-2 text-teal-100 hover:text-white transition-colors ${isRTL ? 'space-x-reverse' : ''}`}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Services</span>
            </h4>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-teal-100 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Contact</span>
            </h4>
            <div className="space-y-3">
              <div className={`flex items-center space-x-3 text-teal-100 ${isRTL ? 'space-x-reverse' : ''}`}>
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">contact@dalil.dz</span>
              </div>
              <div className={`flex items-center space-x-3 text-teal-100 ${isRTL ? 'space-x-reverse' : ''}`}>
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">+213 21 XX XX XX</span>
              </div>
              <div className={`flex items-start space-x-3 text-teal-100 ${isRTL ? 'space-x-reverse' : ''}`}>
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Alger, Algérie</span>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-teal-600 my-8"></div>

        {/* Bas du footer */}
        <div className={`flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className="text-teal-100 text-sm">
            © 2024 {t('appName')}. {t('allRightsReserved')}
          </div>
          
          <div className={`flex items-center space-x-6 ${isRTL ? 'space-x-reverse' : ''}`}>
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-teal-100 hover:text-white transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;