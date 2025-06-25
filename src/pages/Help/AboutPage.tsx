import React from 'react';
import { ArrowLeft, Users, Target, Award, Globe, Heart, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Dr. Ahmed BENALI',
      role: 'Directeur Général',
      expertise: 'Droit constitutionnel et administratif',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Me. Fatima KHELIFI',
      role: 'Directrice Juridique',
      expertise: 'Droit des affaires et commercial',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Youcef LAHOUAZI',
      role: 'Directeur Technique',
      expertise: 'Technologies juridiques et IA',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Dr. Amina BOUDJEMAA',
      role: 'Responsable Recherche',
      expertise: 'Droit comparé et international',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous nous engageons à fournir des informations juridiques de la plus haute qualité.'
    },
    {
      icon: Heart,
      title: 'Accessibilité',
      description: 'Rendre le droit accessible à tous, professionnels et citoyens.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Utiliser les dernières technologies pour améliorer l\'accès au droit.'
    },
    {
      icon: Globe,
      title: 'Transparence',
      description: 'Promouvoir la transparence et l\'état de droit en Algérie.'
    }
  ];

  const achievements = [
    { number: '50,000+', label: 'Textes juridiques référencés' },
    { number: '10,000+', label: 'Utilisateurs actifs' },
    { number: '500+', label: 'Procédures documentées' },
    { number: '99.9%', label: 'Disponibilité de la plateforme' }
  ];

  return (
    <div className="space-y-8">
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">À propos de Dalil.dz</h1>
          <p className="text-xl text-green-100 leading-relaxed">
            Plateforme de référence pour la veille juridique et réglementaire en Algérie, 
            au service des professionnels du droit et des citoyens.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Notre Mission</h2>
          <div className="prose prose-lg mx-auto text-gray-700">
            <p className="text-lg leading-relaxed mb-6">
              Dalil.dz a été créée avec pour mission de démocratiser l'accès au droit en Algérie. 
              Nous croyons fermement que chaque citoyen et professionnel doit pouvoir accéder 
              facilement et rapidement aux informations juridiques dont il a besoin.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Notre plateforme combine expertise juridique traditionnelle et technologies 
              innovantes pour offrir une expérience utilisateur exceptionnelle dans la 
              recherche et la consultation de textes juridiques et de procédures administratives.
            </p>
            <p className="text-lg leading-relaxed">
              Nous nous engageons à maintenir une base de données complète, actualisée et 
              fiable, tout en développant des outils intelligents qui facilitent la 
              compréhension et l'application du droit algérien.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="bg-green-50 p-4 rounded-xl w-fit mx-auto mb-4">
                <value.icon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Réalisations</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{achievement.number}</div>
              <div className="text-gray-700 font-medium">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Équipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-green-600 font-medium mb-2">{member.role}</p>
              <p className="text-sm text-gray-600">{member.expertise}</p>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Notre Histoire</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2020 - Conception</h3>
                <p className="text-gray-700">
                  Identification du besoin d'une plateforme centralisée pour l'accès au droit algérien.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2021 - Développement</h3>
                <p className="text-gray-700">
                  Début du développement de la plateforme avec une équipe d'experts juridiques et techniques.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2022 - Lancement Beta</h3>
                <p className="text-gray-700">
                  Lancement de la version beta avec les premiers utilisateurs professionnels.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2024 - Plateforme Complète</h3>
                <p className="text-gray-700">
                  Lancement de la plateforme complète avec IA, collaboration et fonctionnalités avancées.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Rejoignez-nous dans notre mission</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Vous partagez notre vision d'un accès démocratisé au droit ? 
          Contactez-nous pour découvrir comment nous pouvons collaborer.
        </p>
        <Link
          to="/aide/contact"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center space-x-2"
        >
          <Users className="h-5 w-5" />
          <span>Nous contacter</span>
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;