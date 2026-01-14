import React, { useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import Sidebar from './Sidebar';
import StatCard from './StatCard';
import AdoptedDays from './AdoptedDays';
import MonthlyContributions from './MonthlyContributions';
import MealsFunded from './MealsFunded';
import SaplingLevel from './SaplingLevel';
import MoneyBreakdown from './MoneyBreakdown';

export default function DonatorDashboard() {
  const { user } = useUser();
  // This was causing the error because useState wasn't imported above
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9f8f4] font-['Manrope'] text-[#2d312f] relative">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 overflow-y-auto pb-12">
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
          
          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[#3cc9e1]]">
              <span className="material-symbols-outlined font-bold">eco</span>
              <span className="font-extrabold tracking-tight">Roots of Love</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 bg-white rounded-xl shadow-sm border border-[#e8e4db]"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>

          <header className="space-y-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-black text-[#7d6e63]">
                Good Morning, {user?.firstName || 'Priya'} 👋
              </h2>
              <p className="text-[#3cc9e1]] text-lg font-medium">Your kindness is changing lives.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard icon="payments" label="Total Donated" value="₹12,500" />
              <StatCard icon="event_available" label="Days Adopted" value="6" />
              <StatCard icon="restaurant" label="Meals Funded" value="240" />
              <StatCard icon="volunteer_activism" label="Volunteer Hours" value="18" />
            </div>
          </header>

          {/* 12-Column Layout */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-8">
              <AdoptedDays />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <MonthlyContributions />
                <MealsFunded />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 space-y-8">
              <SaplingLevel />
              <MoneyBreakdown />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}