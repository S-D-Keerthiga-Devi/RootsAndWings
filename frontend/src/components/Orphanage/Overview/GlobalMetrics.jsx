import React from 'react';

export default function GlobalMetrics() {
  const stats = [
    { label: 'Residents', value: '124', icon: 'groups', color: 'text-[#1a4d48]', bg: 'bg-[#f1f5f3]' },
    { label: 'Pending Visits', value: '08', icon: 'calendar_month', color: 'text-[#9a3412]', bg: 'bg-[#fff7ed]' },
    { label: 'Critical Alerts', value: '03', icon: 'warning', color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Impact Score', value: '94%', icon: 'eco', color: 'text-[#1a4d48]', bg: 'bg-[#f1f5f3]' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white py-4 px-5 rounded-[1.5rem] border border-gray-100 shadow-sm flex items-center gap-4">
          <div className={`size-12 flex items-center justify-center ${stat.bg} ${stat.color} rounded-xl shrink-0`}>
            <span className="material-symbols-outlined font-black text-xl">{stat.icon}</span>
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest truncate">{stat.label}</p>
            <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}