import { X } from "lucide-react";
import { useEffect } from "react";
import Button from "./Button";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm duration-200"
      onClick={onClose}
    >
      <div
        className="animate-in zoom-in-95 w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl duration-200 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-800">{title}</h2>
          <Button
            variant="ghost"
            size="fit"
            icon={<X size={20} />}
            onClick={onClose}
            className="!rounded-full !bg-slate-50 !p-2 !text-slate-400 hover:!bg-slate-100 hover:!text-slate-600"
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
