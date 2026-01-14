import React, { useState } from 'react';

const AdoptedDays = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // Default to Nov 2025

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  // Navigation Handlers
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  // Create padding for days of the previous month to align the grid
  const blanks = Array(firstDayOfMonth(year, currentDate.getMonth())).fill(null);
  const days = Array.from({ length: daysInMonth(year, currentDate.getMonth()) }, (_, i) => i + 1);

  // Mock Adopted Day for Nov 14
  const isAdopted = (d) => year === 2025 && currentDate.getMonth() === 10 && d === 14;

  return (
    <div className="bg-white rounded-[2.5rem] border border-[#e8e4db] p-8 shadow-sm">
      {/* 1. Dynamic Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-black text-[rgb(125,110,99)]">Your Adopted Days</h3>
          <p className="text-xs font-bold text-[#3cc9e1] uppercase tracking-widest">{monthName} {year}</p>
        </div>
        <div className="flex gap-2 text-[#7d6e63]">
          <button onClick={prevMonth} className="p-2 hover:bg-[#f9f8f4] rounded-full transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-[#f9f8f4] rounded-full transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      {/* 2. Responsive 7-Column Grid */}
      <div className="grid grid-cols-7 gap-4 mb-8">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(wd => (
          <div key={wd} className="text-center text-xs font-bold text-[#3cc9e1] uppercase tracking-wider">{wd}</div>
        ))}
        
        {/* Blank spaces for correct day alignment */}
        {blanks.map((_, i) => <div key={`b-${i}`} className="aspect-square" />)}
        
        {/* Actual Days */}
        {days.map((d) => (
          <div
            key={d}
            className={`aspect-square flex items-center justify-center rounded-2xl text-sm font-bold transition-all relative
              ${isAdopted(d) ? 'bg-[#3cc9e1] text-white shadow-lg shadow-[#5a8c76]/30' : 'bg-[#f9f8f4] text-[#7d6e63]'}
            `}
          >
            {d}
            {isAdopted(d) && (
              <div className="absolute -top-1 -right-1 size-2 bg-orange-400 rounded-full border-2 border-white"></div>
            )}
          </div>
        ))}
      </div>

      {/* 3. Event Banner */}
      <div className="bg-[#3cc9e1] p-6 rounded-2xl flex items-center justify-between text-white shadow-xl shadow-[#3cc9e1]/20">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <span className="material-symbols-outlined text-3xl">celebration</span>
          </div>
          <div className="flex flex-col">
            <p className="text-white/70 text-sm font-semibold">Upcoming Adopted Day</p>
            <p className="text-xl font-black">Nov 14: Sunrise Orphanage</p>
          </div>
        </div>
        <button className="bg-white text-[#3cc9e1] px-5 py-2.5 rounded-xl font-black text-sm hover:bg-[#3cc9e1] hover:text-white transition-all">
          View Details
        </button>
      </div>
    </div>
  );
};

export default AdoptedDays;