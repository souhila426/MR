import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Share2,
  Plus,
  Search,
  Filter,
  Clock,
  User,
  Eye,
  Star,
  TrendingUp
} from 'lucide-react';

const CollaborationPlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState('groups');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { title: 'Collaborateurs actifs', value: '156', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Discussions actives', value: '479', icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Projets en cours', value: '23', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Documents partagés', value: '1,234', icon: Share2, color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  const workGroups = [
    {
      id: 1,
      name: 'Droit des Sociétés - Experts',
      category: 'Droit des affaires',
      description: 'Groupe d\'experts spécialisés en droit des sociétés et gouvernance d\'entreprise',
      members: 23,
      posts: 156,
      lastActivity: 'Il y a 2 heures',
      isPrivate: false
    },
    {
      id: 2,
      name: 'Réforme du Droit du Travail',
      category: 'Droit du travail',
      description: 'Discussion et analyses sur la réforme en cours du droit du travail',
      members: 87,
      posts: 234,
      lastActivity: 'Il y a 30 minutes',
      isPrivate: false
    },
    {
      id: 3,
      name: 'Jurisprudence Environnementale',
      category: 'Droit de l\'environnement',
      description: 'Suivi et analyse des décisions récentes en droit de l\'environnement',
      members: 45,
      posts: 89,
      lastActivity: 'Il y a 1 heure',
      isPrivate: true
    }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Impact de l\'arrêt XYZ sur les contrats commerciaux',
      author: 'Marie Dubois',
      group: 'Droit des Sociétés - Experts',
      replies: 12,
      lastReply: 'Il y a 15 minutes',
      isPopular: true
    },
    {
      id: 2,
      title: 'Nouvelle directive européenne : implications pratiques',
      author: 'Jean Martin',
      group: 'Réforme du Droit du Travail',
      replies: 8,
      lastReply: 'Il y a 45 minutes',
      isPopular: false
    },
    {
      id: 3,
      title: 'Question sur l\'application du décret 2025-045',
      author: 'Sophie Laurent',
      group: 'Jurisprudence Environnementale',
      replies: 5,
      lastReply: 'Il y a 2 heures',
      isPopular: false
    }
  ];

  const collaborativeProjects = [
    {
      id: 1,
      title: 'Guide pratique - Loi 2025-123',
      description: 'Rédaction collaborative d\'un guide d\'application de la nouvelle loi sur les sociétés',
      progress: 75,
      contributors: 8,
      deadline: '15 février 2025',
      status: 'En cours'
    },
    {
      id: 2,
      title: 'Analyse comparative - Droit européen',
      description: 'Étude comparative des réglementations européennes en matière environnementale',
      progress: 45,
      contributors: 12,
      deadline: '30 mars 2025',
      status: 'En cours'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Collaboration</h1>
          <p className="text-gray-600 mt-2">
            Travaillez ensemble sur des projets juridiques
          </p>
        </div>
        
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nouveau projet</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
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
                placeholder="Rechercher groupes, discussions, projets..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Tous les domaines</option>
              <option>Droit des affaires</option>
              <option>Droit du travail</option>
              <option>Droit de l'environnement</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filtres</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('groups')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'groups'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Groupes de travail
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'discussions'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Discussions
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'projects'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Projets collaboratifs
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'groups' && (
            <div className="space-y-6">
              {workGroups.map((group) => (
                <div key={group.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          {group.category}
                        </span>
                        {group.isPrivate && (
                          <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs">
                            Privé
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {group.description}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{group.members} membres</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{group.posts} posts</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{group.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Groupe d'experts spécialisés en droit des sociétés et gouvernance d'entreprise
                    </div>
                    
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Rejoindre le groupe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'discussions' && (
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 cursor-pointer">
                          {discussion.title}
                        </h3>
                        {discussion.isPopular && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                            Populaire
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{discussion.author}</span>
                        </div>
                        <span>dans {discussion.group}</span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{discussion.replies} réponses</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Dernière réponse {discussion.lastReply}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              {collaborativeProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          {project.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Progression</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{project.contributors} contributeurs</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Échéance: {project.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaborationPlatform;