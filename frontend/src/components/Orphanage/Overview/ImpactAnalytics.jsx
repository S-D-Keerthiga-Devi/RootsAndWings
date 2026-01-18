import React from 'react';

export default function ImpactAnalytics() {
  return (
    <div className="bg-[#0f172a] text-white p-6 rounded-[2rem] border border-white/5 h-full relative overflow-hidden flex flex-col justify-center shadow-2xl">
      <div className="flex items-center gap-2 mb-6 shrink-0">
        <span className="material-symbols-outlined text-[#3cc9e1] text-lg animate-pulse">auto_awesome</span>
        <h3 className="text-sm font-black tracking-widest uppercase opacity-70">Predictive Math</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="text-center md:text-left">
          <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Medical Depletion</p>
          <p className="text-3xl font-black text-red-400">4d <span className="text-[10px] text-gray-500 uppercase">Est.</span></p>
        </div>
        <div className="border-l border-white/10 pl-6">
          <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Impact Efficiency</p>
          <p className="text-3xl font-black text-[#3cc9e1]">+12%</p>
        </div>
        <div className="border-l border-white/10 pl-6">
          <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Daily Burn Rate</p>
          <p className="text-3xl font-black text-white">₹500</p>
        </div>
      </div>
    </div>
  );
}