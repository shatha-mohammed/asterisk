import Button from "./Button";

export default function EmptyState({
  message = "No data found",
  actionLabel,
  onAction,
}) {
  return (
    <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-white p-20 text-center">
      {/* Main empty message */}
      <p className="mb-4 text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">
        {message}
      </p>

      {/* Optional action button — e.g. "Add your first client" */}
      {actionLabel && onAction && (
        <div className="flex justify-center">
          <Button
            text={actionLabel}
            variant="outline"
            size="sm"
            onClick={onAction}
          />
        </div>
      )}
    </div>
  );
}
