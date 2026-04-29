import { User } from "lucide-react";
import { useSelector } from "react-redux";
import { ActionButtons } from "@/components/ui";

export default function InvoicesTable({ invoices, onEdit, onDelete }) {
  const { items: projects } = useSelector((state) => state.projects) || {
    items: [],
  };
  const { items: clients } = useSelector((state) => state.clients) || {
    items: [],
  };

  // Get project name
  function getProjectName(id) {
    projects?.find((p) => p.id === id)?.title || `Project ${id}`;
  }

  // Get client name
  function getClientName(id) {
    clients?.find((c) => c.id === id)?.name || `ID: ${id}`;
  }

  return (
    <div className="space-y-4">
      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {invoices?.length > 0 ? (
          invoices.map((inv) => (
            <div
              key={inv.id}
              className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600">
                    #{inv.invoiceId?.substring(0, 3)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Invoice #{inv.invoiceId}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {getProjectName(inv.projectId)}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-xl px-3 py-1.5 text-[9px] font-black tracking-widest uppercase ${
                    inv.status === "paid"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {inv.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-slate-50 pt-3">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Due Date
                  </p>
                  <p className="text-xs font-medium text-slate-600">
                    {new Date(inv.dueDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Amount
                  </p>
                  <p className="text-xs font-bold text-slate-800">
                    ${inv.amount?.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  <User size={14} />
                  <span className="max-w-30 truncate">
                    {getClientName(inv.clientId)}
                  </span>
                </div>
                <ActionButtons
                  onEdit={() => onEdit && onEdit(inv.id)}
                  onDelete={() => onDelete && onDelete(inv.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              No Invoices Found
            </p>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm md:block">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr className="text-muted border-b border-slate-100 text-[10px] font-black tracking-[0.2em] uppercase">
              <th className="px-6 py-6">Invoice</th>
              <th className="px-6 py-6">Project</th>
              <th className="px-6 py-6">Due Date</th>
              <th className="px-6 py-6 text-right">Amount</th>
              <th className="px-6 py-6 text-center">Status</th>
              <th className="px-6 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {invoices?.length > 0 ? (
              invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="group transition-all hover:bg-slate-50/50"
                >
                  <td className="text-brand-accent px-6 py-6 text-sm font-black">
                    #{inv.invoiceId}
                  </td>
                  <td className="px-6 py-6">
                    <p className="mb-1 text-sm font-black tracking-tight text-[#1E293B]">
                      {getProjectName(inv.projectId)}
                    </p>
                    <p className="text-muted text-[10px] font-bold uppercase opacity-50">
                      {getClientName(inv.clientId)}
                    </p>
                  </td>
                  <td className="px-6 py-6 text-xs font-black tracking-widest text-slate-500 uppercase">
                    {new Date(inv.dueDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-6 py-6 text-right text-base font-black text-[#1E293B]">
                    $
                    {inv.amount?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span
                      className={`rounded-xl px-5 py-2 text-[9px] font-black tracking-widest uppercase ${
                        inv.status === "paid"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <ActionButtons
                      onEdit={() => onEdit && onEdit(inv.id)}
                      onDelete={() => onDelete && onDelete(inv.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-20 text-center text-xs font-black tracking-widest text-slate-300 uppercase"
                >
                  No Invoices Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
