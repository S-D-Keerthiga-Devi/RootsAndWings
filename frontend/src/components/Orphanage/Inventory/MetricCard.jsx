import React from 'react';

export default function MetricCard({ icon, title, level, status, color }) {
  const statusColors = {
    HEALTHY: 'bg-green-100 text-green-600',
    CRITICAL: 'bg-red-100 text-red-600',
    LOW: 'bg-orange-100 text-orange-600',
    STABLE: 'bg-teal-100 text-teal-600'
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50/50 rounded-xl text-blue-600">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className={`text-[10px] font-black px-2 py-1 rounded-md ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <h4 className="text-sm font-bold text-gray-800 mb-1">{title}</h4>
      <div className="flex justify-between items-end">
        <span className="text-[10px] text-gray-400 font-bold uppercase">Stock Level</span>
        <span className="text-xs font-bold">{level}%</span>
      </div>
      <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-500" 
          style={{ width: `${level}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}