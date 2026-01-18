import React from 'react';

export default function PredictiveInsights() {
  return (
    <div className="bg-[#111827] text-white p-8 rounded-3xl border border-white/5 relative overflow-hidden">
      <div className="flex items-center gap-2 mb-8">
        <span className="material-symbols-outlined text-[#3cc9e1]">auto_awesome</span>
        <h3 className="text-lg font-bold">AI Predictive Insights</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Medical Depletion</p>
          <p className="text-3xl font-black text-red-400">4 Days</p>
          <p className="text-[10px] text-gray-500 mt-2">Based on current burn rate for 124 residents</p>
        </div>
        <div className="border-l border-white/10 pl-8">
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Milk Supply</p>
          <p className="text-3xl font-black text-orange-400">9 Days</p>
          <p className="text-[10px] text-gray-500 mt-2">Burn rate increased by 12% this week</p>
        </div>
        <div className="border-l border-white/10 pl-8">
          <p className="text-[10px] text-[#3cc9e1] font-bold uppercase mb-1">Impact Math</p>
          <p className="text-3xl font-black">₹500 <span className="text-sm">/ 2 days</span></p>
          <p className="text-[10px] text-gray-500 mt-2">Price surge in Insulin reduced impact.</p>
        </div>
      </div>
      
      <div className="pt-6 border-t border-white/5 flex justify-between items-center italic text-gray-400 text-xs">
        <p>"AI suggests initiating a specialized medical drive before weekend surge."</p>
        <button className="text-[#3cc9e1] font-bold not-italic hover:underline">View Detailed Burn Chart</button>
      </div>
    </div>
  );
}