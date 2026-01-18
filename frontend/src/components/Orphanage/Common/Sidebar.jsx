import React from 'react';
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useUser();

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-[#3cc9e1] flex flex-col justify-between py-8 px-6 transition-transform duration-300 ease-in-out
      lg:static lg:translate-x-0 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex flex-col gap-8">
        {/* Brand Header */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white">eco</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-extrabold leading-tight">Roots & Wings</h1>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Admin Control Center</p>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-white/70">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* Navigation Buttons */}
        <nav className="flex flex-col gap-1.5">
          <NavItem icon="dashboard" label="Overview" active />
          <NavItem icon="calendar_month" label="Visit Scheduler"  />
          <NavItem icon="potted_plant" label="Plant Manager" />
          <NavItem icon="inventory_2" label="Inventory" />
          <NavItem icon="groups" label="Events & Requests" />
          <NavItem icon="volunteer_activism" label="Donor Relations" />
        </nav>
      </div>

      {/* Admin Profile Footer */}
      <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3 border border-white/10 text-white">
        <UserButton afterSignOutUrl="/" />
        <div className="flex flex-col truncate">
          <p className="text-sm font-bold truncate">{user?.firstName || 'Admin'} 👋</p>
          <p className="text-[10px] text-white/60 font-bold uppercase tracking-tighter">Super Admin</p>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <button className={`
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left w-full
      ${active 
        ? 'bg-white/20 text-white shadow-lg' 
        : 'text-white/70 hover:bg-white/10 hover:text-white'}
    `}>
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}