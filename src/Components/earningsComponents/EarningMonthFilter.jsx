import { Filter } from "lucide-react";

export default function EarningMonthFilter({ value, onChange, options }) {
  return (
    <div className="relative">
      <Filter size={14} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
      <select
        id="earnings-month-filter"
        value={value}
        onChange={onChange}
        className="appearance-none rounded-xl border border-slate-200 bg-white py-3 pr-10 pl-10 text-xs font-bold text-slate-600 focus:border-indigo-400 focus:outline-none"
      >
        <option value="">All Time</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
