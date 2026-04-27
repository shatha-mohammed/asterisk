import React from 'react';
import { useSelector } from 'react-redux'; 
import { Search, Bell, HelpCircle } from 'lucide-react';

export default function TopBar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-50 flex items-center justify-between px-10 sticky top-0 z-40 w-full" dir="ltr">
      
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search 
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-accent transition-colors" 
            size={18} 
          />
          <input 
            type="text" 
            placeholder="Search projects, invoices..." 
            className="w-full bg-slate-50/50 border border-transparent rounded-[1.2rem] py-3 pl-14 pr-6 outline-none focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50/50 transition-all text-sm text-slate-600 font-bold tracking-tight"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        
        <div className="flex items-center gap-1">
          <button className="relative p-3 text-slate-400 hover:bg-slate-50 rounded-2xl transition-all hover:text-brand-accent">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>

          <button className="p-3 text-slate-400 hover:bg-slate-50 rounded-2xl transition-all hover:text-brand-accent">
            <HelpCircle size={20} />
          </button>
        </div>

        <div className="w-[1px] h-10 bg-slate-100 mx-2"></div>

        <div className="flex items-center gap-4 pl-2 group cursor-pointer p-1.5 rounded-2xl hover:bg-slate-50/80 transition-all">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-black text-[#1E293B] tracking-tight group-hover:text-brand-accent transition-colors leading-none mb-1">
              {user?.name || "Designer Name"} 
            </span>
            <span className="text-[9px] font-black text-muted opacity-50 uppercase tracking-[0.15em]">
              {user?.role || "Free Agent"}
            </span>
          </div>
          
          <div className="relative">
            <div className="w-12 h-12 rounded-[1.1rem] bg-indigo-50 border-2 border-white overflow-hidden shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
              <img 
                src={user?.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
}