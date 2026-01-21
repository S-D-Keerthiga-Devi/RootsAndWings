import React from 'react';
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link, useLocation } from 'react-router-dom'; // 1. Import Link & Hook

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useUser();
  const location = useLocation(); // 2. Get current URL path

  // Helper to close sidebar on mobile when a link is clicked
  const handleNavClick = () => setIsOpen(false);

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
        
        {/* Navigation Links */}
        {/* 3. Added 'to' paths and passed current location for styling */}
        <nav className="flex flex-col gap-1.5">
          <NavItem 
            to="/orphanage-dashboard" 
            icon="dashboard" 
            label="Overview" 
            currentPath={location.pathname}
            onClick={handleNavClick}
          />
          <NavItem 
            to="/visit-scheduler" 
            icon="calendar_month" 
            label="Visit Scheduler" 
            currentPath={location.pathname}
            onClick={handleNavClick}
          />
          <NavItem 
            to="/plant-dashboard" 
            icon="potted_plant" 
            label="Plant Manager" 
            currentPath={location.pathname}
            onClick={handleNavClick}
          />
          <NavItem 
            to="/inventory-dashboard" 
            icon="inventory_2" 
            label="Inventory" 
            currentPath={location.pathname}
            onClick={handleNavClick}
          />
          <NavItem 
            to="/admin/events" 
            icon="groups" 
            label="Events & Requests" 
            currentPath={location.pathname}
            onClick={handleNavClick}
          />
          <NavItem 
            to="/admin/donors" 
            icon="volunteer_activism" 
            label="Donor Relations" 
            currentPath={location.pathname}
            onClick={handleNavClick}
          />
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

// 4. Updated NavItem to use Link instead of button
function NavItem({ to, icon, label, currentPath, onClick }) {
  // Check if this link is active
  const isActive = currentPath === to;

  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left w-full
      ${isActive 
        ? 'bg-white/20 text-white shadow-lg font-bold' 
        : 'text-white/70 hover:bg-white/10 hover:text-white font-semibold'}
    `}>
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
}