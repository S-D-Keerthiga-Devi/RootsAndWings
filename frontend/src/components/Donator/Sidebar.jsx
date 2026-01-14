import React from 'react';
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useUser();

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#e8e4db] flex flex-col justify-between py-8 px-6 transition-transform duration-300 ease-in-out
      lg:static lg:translate-x-0 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex flex-col gap-8">
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#3cc9e1] flex items-center justify-center text-white shadow-md shadow-[#5a8c76]/20">
              <span className="material-symbols-outlined">eco</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-extrabold text-[#3cc9e1] leading-tight">Roots of Love</h1>
              <p className="text-[#7d6e63]/60 text-[10px] font-bold uppercase tracking-wider">Donor Portal</p>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-[#7d6e63]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* Navigation Buttons */}
        <nav className="flex flex-col gap-1.5">
          <NavItem icon="dashboard" label="Overview" active />
          <NavItem icon="calendar_today" label="My Adoptions" />
          <NavItem icon="volunteer_activism" label="Impact Stories" />
          <NavItem icon="diversity_3" label="Groups" />
          
          <div className="pt-6 mt-6 border-t border-[#e8e4db]">
            <NavItem icon="settings" label="Account" />
          </div>
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="bg-[#5a8c76]/5 p-4 rounded-2xl flex items-center gap-3 border border-[#5a8c76]/10">
        <UserButton afterSignOutUrl="/" />
        <div className="flex flex-col truncate">
          <p className="text-sm font-bold truncate">{user?.firstName || 'Priya'} 👋</p>
          <p className="text-[10px] text-[#3cc9e1] font-bold uppercase tracking-tighter">Level 3 Donor</p>
        </div>
      </div>
    </aside>
  );
}

/* Helper Component for Sidebar Buttons */
function NavItem({ icon, label, active = false }) {
  return (
    <button className={`
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left w-full
      ${active 
        ? 'bg-[#3cc9e1] text-white shadow-sm shadow-[#5a8c76]/30' 
        : 'text-[#7d6e63] hover:bg-[#5a8c76]/10 hover:text-[#3cc9e1]'}
    `}>
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}