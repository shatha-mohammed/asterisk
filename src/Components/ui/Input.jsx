import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "./Button";
export default function Input({ label, type = "text", ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <div className="mb-1 flex items-end justify-between">
        {label && (
          <label className="text-muted block text-sm font-medium">
            {label}
          </label>
        )}
      </div>

      <div className="relative">
        <input
          type={inputType}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none"
          {...props}
        />

        {isPassword && (
          <Button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            variant="ghost"
            text={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          />
        )}
      </div>
    </div>
  );
}
