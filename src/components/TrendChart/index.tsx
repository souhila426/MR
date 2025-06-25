import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

const TrendChart: React.FC = () => {
  const data = [
    { month: 'يناير', monthFr: 'Jan', value: 45 },
    { month: 'فبراير', monthFr: 'Fév', value: 52 },
    { month: 'مارس', monthFr: 'Mar', value: 48 },
    { month: 'أبريل', monthFr: 'Avr', value: 61 },
    { month: 'مايو', monthFr: 'Mai', value: 55 },
    { month: 'يونيو', monthFr: 'Jun', value: 67 }
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <BarChart3 className="h-5 w-5 text-[#2E7D32]" />
          <h2 className="text-lg font-semibold text-gray-900">الاتجاهات</h2>
        </div>
        <div className="flex items-center space-x-1 rtl:space-x-reverse text-[#2E7D32] text-sm font-medium">
          <TrendingUp className="h-4 w-4" />
          <span>+12%</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="text-xs font-medium text-gray-500 w-8 text-right">{item.monthFr}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs font-medium text-gray-700 w-8">{item.value}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-right">
          المنشورات القانونية المستشارة هذا الشهر
        </p>
      </div>
    </div>
  );
};

export default TrendChart;