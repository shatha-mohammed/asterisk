import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice'; 
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Receipt, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  PlusCircle 
} from 'lucide-react';
import Button from "./ui/Button";
import Logo from './ui/Logo';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth); 

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', path: '/add-project', icon: <Briefcase size={20} /> }, 
    { name: 'Invoices', path: '/invoices', icon: <FileText size={20} /> },
    { name: 'Clients', path: '/clients', icon: <Users size={20} /> },
    { name: 'Expenses', path: '/expenses', icon: <Receipt size={20} /> }, 
  ];

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col p-8 sticky top-0">
      
      <div className="mb-12 px-2">
        <Logo />
      </div>

      {user && (
        <div className="mb-10 px-2 flex items-center gap-4 bg-slate-50/50 p-4 rounded-[1.5rem] border border-slate-50">
          <img src={user.avatarUrl} alt="Avatar" className="w-11 h-11 rounded-2xl object-cover shadow-sm" />
          <div className="overflow-hidden">
            <h2 className="text-sm font-black text-slate-800 truncate">{user.name}</h2>
            <p className="text-[10px] text-muted font-bold uppercase tracking-wider opacity-60">Admin Account</p>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all duration-300
              ${isActive 
                ? 'bg-indigo-50 text-brand-accent shadow-sm shadow-indigo-100/20' 
                : 'text-muted hover:bg-slate-50 hover:text-brand-accent opacity-70 hover:opacity-100'}
            `}
          >
            <span className="transition-transform duration-300">{item.icon}</span>
            <span className="tracking-tight">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-6">
        <Button 
          text="Create New"
          icon={<PlusCircle size={20} />}
          variant="primary"
          size="full" 
          className="rounded-2xl shadow-xl shadow-indigo-100" 
          onClick={() => console.log("Create New Clicked")}
        />

        <div className="pt-6 border-t border-slate-50 space-y-1">
          <NavLink 
            to="/settings"
            className={({ isActive }) => `
              w-full flex items-center gap-4 px-5 py-3 rounded-xl font-bold text-sm transition-all
              ${isActive ? 'text-brand-accent bg-slate-50' : 'text-muted opacity-60 hover:opacity-100 hover:text-slate-800'}
            `}
          >
            <Settings size={18} /> Settings
          </NavLink>
          
        <Button 
  text="Logout"
  icon={<LogOut size={18} />}
  variant="ghost"
  size="full"
  onClick={() => dispatch(logout())}
  className="justify-start gap-4 px-5 py-3 text-muted font-bold text-sm hover:text-red-500 opacity-60 hover:opacity-100 transition-all border-none" 
/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
