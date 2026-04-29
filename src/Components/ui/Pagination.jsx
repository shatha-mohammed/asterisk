import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-8">
      <span className="text-xs font-bold text-slate-400">
        Page {pagination.page} of {pagination.totalPages}
      </span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          icon={<ChevronLeft size={16} />}
          disabled={!pagination.hasPrevPage}
          onClick={() => onPageChange(Math.max(1, pagination.page - 1))}
          className="p-2!"
        />
        <Button
          variant="outline"
          size="sm"
          icon={<ChevronRight size={16} />}
          disabled={!pagination.hasNextPage}
          onClick={() => onPageChange(Math.min(pagination.totalPages, pagination.page + 1))}
          className="p-2!"
        />
      </div>
    </div>
  );
}
