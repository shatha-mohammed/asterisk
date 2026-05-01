import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  Receipt,
  DollarSign,
} from "lucide-react";

const BottomNav = () => {
  const navItems = [
    { name: "Home", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Projects", path: "/projects", icon: <Briefcase size={20} /> },
    { name: "Invoices", path: "/invoices", icon: <FileText size={20} /> },
    { name: "Earnings", path: "/earnings", icon: <DollarSign size={20} /> },
    { name: "Expenses", path: "/expenses", icon: <Receipt size={20} /> },
    { name: "Clients", path: "/clients", icon: <Users size={20} /> },
  ];

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between border-t border-slate-100 bg-white/80 px-1 py-3 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] backdrop-blur-lg sm:px-4 md:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `relative flex flex-1 flex-col items-center justify-center gap-1.5 py-2 transition-all duration-300 ${isActive ? "text-brand-accent" : "text-slate-400 opacity-60"} `
          }
        >
          {({ isActive }) => (
            <>
              <div className="transition-transform duration-300 active:scale-75">
                {item.icon}
              </div>

              <span className="max-w-[100%] truncate text-[8px] leading-none font-black tracking-wider uppercase sm:text-[9px]">
                {item.name}
              </span>

              <div
                className={`bg-brand-accent absolute -bottom-1 h-1 w-4 transform rounded-full transition-all duration-500 ${isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
