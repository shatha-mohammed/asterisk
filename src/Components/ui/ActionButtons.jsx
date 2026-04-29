import { Pencil, Trash2 } from "lucide-react";
import Button from "./Button";

export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="ghost"
        size="fit"
        icon={<Pencil size={16} />}
        onClick={(e) => {
          e.stopPropagation();
          onEdit && onEdit();
        }}
        className="p-2! text-slate-300! hover:bg-indigo-50! hover:text-indigo-600!"
      />
      <Button
        variant="ghost"
        size="fit"
        icon={<Trash2 size={16} />}
        onClick={(e) => {
          e.stopPropagation();
          onDelete && onDelete();
        }}
        className="p-2! text-slate-300! hover:bg-red-50! hover:text-red-600!"
      />
    </div>
  );
}
