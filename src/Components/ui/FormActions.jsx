import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function FormActions({
  submitLabel = "Submit",
  isLoading = false,
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-8 flex items-center justify-between gap-6 border-t border-slate-100 pt-6 md:mt-12 md:justify-end md:pt-8">
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
    </>
  );
}
