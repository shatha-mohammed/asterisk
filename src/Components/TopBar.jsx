 
import React from 'react';
import { useSelector } from 'react-redux'; 
import { Search, Bell, HelpCircle } from 'lucide-react';

export default function TopBar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30 w-full" dir="ltr">
      
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <Search 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" 
            size={18} 
          />
          <input 
            type="text" 
            placeholder="Search projects, clients, or invoices..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-12 pr-4 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all text-sm text-slate-600 font-sans"
          />
        </div>
      </div>

      {/* 2. قسم الأدوات والبروفايل */}
      <div className="flex items-center gap-2">
        
        <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
          <HelpCircle size={20} />
        </button>

        <div className="w-[1px] h-8 bg-slate-100 mx-3"></div>

        {/*  عرض اسم وصورة اليوزر اللي مسجل دخول فعلياً */}
        <div className="flex items-center gap-3 cursor-pointer group pl-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border-2 border-white overflow-hidden group-hover:ring-2 group-hover:ring-indigo-100 transition-all shadow-sm">
            <img 
              src={user?.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#1E293B] group-hover:text-indigo-600 transition-colors font-sans">
              {user?.name || "User Name"} 
            </span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
              {user?.role || "Admin"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}