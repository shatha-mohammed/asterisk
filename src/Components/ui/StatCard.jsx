export default function StatCard({ title, value, trend, icon, isRed }) {
  return (
    <div className="group rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm transition-all hover:border-indigo-100">
      <div className="mb-6 flex items-start justify-between">
        <div className="rounded-2xl bg-slate-50 p-3 text-slate-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
          {icon}
        </div>
        {trend && (
          <span
            className={`rounded-lg px-2.5 py-1 text-[10px] font-bold ${isRed ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-600"}`}
          >
            {trend}
          </span>
        )}
      </div>
      <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
        {title}
      </span>
      <h2 className="mt-1 text-4xl font-black text-[#1E293B]">{value}</h2>
    </div>
  );
}
