import { ChevronLeft, ChevronRight } from "lucide-react";

const fmt = (n) =>
  `$${(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const NavBtn = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-indigo-400 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30"
  >
    {children}
  </button>
);

export default function EarningTable({ rows, page, totalPages, setPage }) {
  return (
    <div className="hidden overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-4 shadow-sm md:block lg:p-10">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-muted border-b border-slate-50 text-[10px] font-black tracking-[0.2em] uppercase">
              {["Month", "Gross Invoiced", "Commission", "Expenses", "Net Earning"].map((h, i) => (
                <th key={h} className={`px-4 py-6 ${i > 0 ? "text-right" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row.monthKey} className="group transition-colors hover:bg-slate-50/50">
                  <td className="px-4 py-7 text-sm font-black text-slate-800">{row.label}</td>
                  <td className="px-4 py-7 text-right text-sm font-bold text-slate-500">{fmt(row.gross)}</td>
                  <td className="px-4 py-7 text-right text-sm font-bold text-orange-500">-{fmt(row.commission)}</td>
                  <td className="px-4 py-7 text-right text-sm font-bold text-red-500">-{fmt(row.expenses)}</td>
                  <td className={`px-4 py-7 text-right text-base font-black ${row.net >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {fmt(row.net)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-20 text-center text-xs font-black tracking-widest text-slate-300 uppercase">
                  No Earnings Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-8">
          <span className="text-xs font-bold text-slate-400">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <NavBtn disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              <ChevronLeft size={16} />
            </NavBtn>
            <NavBtn disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
              <ChevronRight size={16} />
            </NavBtn>
          </div>
        </div>
      )}
    </div>
  );
}
