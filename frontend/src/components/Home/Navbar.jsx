import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo_rw2.png';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openSignIn } = useClerk();
  const { user } = useUser();

  // Effect: Add shadow only when scrolling to keep it clean at the top
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Adopt a Grandparent", href: "#adopt" },
    { name: "Impact Data", href: "#impact" },
    { name: "Community", href: "#community" },
  ];

  return (
    // UPDATED CLASS LOGIC:
    // 1. Added 'border-slate-200' to the non-scrolled state to create the "line" you asked for.
    // 2. Changed non-scrolled bg to 'bg-slate-50/80' to slightly differentiate it from pure white hero.
    <nav 
      className={`fixed top-0 z-50 w-full transition-all duration-300 border-b
      ${scrolled 
        ? "bg-white/90 backdrop-blur-md shadow-md border-gray-100" // Scrolled State
        : "bg-slate-50/80 backdrop-blur-sm border-slate-200" // Top State (Added Line & tint)
      }`}
    >
      <div className="flex h-20 w-full items-center justify-between px-6 md:px-12 max-w-[1920px] mx-auto">
        
        {/* --- BRANDING --- */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img src={logo} className="h-12 w-auto object-contain" alt="Roots & Wings" />
          <h1 className="text-2xl font-bold tracking-tight font-['Montserrat'] hidden sm:block">
            <span className="text-slate-700">Roots</span>
            <span className="text-slate-300 mx-1 font-light">&</span>
            <span className="text-cyan-500">Wings</span>
          </h1>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* --- AUTH BUTTONS --- */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500">Welcome, {user.firstName}</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <button
              onClick={() => openSignIn()}
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/30 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Join the Cause
            </button>
          )}
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden p-2 text-slate-600 focus:outline-none"
        >
          {open ? (
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* --- MOBILE MENU --- */}
      {open && (
        <div className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl md:hidden flex flex-col p-6 gap-6 animation-fade-in-down">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-slate-700 py-2 border-b border-gray-100"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {!user ? (
              <button 
                  onClick={() => openSignIn()}
                  className="w-full py-3 bg-cyan-500 text-white font-bold rounded-lg shadow-md"
              >
                  Login / Sign Up
              </button>
            ) : (
              <div className="flex items-center gap-3 py-2">
                <UserButton />
                <span className="text-slate-600 font-medium">Manage Account</span>
              </div>
            )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;