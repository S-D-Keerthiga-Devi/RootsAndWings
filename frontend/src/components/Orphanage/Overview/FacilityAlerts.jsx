import React from 'react';

export default function FacilityAlerts() {
  const alerts = [
    { id: 1, title: "Medical Supplies Critical", subtitle: "WING A & C", description: "Depletion in 4 days. Burn rate +12%.", severity: "CRITICAL", accent: "bg-red-600", theme: "bg-red-50/40 border-red-100" },
    { id: 2, title: "Water Maintenance", subtitle: "WING B INFRA", description: "Filter replacement is 48h overdue.", severity: "WARNING", accent: "bg-[#9a3412]", theme: "bg-orange-50/40 border-orange-100" },
    { id: 3, title: "Utility Alert", subtitle: "POWER DRAW", description: "Wing D power draw 15% above avg.", severity: "NOTICE", accent: "bg-blue-600", theme: "bg-blue-50/40 border-blue-100" }
  ];

  return (
    <div className="h-full bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-red-600 text-lg">notification_important</span>
          <h3 className="text-lg font-black text-[#111827]">Priority Alerts</h3>
        </div>
      </div>

      {/* Internal Scrollable Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar min-h-0">
        {alerts.map((alert) => (
          <div key={alert.id} className={`relative overflow-hidden border rounded-2xl p-4 transition-all hover:bg-white ${alert.theme}`}>
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${alert.accent}`} />
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0">
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{alert.subtitle}</p>
                <h4 className="font-black text-sm text-[#111827] truncate">{alert.title}</h4>
                <p className="text-[11px] font-medium text-gray-500 line-clamp-2 mt-1">{alert.description}</p>
              </div>
              <button className="shrink-0 text-[10px] font-black text-[#1a4d48] uppercase tracking-widest bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 hover:bg-[#1a4d48] hover:text-white transition-all">
                Resolve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}