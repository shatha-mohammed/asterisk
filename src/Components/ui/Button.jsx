export default function Button({
  text,
  onClick,
  icon,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
}) {
  const sizeStyles = {
    fit: "px-3 py-1 text-xs",
    sm: "px-4 py-2 text-xs",
    md: "px-7 py-3 text-[14px]", 
    lg: "px-9 py-4 text-base",
    full: "w-full py-4 text-base",
  };

  const variantStyles = {
    primary: "bg-[#3525B3] text-white hover:bg-[#2A1D9E] shadow-lg shadow-indigo-100 active:scale-[0.98]",
    
    outline: "border-2 border-indigo-50 text-[#3525B3] bg-transparent hover:bg-indigo-50/50 hover:border-indigo-100",
    
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-100 active:scale-[0.98]",
    
    ghost: "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-[#3525B3]",
    
    white: "bg-white text-[#3525B3] hover:bg-slate-50 shadow-md active:scale-[0.98]",
  };

  const baseStyles =
    "flex items-center justify-center gap-2.5 rounded-2xl font-bold transition-all duration-300 cursor-pointer focus:outline-none disabled:opacity-50 disabled:pointer-events-none tracking-wide";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>}
      <span className="leading-none">{text}</span>
    </button>
  );
}