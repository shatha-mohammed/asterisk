// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Briefcase, 
//   FileText, 
//   Users, 
//   BarChart3, 
//   Settings, 
//   LogOut,
//   PlusCircle 
// } from 'lucide-react';

// const Sidebar = () => {
//   const location = useLocation();

//   const navItems = [
//     { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
//     { name: 'Projects', path: '/projects', icon: <Briefcase size={20} /> },
//     { name: 'Invoices', path: '/invoices', icon: <FileText size={20} /> },
//     { name: 'Clients', path: '/clients', icon: <Users size={20} /> },
//     { name: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> },
//   ];

//   return (
//     <div className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col p-6 sticky top-0">
//       <div className="mb-10 px-2">
//       <h1 className="text-[#2D3184] text-xl font-extrabold uppercase">Asterisk</h1>        <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase mt-1">Agency Pro</p>
//       </div>

//       <nav className="flex-1 space-y-2">
//         {navItems.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <Link
//               key={item.name}
//               to={item.path}
//               className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
//                 isActive 
//                 ? 'bg-indigo-50 text-indigo-600' 
//                 : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
//               }`}
//             >
//               {item.icon}
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="mt-auto space-y-6">
//         <button className="w-full bg-[#2D3184] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-900 flex items-center justify-center gap-2 transition-all active:scale-95">
//           <PlusCircle size={18} />
//           Create New
//         </button>

//         <div className="pt-6 border-t border-slate-50 space-y-1">
//           <button className="w-full flex items-center gap-4 px-4 py-2 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">
//             <Settings size={18} /> Settings
//           </button>
//           <button className="w-full flex items-center gap-4 px-4 py-2 text-slate-400 font-bold text-sm hover:text-red-500 transition-colors">
//             <LogOut size={18} /> Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;