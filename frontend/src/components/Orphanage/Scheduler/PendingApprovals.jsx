import React, { useEffect, useRef } from 'react';
import { isSameDay, format } from 'date-fns';

export default function PendingApprovals({ highlightedDate }) {
  const scrollRefs = useRef({});

  // Sample data simulating multiple requests
  const requests = [
    { id: 1, name: 'Sarah Jenkins', type: 'Educational Visit', rawDate: new Date(2023, 9, 3), time: '10:00 AM', message: "I'd love to organize a short reading session." },
    { id: 2, name: 'Robert Chen', type: 'Prospective Parent', rawDate: new Date(2023, 9, 8), time: '02:30 PM', message: "Initial walkthrough and facility tour." },
    { id: 3, name: 'Emily Watts', type: 'Art Workshop', rawDate: new Date(2023, 9, 15), time: '09:00 AM', message: "Supplying watercolor materials." },
    { id: 4, name: 'Marcus Thorne', type: 'Weekend Play', rawDate: new Date(2023, 9, 20), time: '11:00 AM', message: "Bringing footballs for the senior wing." }
  ];

  useEffect(() => {
    if (highlightedDate) {
      const dateKey = highlightedDate.toDateString();
      if (scrollRefs.current[dateKey]) {
        scrollRefs.current[dateKey].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [highlightedDate]);

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Title Header: Fixed */}
      <div className="flex items-center justify-between px-2 mb-6 shrink-0">
        <h3 className="text-xl font-black text-[#111827]">Pending Approvals</h3>
        <span className="bg-[#ffedd5] text-[#9a3412] text-[10px] font-black px-3 py-1 rounded-lg border border-[#fed7aa] uppercase">
          {requests.length} Requests
        </span>
      </div>

      {/* SCROLLABLE CONTAINER: flex-1 and overflow-y-auto create the scroll zone */}
      <div className="flex-1 overflow-y-auto pr-3 space-y-4 custom-scrollbar">
        {requests.map((req) => {
          const dateKey = req.rawDate.toDateString();
          const isHighlighted = highlightedDate && isSameDay(req.rawDate, highlightedDate);
          return (
            <div 
              key={req.id} 
              ref={el => scrollRefs.current[dateKey] = el}
              className={`p-6 rounded-[2rem] border-2 transition-all duration-500 flex flex-col
                ${isHighlighted 
                  ? 'border-[#9a3412] bg-[#fffaf5] shadow-lg ring-4 ring-[#ffedd5]' 
                  : 'border-gray-100 bg-white shadow-sm hover:border-gray-200'}`}
            >
              {/* Request Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-100">
                     <img src={`https://ui-avatars.com/api/?name=${req.name}&background=1a4d48&color=fff`} className="size-full" alt="avatar" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#111827]">{req.name}</h4>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{req.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-[#111827]">{format(req.rawDate, 'MMM dd')}</p>
                  <p className="text-[10px] font-bold text-gray-300">{req.time}</p>
                </div>
              </div>

              {/* Message */}
              <p className="text-xs text-gray-500 italic leading-relaxed mb-6">"{req.message}"</p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                <button className="bg-[#3cc9e1] text-white py-3 rounded-xl font-black text-[11px] flex items-center justify-center gap-2 shadow-md shadow-[#3cc9e1]/20 hover:bg-[#133a36] transition-all">
                  <span className="material-symbols-outlined text-sm">done_all</span> Approve
                </button>
                <button className="bg-[#f8faf9] text-gray-500 py-3 rounded-xl font-black text-[11px] flex items-center justify-center gap-2 border border-gray-100 hover:bg-gray-100 transition-all">
                  <span className="material-symbols-outlined text-sm">event_repeat</span> Reschedule
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}