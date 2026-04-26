// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom'; 
// import { 
//   Menu, X, Bell, Search, Download, HelpCircle, Settings, LogOut,
//   ArrowUpRight, ArrowDownRight, Briefcase, DollarSign, Clock, AlertTriangle,
//   LayoutDashboard, FileText, BarChart3, Users 
// } from 'lucide-react';
// import Sidebar from "../components/Sidebar";

// const Reports = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] pb-24 lg:pb-10" dir="ltr">
      

//       {/* شريط التنقل السفلي الموحد لصفحة الريبورت */}
// <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around items-center p-2 pb-6 z-50 shadow-[0_-5px_25px_rgba(0,0,0,0.05)]">
  
//   <NavLink to="/dashboard" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? "text-[#2D3184]" : "text-slate-300"}`}>
//     <LayoutDashboard size={20} />
//     <span className="text-[8px] font-black uppercase">HOME</span>
//   </NavLink>
  
//   <NavLink to="/projects" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? "text-[#2D3184]" : "text-slate-300"}`}>
//     <Briefcase size={20} />
//     <span className="text-[8px] font-black uppercase">PROJECTS</span>
//   </NavLink>
  
//   <NavLink to="/clients" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? "text-[#2D3184]" : "text-slate-300"}`}>
//     <Users size={20} />
//     <span className="text-[8px] font-black uppercase">CLIENTS</span>
//   </NavLink>
  
//   <NavLink to="/reports" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? "text-[#2D3184]" : "text-slate-300"}`}>
//     <BarChart3 size={20} />
//     <span className="text-[8px] font-black uppercase">REPORTS</span>
//   </NavLink>
  
//   <NavLink to="/invoices" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? "text-[#2D3184]" : "text-slate-300"}`}>
//     <FileText size={20} />
//     <span className="text-[8px] font-black uppercase">INVOICES</span>
//   </NavLink>

// </div>

      

//       {/* 3. هيدر الموبايل البسيط */}
//       <header className="lg:hidden bg-white p-4 flex justify-between items-center border-b border-slate-100 sticky top-0 z-20">
//         <div className="flex items-center gap-3">
//           <h1 className="text-[#2D3184] font-bold text-lg ms-4">Asterisk</h1>
//         </div>
//         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" className="w-9 h-9 rounded-full border shadow-sm" alt="P" />
//       </header>

      

//       <main className="p-4 lg:p-10 max-w-[1600px] mx-auto">
        
//         {/* العنوان وأزرار التحكم */}
//         <div className="mb-10 lg:flex lg:justify-between lg:items-start">
//           <div>
//             <h1 className="text-3xl lg:text-4xl font-black text-[#1E293B]">Financial Intelligence</h1>
//             <p className="text-slate-400 text-sm mt-1 font-medium">Performance insights for Fiscal Year 2024</p>
//           </div>
//           <div className="mt-6 lg:mt-0 flex flex-wrap gap-2">
//             <div className="bg-white border rounded-xl p-1 flex shadow-sm">
//               <button className="px-4 py-1.5 bg-[#2D3184] text-white rounded-lg text-[11px] font-bold">Last 30 Days</button>
//               <button className="px-4 py-1.5 text-slate-400 text-[11px] font-bold">Quarterly</button>
//               <button className="px-4 py-1.5 text-slate-400 text-[11px] font-bold">Yearly</button>
//             </div>
//             <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-[11px] font-bold shadow-sm">
//               <Download size={14}/> Export PDF
//             </button>
//           </div>
//         </div>

//         {/* كروت الإحصائيات (Stat Cards) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatBox title="GROSS REVENUE" value="$142,400.00" trend="+12.5%" color="emerald" />
//           <StatBox title="AVG. HOURLY RATE" value="$145.00" trend="-2.1%" color="indigo" isNegative />
//           <StatBox title="ACTIVE PROJECTS" value="18" trend="Stable" color="purple" />
//           <StatBox title="OUTSTANDING" value="$24,850.00" trend="Critical" color="orange" isWarning />
//         </div>

