import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice'; 
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  PlusCircle 
} from 'lucide-react';
import Button from "./ui/Button";
const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth); 
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase size={20} /> },
    { name: 'Invoices', path: '/invoices', icon: <FileText size={20} /> },
    { name: 'Clients', path: '/clients', icon: <Users size={20} /> },
    { name: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col p-6 sticky top-0">
      {/* عرض بيانات المستخدم إذا كان مسجلاً [cite: 4] */}
      {user && (
        <div className="mb-10 px-2 flex items-center gap-3">
          <img src={user.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="text-sm font-bold text-slate-800">{user.name}</h2>
            <p className="text-[10px] text-slate-400">Admin Account</p>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all
              ${isActive 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}
            `}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-6">
       <Button 
  text={
    <div className="flex items-center justify-center gap-2">
      <PlusCircle size={18} />
      Create New
    </div>
  }
  variant="primary"
  size="full" 
  className="rounded-xl shadow-lg" 
  onClick={() => console.log("Create New Clicked")}
/>

        <div className="pt-6 border-t border-slate-50 space-y-1">
          <button className="w-full flex items-center gap-4 px-4 py-2 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">
            <Settings size={18} /> Settings
          </button>
          {/* تفعيل زر الخروج باستخدام الديسباتش [cite: 4] */}
          <button 
            onClick={() => dispatch(logout())}
            className="w-full flex items-center gap-4 px-4 py-2 text-slate-400 font-bold text-sm hover:text-red-500 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;