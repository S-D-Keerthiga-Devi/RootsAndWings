import React from 'react';

export default function MealsFunded() {
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  
  // Data points to align with the SVG path
  // Representing the Y-coordinate for each month (higher number = lower on chart)
  const points = [
    { x: 0, y: 35 },   // May
    { x: 20, y: 32 },  // Jun
    { x: 40, y: 25 },  // Jul
    { x: 60, y: 18 },  // Aug
    { x: 80, y: 10 },  // Sep
    { x: 100, y: 5 }   // Oct
  ];

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-[#e8e4db] shadow-sm h-full flex flex-col">
      {/* Header with Growth Badge */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-lg font-black text-[#7d6e63]">Meals Funded</h4>
          <p className="text-2xl font-black text-[#3cc9e1]">1,240</p>
        </div>
        <span className="bg-[#5a8c76]/10 text-[#3cc9e1] text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">trending_up</span>
          +12%
        </span>
      </div>

      {/* Chart Area */}
      <div className="h-40 flex items-end relative px-2 grow">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
          {/* 1. Area Fill (The "Growth" volume) */}
          <path 
            d="M0 40 L0 35 Q 25 38 50 15 T 100 5 L 100 40 Z" 
            fill="url(#gradient)" 
            opacity="0.3"
          />
          
          {/* 2. The Main Line */}
          <path 
            d="M0 35 Q 25 38 50 15 T 100 5" 
            fill="none" 
            stroke="#3cc9e1" 
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* 3. Data Points (Circles for each month) */}
          {points.map((p, i) => (
            <circle 
              key={i} 
              cx={p.x} 
              cy={p.y} 
              r="2" 
              fill="white" 
              stroke="#76E0EE" 
              strokeWidth="1.5" 
            />
          ))}

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3cc9e1" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Month Labels */}
      <div className="flex justify-between mt-6 text-[10px] font-bold text-[#7d6e63]/40 uppercase tracking-widest px-1">
        {months.map(m => <span key={m}>{m}</span>)}
      </div>
    </div>
  );
}