import React from 'react';
import { Search, MessageSquare, Bell, FileText, PlusCircle, Zap } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      name: 'البحث السريع',
      nameFr: 'Recherche Rapide',
      icon: Search,
      description: 'البحث في القاعدة القانونية',
      descriptionFr: 'Rechercher dans la base juridique',
      color: 'bg-[#2E7D32]',
      href: '/search'
    },
    {
      name: 'مساعد الذكاء الاصطناعي',
      nameFr: 'Assistant IA',
      icon: MessageSquare,
      description: 'طرح سؤال قانوني',
      descriptionFr: 'Poser une question juridique',
      color: 'bg-blue-500',
      href: '/assistant'
    },
    {
      name: 'تنبيه جديد',
      nameFr: 'Nouvelle Alerte',
      icon: Bell,
      description: 'إعداد تنبيه',
      descriptionFr: 'Configurer une alerte',
      color: 'bg-red-500',
      href: '/alerts'
    },
    {
      name: 'وثيقة جديدة',
      nameFr: 'Nouveau Document',
      icon: PlusCircle,
      description: 'إضافة وثيقة',
      descriptionFr: 'Ajouter un document',
      color: 'bg-purple-600',
      href: '/documents'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
        <Zap className="h-5 w-5 text-[#2E7D32]" />
        <h2 className="text-lg font-semibold text-gray-900">إجراءات سريعة</h2>
      </div>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="w-full flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group text-right"
          >
            <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-105 transition-transform`}>
              <action.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-sm font-medium text-gray-900">{action.nameFr}</h3>
              <p className="text-xs text-gray-500">{action.descriptionFr}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;