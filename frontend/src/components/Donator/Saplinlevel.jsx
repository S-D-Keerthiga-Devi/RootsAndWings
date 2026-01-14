import React from "react";

export default function SaplingLevel() {
  return (
    <div className="bg-white rounded-[2.5rem] border border-[#e8e4db] p-8 shadow-sm flex flex-col items-center">
      {/* 1. Header Section */}
      <div className="w-full flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-black text-[#7d6e63]">Roots of Love</h3>
          <p className="text-xs font-bold text-[#3cc9e1] uppercase tracking-wider">Level 3 Sapling</p>
        </div>
        <div className="size-10 bg-[#f9f8f4] rounded-xl flex items-center justify-center text-[#3cc9e1]">
          <span className="material-symbols-outlined">psychology</span>
        </div>
      </div>
      
      {/* 2. Visual Plant Container */}
      <div className="relative size-48 rounded-full bg-linear-to-t from-[#e8f0eb] to-transparent flex items-center justify-center mb-6 overflow-hidden">
        <div className="relative">
          <span className="material-symbols-outlined text-[#3cc9e1] text-[80px]">eco</span>
          {/* Soft shadow at the base of the plant */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-[#7d6e63]/10 rounded-full blur-sm"></div>
        </div>
      </div>

      {/* 3. Progress Bar Section */}
      <div className="w-full space-y-3 mb-8">
        <div className="flex justify-between text-xs font-black text-[#7d6e63]">
          <span>Experience</span>
          <span>750 / 1000 XP</span>
        </div>
        <div className="h-3 w-full bg-[#f9f8f4] rounded-full overflow-hidden">
          {/* Primary green for progress */}
          <div className="h-full bg-[#3cc9e1] rounded-full w-3/4 transition-all duration-700"></div>
        </div>
      </div>

      {/* 4. Feedback/Story Card */}
      <div className="bg-[#f9f8f4]/80 p-4 rounded-2xl w-full flex items-center gap-3 border border-white">
        <div 
          className="size-12 rounded-xl bg-cover bg-center border-2 border-white shadow-sm shrink-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop')" }}
        ></div>
        <div>
          <p className="text-[11px] font-bold text-[#7d6e63] leading-tight">
            "Grandpa Sharma watered your tree today"
          </p>
          <p className="text-[10px] text-[#3cc9e1] font-medium">Sunrise Old Age Home</p>
        </div>
      </div>
    </div>
  );
};