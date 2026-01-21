import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Loader2, AlertCircle, RefreshCw, Sprout, ArrowLeft, Heart } from "lucide-react";
import { getUserPlants } from "../../api/roots.js";
import { Link } from "react-router-dom";
import DigitalTree from "./DigitalTree.jsx";

/* --- ASSETS FOR LEVELS --- */


/* --- SUB COMPONENTS --- */
const StatCard = ({ label, value, sub, icon }) => (
  <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[#3cc9e1]/40 to-gray-200 shadow-sm hover:shadow-md transition-all">
    <div className="bg-white rounded-2xl p-6 h-full flex justify-between items-start">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
        <h3 className="text-2xl font-black text-gray-800 mt-2">{value}</h3>
        {sub && <p className="text-xs text-[#3cc9e1] mt-1 font-bold">{sub}</p>}
      </div>
      <span className="text-2xl opacity-50">{icon}</span>
    </div>
  </div>
);

const CareMoment = ({ user, action, time, iconColor }) => (
  <div className="flex items-center gap-4 p-3 hover:bg-[#f8faf9] rounded-xl transition border-b border-gray-50 last:border-0">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black shadow-sm ${iconColor} shrink-0`}>
      {user ? user[0].toUpperCase() : "S"}
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-700 leading-tight">
        <span className="font-black text-gray-800">{user}</span> {action}
      </p>
      <p className="text-[10px] text-gray-400 uppercase mt-1 font-bold tracking-wider">{time}</p>
    </div>
  </div>
);

const RootsOfLove = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userPlants, setUserPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null); // For Detail View
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!isLoaded || !isSignedIn || !user) return;
    setLoading(true);
    setError(null);
    try {
      const plants = await getUserPlants(user.id);
      setUserPlants(plants || []);

      // If user has only 1 plant, auto-select it
      if (plants && plants.length === 1) {
        setSelectedPlant(plants[0]);
      }
    } catch (err) {
      setError(err.message || "Failed to load your garden");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#3cc9e1]" /></div>;
  if (!isSignedIn) return <div className="h-screen flex items-center justify-center font-bold text-slate-500">Please sign in.</div>;

  // --- ERROR STATE ---
  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-red-500 flex items-center gap-2 font-bold"><AlertCircle /> {error}</div>
        <button onClick={fetchData} className="px-4 py-2 bg-[#3cc9e1] text-white rounded-lg font-bold flex items-center gap-2">
          <RefreshCw size={16} /> Retry
        </button>
      </div>
    );
  }

  // --- LOADING STATE ---
  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#3cc9e1]" /></div>;

  // --- EMPTY STATE (No Plants) ---
  if (userPlants.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#f8fafc] p-6 text-center">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 max-w-md w-full">
          <Sprout size={64} className="text-[#3cc9e1] mx-auto mb-6" />
          <h2 className="text-2xl font-black text-slate-800 mb-2">No Roots Found</h2>
          <p className="text-slate-500 mb-8 font-medium">You haven't adopted a plant yet. Start your journey today!</p>
          <Link to="/adopt" className="block w-full bg-[#3cc9e1] hover:bg-[#35b5cc] text-white py-4 rounded-xl font-bold transition shadow-lg shadow-cyan-100">
            Browse Adoption Gallery
          </Link>
        </div>
      </div>
    );
  }

  // --- MY GARDEN VIEW (Multiple Plants, None Selected) ---
  if (userPlants.length > 1 && !selectedPlant) {
    return (
      <div className="mt-15 min-h-screen bg-[#f8fafc] p-8 font-['Manrope']">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-black text-slate-800 mb-2">My Garden 🌿</h1>
              <p className="text-slate-500 font-medium">Your growing family of trees.</p>
            </div>
            <Link to="/adopt" className="bg-white text-[#3cc9e1] border border-[#3cc9e1] px-5 py-3 rounded-xl font-bold hover:bg-[#f0f9fa] transition flex items-center gap-2">
              <Heart size={18} /> Adopt Another
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userPlants.map((plant) => (
              <div
                key={plant._id}
                onClick={() => setSelectedPlant(plant)}
                className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="h-48 bg-emerald-50 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden group-hover:bg-emerald-100 transition-colors">
                  <div className="w-32 h-32 transform group-hover:scale-110 transition-transform duration-500">
                    <DigitalTree level={plant.level} actionType={'idle'} />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black text-emerald-600 shadow-sm">
                    LVL {plant.level}
                  </div>
                </div>
                <h3 className="font-black text-xl text-slate-800">{plant.name}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{plant.species}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#3cc9e1]">
                  <span className="w-2 h-2 rounded-full bg-[#3cc9e1] animate-pulse"></span>
                  Live Connection
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- DETAIL VIEW (Digital Twin) ---
  const plant = selectedPlant;

  return (
    <div className="bg-[#f8faf9] font-['Manrope'] min-h-screen pb-20 mt-15">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 bg-[#3cc9e1] rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black tracking-[0.2em] text-[#3cc9e1] uppercase">
                Live Connection · ID #{plant._id.slice(-6)}
              </span>
            </div>
            <h1 className="text-4xl font-black text-gray-800 tracking-tight">
              Roots of Love <span className="block text-[#3cc9e1]">Digital Twin Dashboard</span>
            </h1>
            <p className="text-gray-500 mt-3 max-w-xl text-sm font-medium">
              Monitoring <span className="font-black text-gray-800">{plant.name}</span>.
              Current Stage: <span className="text-[#3cc9e1] font-bold">Level {plant.level}</span>
            </p>
          </div>

          <div className="flex gap-3">
            {userPlants.length > 1 && (
              <button
                onClick={() => setSelectedPlant(null)}
                className="bg-white border border-slate-200 text-slate-600 px-4 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition shadow-sm"
              >
                <ArrowLeft size={18} /> Back to Garden
              </button>
            )}
            <Link to="/adopt" className="bg-[#3cc9e1] text-white px-5 py-3 rounded-xl font-bold hover:bg-[#35b5cc] transition shadow-lg shadow-cyan-100 flex items-center gap-2">
              <Heart size={18} /> Adopt More
            </Link>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Visualizer */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden text-center group h-[500px] flex flex-col items-center justify-center">
            <DigitalTree
              level={plant.level}
              actionType={plant.updates[0]?.actionType || 'idle'}
            />
            <div className="mt-8 bg-emerald-50 border border-emerald-100 px-6 py-2.5 rounded-full inline-flex mx-auto absolute bottom-10 z-20">
              <p className="text-emerald-700 text-xs font-black flex items-center gap-2">
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Status: {plant.health}% Health (Thriving)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Total Updates" value={plant.updates.length} sub="Since Planting" icon="📸" />
            <StatCard label="Current Stage" value={`Lvl ${plant.level}`} sub={plant.level < 4 ? "Growing..." : "Max Growth"} icon="🌱" />
            <StatCard
              label="Caretaker"
              value={plant.caretaker ? plant.caretaker.split(" ")[0] : "Staff"}
              sub="Orphanage Team"
              icon="🤝"
            />
          </div>
        </div>

        {/* Right Updates */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm max-h-[600px] overflow-y-auto custom-scrollbar">
            <h4 className="font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2 text-gray-800 sticky top-0 bg-white pb-2">
              <span className="text-[#3cc9e1]">🕒</span> Live Updates
            </h4>
            <div className="space-y-4">
              {plant.updates.length > 0 ? (
                plant.updates
                  .filter(update => update.message !== "Adopted by a new loving parent!") // Remove system message
                  .map((update, idx) => (
                    <CareMoment
                      key={idx}
                      user={update.adminName || (plant.caretaker ? plant.caretaker.split(" ")[0] : "Orphanage")}
                      action={update.message}
                      time={new Date(update.date).toLocaleDateString()}
                      iconColor={idx === 0 ? "bg-[#3cc9e1]" : "bg-gray-300"}
                    />
                  ))
              ) : (
                <p className="text-sm text-gray-400 italic text-center py-10">Awaiting first update.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootsOfLove;