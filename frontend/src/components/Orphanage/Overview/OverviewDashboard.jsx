import React, { useState } from "react";
import Sidebar from "../common/Sidebar";
import GlobalMetrics from "./GlobalMetrics";
import ImpactAnalytics from "./ImpactAnalytics";
import ActivityFeed from "./ActivityFeed";
import FacilityAlerts from "./FacilityAlerts";

export default function OverviewDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8faf9] font-['Manrope'] text-[#2d312f] relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col p-6 lg:p-8 overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full">
          
          {/* Header: Compact */}
          <header className="flex justify-between items-center mb-6 shrink-0">
            <div>
              <h2 className="text-2xl font-black text-[#111827]">Overview Command</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Real-time Intelligence</p>
            </div>
          </header>

          {/* GlobalMetrics: Fixed Height */}
          <section className="shrink-0 mb-6">
            <GlobalMetrics />
          </section>

          {/* MAIN GRID: Self-adjusting layout */}
          <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
            
            {/* Left Column (8/12) */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 min-h-0">
              {/* Analytics: 35% of space */}
              <div className="h-[35%] min-h-[200px]">
                <ImpactAnalytics />
              </div>
              {/* Facility Alerts: 65% of space - adjusting to fill */}
              <div className="flex-1 min-h-0"> 
                <FacilityAlerts />
              </div>
            </div>

            {/* Right Column (4/12): Fills full height */}
            <div className="col-span-12 lg:col-span-4 min-h-0">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}