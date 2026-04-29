import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function FormActions({
  submitLabel = "Submit",
  isLoading = false,
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-8 hidden items-center justify-end gap-6 border-t border-slate-100 pt-6 md:mt-12 md:flex md:pt-8">
        <Button
          text="Cancel"
          variant="ghost"
          size="md"
          onClick={() => navigate(-1)}
        />
        <Button
          text={isLoading ? "Saving..." : submitLabel}
          variant="primary"
          size="md"
          type="submit"
          disabled={isLoading}
        />
      </div>

      <div className="fixed right-0 bottom-0 left-0 z-20 flex gap-3 border-t border-slate-100 bg-white p-4 md:hidden">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          size="md"
          text="Cancel"
          className="flex-1"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          text={isLoading ? "Saving..." : submitLabel}
          disabled={isLoading}
          className="flex-2"
        />
      </div>
    </>
  );
}
