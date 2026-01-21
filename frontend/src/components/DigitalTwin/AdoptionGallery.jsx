import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { Sprout, Heart, Loader2 } from 'lucide-react';
import { getAvailablePlants, adoptPlant } from '../../api/roots.js';
import { useNavigate } from 'react-router-dom';

export default function AdoptionGallery() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adoptingId, setAdoptingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    try {
      const data = await getAvailablePlants();
      setPlants(data);
    } finally {
      setLoading(false);
    }
  };

  const handleAdopt = async (plantId) => {
    if (!isLoaded || !isSignedIn) {
      alert("Please sign in to adopt a plant!");
      return;
    }
    
    setAdoptingId(plantId);
    try {
      // FIX: Get name and pass it to API
      const userName = user.firstName || user.fullName || "Green Hero";
      
      await adoptPlant(plantId, user.id, userName);
      
      alert("🎉 Adoption Successful! Redirecting to your dashboard...");
      navigate('/roots-love'); 
    } catch (err) {
      console.error(err);
      alert("Adoption failed: " + err.message);
    } finally {
      setAdoptingId(null);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#3cc9e1]" /></div>;

  return (
    <div className="mt-20 p-8 max-w-7xl mx-auto bg-[#f8fafc] min-h-screen font-['Manrope']">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-slate-800 mb-2">Adopt a Green Friend 🌱</h1>
        <p className="text-slate-500 font-medium">Choose a sapling to support. Watch it grow as we care for it.</p>
      </div>
      
      {plants.length === 0 ? (
        <div className="text-center text-slate-400 py-20 bg-white rounded-3xl border border-slate-100">
          <Sprout size={48} className="mx-auto mb-4 opacity-50" />
          <p className="font-bold">No plants available for adoption right now.</p>
          <p className="text-sm">Check back later or visit the dashboard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plants.map((plant) => (
            <div key={plant._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              
              {/* Image Area */}
              <div className="h-56 bg-emerald-50 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden group-hover:bg-emerald-100 transition-colors">
                 {plant.image ? (
                   <img src={plant.image} alt={plant.name} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"/>
                 ) : (
                   <Sprout size={64} className="text-emerald-300 drop-shadow-sm" />
                 )}
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black text-emerald-600 shadow-sm border border-emerald-100">
                   ₹{plant.price}
                 </div>
              </div>
              
              {/* Content */}
              <div className="space-y-2 mb-6">
                <h3 className="font-black text-xl text-slate-800">{plant.name}</h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">{plant.species}</p>
              </div>
              
              {/* Action */}
              <button 
                onClick={() => handleAdopt(plant._id)}
                disabled={adoptingId === plant._id}
                className="w-full py-3.5 bg-[#3cc9e1] hover:bg-[#35b5cc] text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-100 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {adoptingId === plant._id ? <Loader2 className="animate-spin" size={18} /> : <Heart size={18} className="fill-white" />} 
                {adoptingId === plant._id ? "Adopting..." : "Adopt Now"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}