import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Briefcase, Users, Receipt } from "lucide-react"; 

const BottomNav = () => {
  const navItems = [
    { name: 'Home', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', path: '/add-project', icon: <Briefcase size={20} /> }, 
    { name: 'Invoices', path: '/invoices', icon: <FileText size={20} /> },
    { name: 'Expenses', path: '/expenses', icon: <Receipt size={20} /> }, 
    { name: 'Clients', path: '/clients', icon: <Users size={20} /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 px-2 py-3 pb-6 flex justify-around items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) => `
            relative flex flex-col items-center gap-1.5 px-3 py-2 transition-all duration-300
            ${isActive ? 'text-brand-accent' : 'text-slate-400 opacity-60'}
          `}
        >
          <div className="transition-transform duration-300 active:scale-75">
            {item.icon}
          </div>

          <span className="text-[9px] font-black uppercase tracking-widest leading-none">
            {item.name}
          </span>

          {({ isActive }) => (
             <div className={`absolute -bottom-1 w-4 h-1 bg-brand-accent rounded-full transition-all duration-500 transform ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;