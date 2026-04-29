import { Receipt } from "lucide-react";

const fmt = (n) =>
  `$${(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const Row = ({ label, value, className }) => (
  <div className="flex items-center justify-between">
    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">{label}</span>
    <span className={`text-sm font-bold ${className}`}>{value}</span>
  </div>
);

export default function EarningMobileCards({ rows }) {
  if (!rows.length)
    return (
      <div className="rounded-2xl border border-slate-100 bg-white py-20 text-center md:hidden">
        <p className="text-xs font-black tracking-widest text-slate-300 uppercase">No Earnings Data Found</p>
      </div>
    );

  return (
    <div className="space-y-4 md:hidden">
      {rows.map((row) => (
        <div key={row.monthKey} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
              <Receipt size={16} className="text-indigo-500" />
            </div>
            <h3 className="text-sm font-black text-slate-900">{row.label}</h3>
          </div>
          <div className="space-y-3">
            <Row label="Gross Invoiced" value={fmt(row.gross)} className="text-slate-700" />
            <Row label="Commission" value={`-${fmt(row.commission)}`} className="text-orange-500" />
            <Row label="Expenses" value={`-${fmt(row.expenses)}`} className="text-red-500" />
            <div className="flex items-center justify-between border-t border-slate-50 pt-3">
              <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Net Earning</span>
              <span className={`text-base font-black ${row.net >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                {fmt(row.net)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
