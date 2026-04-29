import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function FormHeader({ title, subtitle }) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 border-b border-slate-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-6 md:py-8">
        {/* Back button */}
        <Button
          icon={<ChevronLeft size={24} />}
          variant="ghost"
          size="fit"
          onClick={() => navigate(-1)}
          className="rounded-2xl! p-2.5! text-slate-600! hover:bg-slate-50!"
        />

        <div>
          {/* Form page title */}
          <h1 className="text-xl font-black tracking-tight text-indigo-900 md:text-3xl">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase md:text-xs">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