//         {/* قسم الرسم البياني والـ Efficiency Score */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
//           {/* Revenue vs Expenses Chart */}
//           <div className="lg:col-span-2 bg-white rounded-[1.5rem] border border-slate-100 p-8 shadow-sm">
//             <div className="flex justify-between items-center mb-10">
//               <div>
//                 <h3 className="text-xl font-bold text-[#1E293B]">Revenue vs. Expenses</h3>
//                 <p className="text-xs text-slate-400 font-medium">Monthly breakdown of inflow and overhead costs</p>
//               </div>
//               <div className="flex gap-4">
//                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
//                   <div className="w-3 h-3 bg-[#4F46E5] rounded-full"></div> Revenue
//                 </div>
//                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
//                   <div className="w-3 h-3 bg-[#C7D2FE] rounded-full"></div> Expenses
//                 </div>
//               </div>
//             </div>
//             {/* Chart Simulation */}
//             <div className="h-[250px] flex items-end gap-1">
//               {[50, 65, 45, 75, 95, 80].map((h, i) => (
//                 <div key={i} className="flex-1 flex flex-col justify-end h-full relative group">
//                   <div style={{height: `${h}%`}} className="w-full bg-[#4F46E5] rounded-t-sm z-10"></div>
//                   <div style={{height: `${h + 15}%`}} className="w-full bg-[#C7D2FE] absolute bottom-0 rounded-t-sm opacity-50"></div>
//                   <span className="text-[10px] font-bold text-slate-300 mt-4 text-center w-full uppercase tracking-tighter">
//                     {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Efficiency Score Card */}
//           <div className="bg-[#2D3184] rounded-[1.5rem] p-8 text-white shadow-xl flex flex-col justify-between">
//             <h3 className="text-xl font-bold">Efficiency Score</h3>
//             <div className="flex justify-center my-8">
//               <div className="relative w-40 h-40 flex items-center justify-center border-8 border-white/10 rounded-full">
//                 <div className="absolute inset-0 border-8 border-white border-t-transparent rounded-full rotate-45"></div>
//                 <span className="text-5xl font-black">84<span className="text-xl">%</span></span>
//               </div>
//             </div>
//             <div className="space-y-4">
//               <div className="flex justify-between text-xs font-bold">
//                 <span className="text-white/60">Billable Capacity</span>
//                 <span>92%</span>
//               </div>
//               <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
//                 <div className="bg-white h-full w-[92%]"></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Project Profitability Table */}
//         <div className="bg-white rounded-[1.5rem] border border-slate-100 p-8 shadow-sm">
//           <div className="flex justify-between items-center mb-8">
//             <h3 className="text-xl font-bold text-[#1E293B]">Project Profitability</h3>
//             <div className="relative">
//                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
//                <input type="text" placeholder="Search projects..." className="pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-xs outline-none border-none w-64" />
//             </div>
//           </div>
//           <div className="overflow-x-auto text-left">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
//                   <th className="pb-4">Project Name</th>
//                   <th className="pb-4">Client</th>
//                   <th className="pb-4">Budget</th>
//                   <th className="pb-4">Expenses</th>
//                   <th className="pb-4">Net Margin</th>
//                   <th className="pb-4 text-right">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-50">
//                 <ProjectRow name="E-commerce Rebrand" type="Fixed Fee" client="Velvet & Vine" budget="$12,500" exp="$1,200" margin="90.4%" status="PROFITABLE" color="emerald" />
//                 <ProjectRow name="Mobile App MVP" type="Retainer" client="HealthTrack Co." budget="$45,000" exp="$18,400" margin="59.1%" status="ON TRACK" color="indigo" />
//                 <ProjectRow name="Brand Guidelines" type="Hourly" client="Solaris Energy" budget="$8,200" exp="$6,800" margin="17.0%" status="LOW MARGIN" color="orange" />
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// // --- Sub-components ---
// const StatBox = ({ title, value, trend, color, isNegative, isWarning }) => (
//   <div className="bg-white p-6 rounded-[1rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-slate-200 transition-all">
//     <div className="flex justify-between items-start mb-4">
//       <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600`}>
//         <DollarSign size={18} />
//       </div>
//       <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 ${
//         isNegative ? 'bg-blue-50 text-blue-500' : isWarning ? 'bg-orange-50 text-orange-500' : 'bg-emerald-50 text-emerald-500'
//       }`}>
//         {trend} {trend.includes('%') && (isNegative ? <ArrowDownRight size={10}/> : <ArrowUpRight size={10}/>)}
//       </span>
//     </div>
//     <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{title}</p>
//     <h3 className="text-2xl font-black text-[#1E293B] mt-1 tracking-tight">{value}</h3>
//   </div>
// );

// const ProjectRow = ({ name, type, client, budget, exp, margin, status, color }) => (
//   <tr className="group hover:bg-slate-50/50 transition-all">
//     <td className="py-5">
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600">
//           <Briefcase size={18} />
//         </div>
//         <div>
//           <p className="text-sm font-bold text-[#1E293B]">{name}</p>
//           <p className="text-[10px] text-slate-400 font-medium">{type}</p>
//         </div>
//       </div>
//     </td>
//     <td className="py-5 text-sm font-medium text-slate-500">{client}</td>
//     <td className="py-5 text-sm font-bold text-[#1E293B]">{budget}</td>
//     <td className="py-5 text-sm font-bold text-[#1E293B]">{exp}</td>
//     <td className={`py-5 text-sm font-black ${color === 'orange' ? 'text-red-500' : 'text-emerald-500'}`}>{margin}</td>
//     <td className="py-5 text-right">
//       <span className={`text-[9px] font-black px-3 py-1.5 rounded-full bg-${color}-50 text-${color}-600 uppercase`}>{status}</span>
//     </td>
//   </tr>
// );

// export default Reports;