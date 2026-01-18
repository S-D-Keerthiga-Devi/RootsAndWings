import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

export default function OrchardCalendar({ onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const getStatus = (day) => {
    const dayNum = day.getDate();
    if (!isSameMonth(day, monthStart)) return 'disabled';
    if (dayNum === 3 || dayNum === 8 || dayNum === 15) return 'pending';
    if (dayNum === 5 || dayNum === 10 || dayNum === 22) return 'booked';
    return 'open';
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-md border border-gray-200 h-full max-h-[85vh] flex flex-col overflow-hidden">
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-4 bg-[#f1f5f3] px-4 py-2 rounded-xl border border-gray-200 shadow-inner">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="material-symbols-outlined text-[#3cc9e1] font-bold cursor-pointer">chevron_left</button>
          <span className="text-base font-extrabold text-[#0f172a] min-w-[140px] text-center">{format(currentMonth, 'MMMM yyyy')}</span>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="material-symbols-outlined text-[#3cc9e1] font-bold cursor-pointer">chevron_right</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-3">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(wd => (
          <div key={wd} className="text-center text-[10px] font-black text-gray-500 tracking-widest uppercase">{wd}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 flex-grow min-h-0">
        {calendarDays.map((day, idx) => {
          const status = getStatus(day);
          const isCurrentMonth = isSameMonth(day, monthStart);
          return (
            <div 
              key={idx} 
              onClick={() => status === 'pending' && onDateSelect(day)}
              className={`min-h-[60px] p-2 rounded-xl border-2 transition-all flex flex-col justify-between group relative
                ${status === 'open' ? 'bg-white border-gray-100 hover:border-[#3cc9e1] cursor-pointer' : ''}
                ${status === 'booked' ? 'bg-[#3cc9e1] border-[#133a36] text-white shadow-md' : ''}
                ${status === 'pending' ? 'bg-[#ffedd5] border-[#9a3412] cursor-pointer shadow-sm' : ''}
                ${!isCurrentMonth ? 'border-transparent opacity-10 pointer-events-none' : ''}
              `}
            >
              <div className="flex justify-between items-start">
                <span className={`text-base font-black ${status === 'open' ? 'text-gray-600' : status === 'pending' ? 'text-[#9a3412]' : 'text-white'}`}>{format(day, 'dd')}</span>
                {status === 'booked' && <span className="material-symbols-outlined text-[12px] bg-white/20 p-0.5 rounded-full">check</span>}
              </div>
              <div className="hidden sm:block">
                <span className={`text-[8px] font-black uppercase ${status === 'pending' ? 'text-[#9a3412]' : 'opacity-70'}`}>
                  {status === 'booked' ? 'Booked' : status === 'pending' ? 'Action' : 'Open'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex gap-4 justify-start px-1 border-t border-gray-100 pt-4">
        <LegendItem color="bg-white border-gray-300" label="Open" />
        <LegendItem color="bg-[#ffedd5] border-[#9a3412]" label="Pending" />
        <LegendItem color="bg-[#3cc9e1]" label="Booked" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`size-3 rounded border ${color}`}></div>
      <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">{label}</span>
    </div>
  );
}