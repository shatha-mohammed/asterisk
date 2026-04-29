export default function FormSection({ icon, title, children }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:p-8">
      {/* Section header */}
      <div className="mb-8 flex items-center gap-3 text-indigo-700">
        {icon && <div className="rounded-xl bg-indigo-50 p-2">{icon}</div>}
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      </div>

      {/* Form fields */}
      {children}
    </div>
  );
}
