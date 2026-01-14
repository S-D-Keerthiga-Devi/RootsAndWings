import React from 'react';

export default function MoneyBreakdown() {
  return (
    <div className="bg-white rounded-[2.5rem] border border-[#e8e4db] p-8 shadow-sm">
      <h3 className="text-xl font-black text-[#7d6e63] mb-6">Where Your Money Went</h3>
      <div className="flex items-center justify-center mb-8">
        <div className="relative size-40">
          <svg className="size-full" viewBox="0 0 36 36">
            <circle cx="18" cy="18" fill="none" r="16" stroke="#f1efeb" strokeWidth="3" />
            {/* Donut Segments */}
            <circle cx="18" cy="18" fill="none" r="16" stroke="#3cc9e1" strokeDasharray="45 55" strokeDashoffset="25" strokeWidth="3" />
            <circle cx="18" cy="18" fill="none" r="16" stroke="#8ab6a3" strokeDasharray="30 70" strokeDashoffset="-20" strokeWidth="3" />
            <circle cx="18" cy="18" fill="none" r="16" stroke="#c2d5cd" strokeDasharray="25 75" strokeDashoffset="-50" strokeWidth="3" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-black text-[#7d6e63] leading-none">₹12.5k</span>
            <span className="text-[8px] font-bold text-[#7d6e63]/40 uppercase tracking-widest mt-1">Total</span>
          </div>
        </div>
      </div>
      <div className="space-y-3 mb-8">
        <LegendItem color="bg-[#3cc9e1]" label="Food & Nutrition" percent="45%" />
        <LegendItem color="bg-[#8ab6a3]" label="Medical Supplies" percent="30%" />
        <LegendItem color="bg-[#c2d5cd]" label="Hygiene Kits" percent="25%" />
      </div>
      <button className="w-full bg-[#f9f8f4] hover:bg-[#5a8c76]/10 text-[#3cc9e1]] py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 border border-[#e8e4db]">
        <span className="material-symbols-outlined text-lg">download</span>
        Download Impact Report
      </button>
    </div>
  );
}

function LegendItem({ color, label, percent }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`size-2 rounded-full ${color}`}></div>
        <span className="text-xs font-bold text-[#7d6e63]">{label}</span>
      </div>
      <span className="text-xs font-black text-[#7d6e63]">{percent}</span>
    </div>
  );
}