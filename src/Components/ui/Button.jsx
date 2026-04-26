export default function Button({
  text,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}) {
  const sizeStyles = {
    fit: "",
    sm: "px-5 py-0.5 text-xs",
    md: " px-6 py-1 text-[14px]",
    lg: "px-7 py-1.5 text-lg",
    full: "w-full py-3 text-base",
  };

  const variantStyles = {
    primary: "bg-indigo-800 text-white hover:bg-indigo-900 shadow-sm",
    outline:
      "border border-indigo-300 text-indigo-900 bg-transparent hover:bg-indigo-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent text-indigo-900 hover:bg-slate-100",
  };

  const baseStyles =
    "flex items-center justify-center rounded-lg font-medium transition-all cursor-pointer focus:outline-none disabled:opacity-50 disabled:pointer-events-none font-sans";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {text}
    </button>
  );
}
