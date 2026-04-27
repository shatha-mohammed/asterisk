export default function StatCard({ title, value, trend, icon, isRed }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-indigo-100 transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600 transition-colors">
          {icon}
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${isRed ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
          {trend}
        </span>
      </div>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</span>
      <h2 className="text-4xl font-black text-[#1E293B] mt-1">{value}</h2>
    </div>
  );
}