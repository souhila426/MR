import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter,
  Users,
  FileText,
  Eye,
  MessageSquare
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const kpis = [
    {
      title: 'Nouvelles Publications',
      value: '156',
      change: '+12%',
      trend: 'up',
      period: 'Ce mois',
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Consultations Totales',
      value: '2,847',
      change: '+8%',
      trend: 'up',
      period: 'Ce mois',
      icon: Eye,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Utilisateurs Actifs',
      value: '492',
      change: '+15%',
      trend: 'up',
      period: 'Ce mois',
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Questions IA',
      value: '1,234',
      change: '+24%',
      trend: 'up',
      period: 'Ce mois',
      icon: MessageSquare,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    }
  ];

  const publicationsByDomain = [
    { domain: 'Droit du Travail', count: 45, percentage: 28.8, color: 'bg-blue-500' },
    { domain: 'Droit Fiscal', count: 38, percentage: 24.4, color: 'bg-green-500' },
    { domain: 'Procédures Admin.', count: 32, percentage: 20.5, color: 'bg-purple-500' },
    { domain: 'Droit Commercial', count: 25, percentage: 16.0, color: 'bg-amber-500' },
    { domain: 'Autres', count: 16, percentage: 10.3, color: 'bg-slate-400' }
  ];

  const monthlyTrends = [
    { month: 'Jan', publications: 120, consultations: 2100, users: 380 },
    { month: 'Fév', publications: 135, consultations: 2300, users: 420 },
    { month: 'Mar', publications: 142, consultations: 2450, users: 445 },
    { month: 'Avr', publications: 128, consultations: 2200, users: 398 },
    { month: 'Mai', publications: 156, consultations: 2650, users: 465 },
    { month: 'Jun', publications: 148, consultations: 2847, users: 492 }
  ];

  const topDocuments = [
    {
      title: 'Code du travail - Version consolidée',
      views: 1247,
      downloads: 89,
      domain: 'Droit du Travail'
    },
    {
      title: 'Loi de finances 2024',
      views: 892,
      downloads: 156,
      domain: 'Droit Fiscal'
    },
    {
      title: 'Procédures administratives simplifiées',
      views: 675,
      downloads: 43,
      domain: 'Procédures Admin.'
    },
    {
      title: 'Guide des marchés publics',
      views: 534,
      downloads: 67,
      domain: 'Droit Commercial'
    }
  ];

  const maxValue = Math.max(...monthlyTrends.map(t => Math.max(t.publications, t.consultations / 20, t.users)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytiques & Rapports</h1>
          <p className="text-slate-600 mt-1">
            Suivez les performances et tendances de votre plateforme juridique
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${kpi.bg}`}>
                <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
              <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                <span>{kpi.change}</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">{kpi.title}</h3>
            <p className="text-3xl font-bold text-slate-900 mb-1">{kpi.value}</p>
            <p className="text-xs text-slate-500">{kpi.period}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trends Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Tendances Mensuelles</h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-slate-600">Publications</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-slate-600">Consultations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-slate-600">Utilisateurs</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {monthlyTrends.map((trend, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-600 w-8">{trend.month}</span>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-slate-100 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(trend.publications / maxValue) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-600 w-8">{trend.publications}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-slate-100 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((trend.consultations / 20) / maxValue) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-600 w-8">{(trend.consultations / 1000).toFixed(1)}k</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-slate-100 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(trend.users / maxValue) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-600 w-8">{trend.users}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publications by Domain */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Publications par Domaine</h2>
          <div className="space-y-4">
            {publicationsByDomain.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700 font-medium">{item.domain}</span>
                  <span className="text-slate-600">{item.count}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className={`${item.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-slate-500">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Documents */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Documents les Plus Consultés</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Domaine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Vues
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Téléchargements
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Tendance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {topDocuments.map((doc, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">{doc.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                      {doc.domain}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    {doc.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    {doc.downloads}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">+{Math.floor(Math.random() * 20 + 5)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;