import React from 'react';
import { Clock, FileText, MessageSquare, Bell, Download } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'document',
      title: 'استشارة قانون العمل',
      titleFr: 'Consultation du Code du travail',
      description: 'المادة 87 - المدة القانونية للعمل',
      descriptionFr: 'Article 87 - Durée légale du travail',
      time: '14:30',
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'ai',
      title: 'سؤال لمساعد الذكاء الاصطناعي',
      titleFr: 'Question à l\'assistant IA',
      description: 'إجراء الفصل الاقتصادي',
      descriptionFr: 'Procédure de licenciement économique',
      time: '11:20',
      icon: MessageSquare,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      id: 3,
      type: 'alert',
      title: 'تنبيه جديد مستلم',
      titleFr: 'Nouvelle alerte reçue',
      description: 'تعديل الأجر الوطني الأدنى المضمون',
      descriptionFr: 'Modification du SNMG',
      time: '09:15',
      icon: Bell,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      id: 4,
      type: 'download',
      title: 'تحميل',
      titleFr: 'Téléchargement',
      description: 'قانون المالية 2024.pdf',
      descriptionFr: 'Loi de finances 2024.pdf',
      time: 'أمس',
      icon: Download,
      color: 'text-[#2E7D32]',
      bg: 'bg-[#E8F5E8]'
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4 rtl:space-x-reverse">
          <div className={`p-2 rounded-lg ${activity.bg}`}>
            <activity.icon className={`h-4 w-4 ${activity.color}`} />
          </div>
          <div className="flex-1 min-w-0 text-right">
            <p className="text-sm font-medium text-gray-900">{activity.titleFr}</p>
            <p className="text-sm text-gray-500 truncate">{activity.descriptionFr}</p>
          </div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{activity.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;