export default function Select({ label, children, className = "", ...props }) {
  return (
    <div>
      {label && (
        <label className="text-muted mb-1 block text-sm font-medium">
          {label}
        </label>
      )}

      <select
        className={`w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
