export default function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#e8e4db] shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <span className="material-symbols-outlined text-[#3cc9e1]">{icon}</span>
        <span className="text-[10px] font-bold text-[#7d6e63]/60 uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-2xl font-black text-[#7d6e63] tracking-tight">{value}</p>
    </div>
  );
};