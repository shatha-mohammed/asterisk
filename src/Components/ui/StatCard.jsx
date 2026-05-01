export default function StatCard({ title, value, trend, icon, isRed }) {
  return (
    <div className="group min-w-0 rounded-3xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:border-indigo-100 sm:rounded-[2.5rem] sm:p-6 md:p-8">
      <div className="mb-4 flex items-start justify-between sm:mb-6">
        <div className="rounded-xl bg-slate-50 p-2.5 text-slate-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600 sm:rounded-2xl sm:p-3">
          {icon}
        </div>
        {trend && (
          <span
            className={`max-w-[50%] truncate rounded-lg px-2 py-0.5 text-[9px] font-bold sm:px-2.5 sm:py-1 sm:text-[10px] ${isRed ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-600"}`}
          >
            {trend}
          </span>
        )}
      </div>
      <span className="block truncate text-[9px] font-black tracking-widest text-slate-400 uppercase sm:text-[10px]">
        {title}
      </span>
      <h2 className="mt-1 text-sm font-black tracking-tighter wrap-break-word text-[#1E293B] sm:text-xl md:text-2xl lg:text-4xl">
        {value}
      </h2>
    </div>
  );
}
