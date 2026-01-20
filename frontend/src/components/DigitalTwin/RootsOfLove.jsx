import React from "react";

/* ---------- SMALL UI BLOCKS ---------- */

const StatCard = ({ label, value, sub, icon }) => (
  <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[#3cc9e1]/40 to-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
    <div className="bg-white rounded-2xl p-6 h-full flex justify-between items-start">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#3cc9e1] transition-colors">
          {label}
        </p>
        <h3 className="text-2xl font-black text-gray-800 mt-2">
          {value}
        </h3>
        {sub && (
          <p className="text-xs text-[#3cc9e1] mt-1 font-bold">
            {sub}
          </p>
        )}
      </div>
      <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">{icon}</span>
    </div>
  </div>
);

const CareMoment = ({ user, action, time, iconColor }) => (
  <div className="flex items-center gap-4 p-3 hover:bg-[#f8faf9] rounded-xl transition group">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black shadow-sm ${iconColor}`}>
      {user[0]}
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-700">
        <span className="font-black text-gray-800">{user}</span> {action}
      </p>
      <p className="text-[10px] text-gray-400 uppercase mt-0.5 font-bold tracking-wider">{time}</p>
    </div>
  </div>
);

/* ---------- MAIN PAGE ---------- */

const RootsOfLove = () => {
  return (
    <div className="bg-[#f8faf9] font-['Manrope'] min-h-screen pb-20">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 bg-[#3cc9e1] rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black tracking-[0.2em] text-[#3cc9e1] uppercase">
            Active Digital Twin · #RW-7721
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-800 tracking-tight">
              Roots of Love
              <span className="block text-[#3cc9e1]">
                Digital Twin Dashboard
              </span>
            </h1>
            <p className="text-gray-500 mt-3 max-w-xl text-sm leading-relaxed font-medium">
              Real-time monitoring of your Neem tree's growth and social impact
              at the <span className="font-black text-gray-800">Mumbai Sanctuary</span>.
            </p>
          </div>

          <button className="bg-[#3cc9e1] hover:bg-[#2bb8d0] text-white px-8 py-3.5 rounded-xl text-sm font-black shadow-lg shadow-cyan-100 transition-all active:scale-95 flex items-center gap-2">
            📹 View Live Feed
          </button>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT & CENTER: THE VISUALIZER */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
             
             {/* HOVER ON SYNC */}
             <div className="absolute top-8 left-10 bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-4 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:border-[#3cc9e1]/50 cursor-pointer z-20">
                <p className="text-[9px] text-[#3cc9e1] uppercase font-black tracking-widest mb-1">Environmental Sync</p>
                <p className="text-sm font-black text-gray-800 tracking-tight">Temp: 28°C | Humidity: 64%</p>
             </div>

             {/* Plant Image Area */}
             <div className="flex flex-col items-center py-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#3cc9e1] blur-[80px] rounded-full opacity-20"></div>
                  <img
                    src="https://images.unsplash.com/photo-1616627982003-1c2c3bb6d8f2"
                    alt="Neem Tree"
                    className="w-64 h-64 object-contain relative z-10 hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-10 bg-emerald-50 border border-emerald-100 px-6 py-2.5 rounded-full">
                  <p className="text-emerald-700 text-xs font-black flex items-center gap-2">
                    <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Live Interaction: Grandpa Sharma is nearby
                  </p>
                </div>
             </div>

             {/* HOVER ON MOISTURE */}
             <div className="absolute bottom-8 right-10 bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-4 text-right transition-all duration-300 hover:scale-110 hover:shadow-xl hover:border-[#3cc9e1]/50 cursor-pointer z-20">
                <p className="text-[9px] text-[#3cc9e1] uppercase font-black tracking-widest mb-1">Soil Moisture</p>
                <p className="text-lg font-black text-gray-800">72% <span className="text-[10px] text-emerald-500 font-black">OPTIMAL</span></p>
             </div>
          </div>

          {/* STATS ROW HOVER */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Days of Care" value="128 Days" sub="↗ 5% Consistency" icon="📅" />
            <StatCard label="CO₂ Offset" value="12.5 kg" sub="↗ 1.2kg this month" icon="🌱" />
            <StatCard label="Touchpoints" value="42 Times" sub="High Engagement" icon="🤝" />
          </div>

          {/* PROGRESS BAR */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm transition-all hover:border-[#3cc9e1]/30">
            <div className="flex justify-between items-end mb-4">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400">Growth Milestone: Sapling to Young Tree</h4>
              <span className="text-[#3cc9e1] font-black text-sm">65%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#3cc9e1] to-gray-800 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-black text-gray-400 uppercase">
              <span className="text-[#3cc9e1]">Sprout</span>
              <span className="text-[#3cc9e1]">Sapling</span>
              <span>Young Tree</span>
              <span>Mature</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: FEED & ACTIONS */}
        <div className="lg:col-span-4 space-y-8">
          
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h4 className="font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2 text-gray-800">
              <span className="text-[#3cc9e1]">🕒</span> Wings Updates
            </h4>
            <div className="space-y-2">
              <CareMoment user="Grandpa Sharma" action="watered the Neem tree" time="2h ago" iconColor="bg-[#3cc9e1]" />
              <CareMoment user="Little Aisha" action="read a story today" time="5h ago" iconColor="bg-gray-800" />
              <CareMoment user="Staff" action="seasonal pruning done" time="Yesterday" iconColor="bg-gray-400" />
            </div>
            <button className="w-full mt-6 py-3 text-[10px] font-black uppercase tracking-widest text-[#3cc9e1] hover:bg-[#f0f9fa] rounded-xl transition">
              View All History
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
             <h4 className="font-black text-xs uppercase tracking-widest mb-5 flex items-center gap-2 text-gray-800">
               <span className="text-[#3cc9e1]">📸</span> Memory Gallery
             </h4>
             <div className="grid grid-cols-2 gap-3">
                <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6" className="rounded-2xl h-24 w-full object-cover grayscale hover:grayscale-0 transition duration-500 cursor-pointer" />
                <img src="https://images.unsplash.com/photo-1524594227084-df7fbb68ef9e" className="rounded-2xl h-24 w-full object-cover grayscale hover:grayscale-0 transition duration-500 cursor-pointer" />
                <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e" className="rounded-2xl h-24 w-full object-cover grayscale hover:grayscale-0 transition duration-500 cursor-pointer" />
                <div className="rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-lg font-black text-gray-400 hover:bg-gray-100 transition cursor-pointer">+12</div>
             </div>
          </div>

          {/* NURTURE THE WINGS - EXTRA BOLD FIXED */}
          <div className="rounded-[2rem] p-8 bg-gray-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/5">
            <h4 className="text-2xl font-[900] tracking-tight mb-2">Nurture the Wings</h4>
            <p className="text-sm opacity-70 mb-6 leading-relaxed font-medium">Send encouragement or sponsor organic care for our residents.</p>
            <button className="w-full bg-[#3cc9e1] text-white font-black py-3.5 rounded-xl text-sm hover:bg-[#2bb8d0] transition-colors shadow-lg shadow-cyan-900/40">➤ Send Message</button>
            <button className="w-full bg-white/10 text-white border border-white/20 font-black py-3.5 rounded-xl text-sm mt-3 hover:bg-white/20 transition">Sponsor Growth</button>
          </div>
        </div>
      </div>

      {/* FOOTER TIMELINE HOVER */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
          <h3 className="text-xl font-black flex items-center gap-3 mb-10 text-gray-800 uppercase tracking-widest">
            <span className="h-px w-10 bg-[#3cc9e1]"></span>
            Growth Timeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { date: "Oct 12, 2025", title: "Planting Ceremony", desc: "Your Neem tree was planted by Elder Mohan and the kids." },
              { date: "Dec 15, 2025", title: "First Real Leaf", desc: "Official transition from seed to digital sprout." },
              { date: "Jan 19, 2026", title: "Strong Roots Milestone", desc: "Root system reached stable depth, ensuring growth." }
            ].map((item, i) => (
              <div key={i} className="group bg-white border border-gray-100 p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:border-[#3cc9e1]/30 hover:-translate-y-2 cursor-default">
                <p className="text-[#3cc9e1] text-[10px] font-black uppercase tracking-widest mb-4 group-hover:tracking-[0.2em] transition-all">{item.date}</p>
                <h5 className="font-black text-gray-800 text-lg mb-2">{item.title}</h5>
                <p className="text-sm text-gray-400 leading-relaxed font-medium italic">“{item.desc}”</p>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default RootsOfLove;
