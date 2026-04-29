import { Calendar, DollarSign, Clock } from "lucide-react";
import { ActionButtons } from "@/components/ui";

export default function ProjectCard({ project, onEdit, onDelete }) {
  const {
    name = "Untitled Project",
    client = "Client",
    budget = "0.00",
    deadline = "No deadline",
    status = "active",
    updatedAt,
  } = project || {};

  // calculte the day
  const getDaysAgo = (dateString) => {
    if (!dateString) return "Updated recently";
    const diffTime = Math.abs(new Date() - new Date(dateString));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Updated today";
    return `Last active ${diffDays}d ago`;
  };

  return (
    <div className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-indigo-100/10 transition-all hover:border-indigo-100 hover:shadow-md">
      {/* Name and Action */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-[#3525B3] transition-colors duration-300 group-hover:bg-[#3525B3] group-hover:text-white">
            <span className="text-lg font-black uppercase">
              {name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg leading-tight font-bold text-slate-800 transition-colors group-hover:text-[#3525B3]">
              {name}
            </h3>
            <p className="mt-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
              {client}
            </p>
          </div>
        </div>
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-slate-50 p-2 text-slate-400">
            <DollarSign size={14} />
          </div>
          <div>
            <p className="text-[10px] font-black tracking-widest text-slate-300 uppercase">
              Budget
            </p>
            <p className="text-sm font-bold text-slate-700">
              $
              {budget.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-slate-50 p-2 text-slate-400">
            <Calendar size={14} />
          </div>
          <div>
            <p className="text-[10px] font-black tracking-widest text-slate-300 uppercase">
              Deadline
            </p>
            <p className="text-sm font-bold text-slate-700">{deadline}</p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between border-t border-slate-50 pt-5">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          <Clock size={14} />
          <span>{getDaysAgo(updatedAt)}</span>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase ${
            status === "active"
              ? "bg-emerald-50 text-emerald-600"
              : status === "done"
                ? "bg-blue-50 text-blue-600"
                : "bg-amber-50 text-amber-600"
          }`}
        >
          {status === "done" ? "completed" : status}
        </span>
      </div>
    </div>
  );
}
