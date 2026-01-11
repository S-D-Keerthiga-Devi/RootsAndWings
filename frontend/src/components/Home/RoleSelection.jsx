import React, { useState } from 'react';
import { HeartHandshake, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null); // 'donor' or 'admin'

  const handleContinue = () => {
    if (selectedRole) {
      console.log(`Role Selected: ${selectedRole}`);
      // TODO: Navigate to dashboard
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4">
      {/* Reduced max-width from 4xl to xl for compactness */}
      <div className="max-w-lg w-full">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 font-['Montserrat']">
            Join <span className="text-cyan-600">Roots & Wings</span>
          </h1>
          <p className="mt-2 text-slate-500 text-sm">Select your account type to continue.</p>
        </div>

        {/* ROLE CARDS GRID */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* OPTION 1: DONOR */}
          <button
            onClick={() => setSelectedRole('donor')}
            className={`relative p-6 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 h-40
              ${selectedRole === 'donor' 
                ? 'border-cyan-500 bg-white shadow-lg ring-2 ring-cyan-500/20 scale-105 z-10' 
                : 'border-slate-200 bg-white hover:border-cyan-300 hover:shadow-md text-slate-400 hover:text-cyan-500'
              }`}
          >
            {/* Checkmark */}
            {selectedRole === 'donor' && (
              <div className="absolute top-3 right-3 animate-in fade-in zoom-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-cyan-500 fill-cyan-50" />
              </div>
            )}

            <HeartHandshake className={`w-10 h-10 mb-3 transition-colors duration-300 ${selectedRole === 'donor' ? 'text-cyan-500' : 'text-current'}`} strokeWidth={1.5} />
            <span className={`font-bold text-lg transition-colors duration-300 ${selectedRole === 'donor' ? 'text-slate-800' : 'text-slate-500'}`}>
              Donor
            </span>
          </button>

          {/* OPTION 2: ADMIN */}
          <button
            onClick={() => setSelectedRole('admin')}
            className={`relative p-6 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 h-40
              ${selectedRole === 'admin' 
                ? 'border-slate-800 bg-white shadow-lg ring-2 ring-slate-800/20 scale-105 z-10' 
                : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-md text-slate-400 hover:text-slate-600'
              }`}
          >
            {/* Checkmark */}
            {selectedRole === 'admin' && (
              <div className="absolute top-3 right-3 animate-in fade-in zoom-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-slate-800 fill-slate-100" />
              </div>
            )}

            <Building2 className={`w-10 h-10 mb-3 transition-colors duration-300 ${selectedRole === 'admin' ? 'text-slate-800' : 'text-current'}`} strokeWidth={1.5} />
            <span className={`font-bold text-lg transition-colors duration-300 ${selectedRole === 'admin' ? 'text-slate-800' : 'text-slate-500'}`}>
              Orphanage
            </span>
          </button>

        </div>

        {/* ACTION AREA */}
        <div className="mt-8">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full flex items-center justify-center py-3.5 rounded-xl font-bold text-base transition-all duration-300
              ${selectedRole 
                ? 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/25 translate-y-0' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
          >
            Continue
            <ArrowRight className={`ml-2 w-4 h-4 transition-transform duration-300 ${selectedRole ? 'translate-x-1' : ''}`} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default RoleSelection;