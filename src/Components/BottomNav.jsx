import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Briefcase, Users, BarChart3 } from "lucide-react";

const BottomNav = () => {
  const navItems = [
    { name: 'Home', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase size={20} /> },
    { name: 'Invoices', path: '/invoices', icon: <FileText size={20} /> },
    { name: 'Clients', path: '/clients', icon: <Users size={20} /> },
    { name: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-2 py-2 flex justify-around items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) => `
            flex flex-col items-center gap-1 p-2 rounded-lg transition-all
            ${isActive ? 'text-indigo-600' : 'text-slate-400'}
          `}
        >
          {item.icon}
          <span className="text-[10px] font-bold">{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;