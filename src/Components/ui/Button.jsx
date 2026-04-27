export default function Button({
  text,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}) {
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-8 py-4 text-sm", 
    lg: "px-10 py-5 text-base",
    full: "w-full py-4 text-sm",
  };

  const variantStyles = {
    // لون أحمد (الانديجو) مع لمستك (الظل والحركة)
    primary: "bg-indigo-800 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-900 hover:scale-[1.02] active:scale-95",
    outline: "border-2 border-indigo-800 text-indigo-800 bg-transparent hover:bg-indigo-50",
    ghost: "bg-slate-50 text-indigo-800 hover:bg-slate-100",
  };

  const baseStyles = "flex items-center justify-center gap-2 rounded-2xl font-bold transition-all duration-200 tracking-wide font-sans cursor-pointer";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {text}
    </button>
  );
}
