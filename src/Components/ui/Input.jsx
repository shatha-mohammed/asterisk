import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "./Button";
<<<<<<< HEAD
export default function Input({ label, type = "text", sign, ...props }) {
=======
export default function Input({ label, type = "text", ...props }) {
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <div className="mb-1 flex items-end justify-between">
        {label && (
<<<<<<< HEAD
          <label htmlFor={props.id || props.name} className="text-muted block text-sm font-medium">
=======
          <label className="text-muted block text-sm font-medium">
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
            {label}
          </label>
        )}
      </div>

      <div className="relative">
        <input
<<<<<<< HEAD
          id={props.id || props.name}
          type={inputType}
          className={`${sign && "pl-8"} w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none`}
          {...props}
        />

        {sign && (
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {sign}
          </span>
        )}

=======
          type={inputType}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none"
          {...props}
        />

>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
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
