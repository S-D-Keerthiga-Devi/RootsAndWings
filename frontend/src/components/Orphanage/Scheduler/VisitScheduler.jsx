
import React, { useState } from 'react';
import Sidebar from '../common/Sidebar';
import OrchardCalendar from './OrchardCalendar';
import PendingApprovals from './PendingApprovals';

export default function VisitScheduler() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f7f6] font-['Manrope'] text-[#2d312f] relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 overflow-hidden flex flex-col p-6 lg:p-10">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col h-full">
          {/* Header Section */}
          <header className="flex justify-between items-center mb-6 shrink-0">
            <div>
              <h2 className="text-3xl font-black text-[#111827]">Orchard Calendar</h2>
              <p className="text-sm text-gray-400 font-medium mt-1">Nurturing daily connections at Sunrise Orphanage</p>
            </div>
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </header>

          {/* Main Content Grid: flex-1 and overflow-hidden prevent page scrolling */}
          <div className="grid grid-cols-12 gap-8 flex-1 min-h-0">
            <div className="col-span-12 lg:col-span-8 h-full overflow-hidden">
              <OrchardCalendar onDateSelect={setSelectedDate} />
            </div>
            <div className="col-span-12 lg:col-span-4 h-full overflow-hidden">
              <PendingApprovals highlightedDate={selectedDate} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}