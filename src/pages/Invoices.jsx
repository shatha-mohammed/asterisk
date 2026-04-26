// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; 
// import { 
//   Plus, Search, Download, Filter, ListFilter, MoreVertical, 
//   Wallet, CheckCircle2, AlertCircle, Menu, X, Bell, ChevronLeft, ChevronRight,
//   LayoutDashboard, Briefcase, FileText, Settings 
// } from 'lucide-react';
// import Sidebar from "../components/Sidebar"; 
// import { formatCurrency } from '../utils/formatters';

// const Invoices = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const invoices = [
//     { id: '#INV-2024-001', client: 'Acme Technology', logo: 'AT', issueDate: 'Oct 12, 2024', dueDate: 'Oct 26, 2024', amount: 3500, status: 'Overdue' },
//     { id: '#INV-2024-002', client: 'Global Logistics', logo: 'GL', issueDate: 'Oct 15, 2024', dueDate: 'Oct 29, 2024', amount: 1200, status: 'Paid' },
//     { id: '#INV-2024-003', client: 'Solar Networks', logo: 'SN', issueDate: 'Oct 18, 2024', dueDate: 'Nov 01, 2024', amount: 8750, status: 'Pending' },
//     { id: '#INV-2024-004', client: 'Blue Rocket', logo: 'BR', issueDate: 'Oct 20, 2024', dueDate: 'Nov 03, 2024', amount: 4300, status: 'Paid' },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] pb-20 lg:pb-0" dir="ltr">
      
// {isMenuOpen && (
//   <div className="lg:hidden fixed inset-0 z-[100] flex">
//     {/* الخلفية المضببة */}
//     <div 
//       className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
//       onClick={() => setIsMenuOpen(false)}
//     ></div>
    
//     {/* جسم القائمة */}
//     <div className="relative w-72 bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
//       {/* زر الإغلاق صار يظهر فوق الـ Sidebar نفسه بشكل عائم أو مدمج */}
//       <div className="absolute right-4 top-4 z-[110]">
//         <button 
//           onClick={() => setIsMenuOpen(false)} 
//           className="p-2 bg-slate-50 text-slate-400 rounded-full hover:bg-slate-100"
//         >
//           <X size={20} />
//         </button>
//       </div>

//       {/* محتوى السايد بار يبدأ من أعلى الشاشة مباشرة */}
//       <div className="flex-1 overflow-y-auto">
//         <Sidebar />
//       </div>
//     </div>
//   </div>
// )}

// <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
  
//   {/* 1.(Mobile Header)*/}
//   <div className="flex lg:hidden items-center justify-between p-4">
//     <div className="flex items-center gap-3">
//       <h1 className="text-[#2D3184] font-bold text-lg">Asterisk</h1>
//     </div>
//     <div className="w-9 h-9 rounded-full bg-slate-200 border border-white shadow-sm overflow-hidden">
//       <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar"/>
//     </div>
//   </div>

//   {/* 2. (Desktop Header)*/}
//   <div className="hidden lg:flex items-center justify-between p-10 py-6">
//     <div className="relative w-full max-w-md">
//       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
//       <input 
//         type="text" 
//         placeholder="Search invoices..." 
//         className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all" 
//       />
//     </div>

//     <div className="flex items-center gap-4">
//       <div className="text-right">
//         <p className="text-sm font-bold text-[#1E293B]">Alex Morgan</p>
//         <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Pro Account</p>
//       </div>
//       <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-md overflow-hidden cursor-pointer">
//         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar"/>
//       </div>
//     </div>
//   </div>
// </header>


//       {/* 3. المحتوى الرئيسي */}
//       <main className="p-4 lg:p-10 max-w-[1600px] mx-auto">
//         <div className="mb-8 lg:flex lg:justify-between lg:items-end">
//           <div>
//             <h1 className="text-3xl lg:text-5xl font-black text-[#1E293B] tracking-tight">Invoice Management</h1>
//             <p className="text-slate-400 text-sm mt-2 font-medium">Manage your business revenue.</p>
//             <div className="lg:hidden mt-4">
//         <button className="flex items-center gap-2 bg-white border border-slate-200 text-[#1E293B] px-4 py-2 rounded-xl font-bold text-xs shadow-sm active:scale-95 transition-all">
//           <Download size={16} /> Export PDF
//         </button>
//       </div>
//           </div>
//           <button className="hidden lg:flex items-center gap-2 bg-[#2D3184] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl hover:scale-105 transition-all">
//             <Plus size={20} /> New Invoice
//           </button>
//         </div>

//         {/* كروت الإحصائيات */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           <StatCard title="TOTAL UNPAID" value={12450} trend="+12.5% vs last month" icon={<Wallet size={20}/>} />
//           <StatCard title="OVERDUE" value={3120} trend="4 invoices attention" icon={<AlertCircle size={20}/>} isRed />
//           <StatCard title="PAID THIS MONTH" value={24800} trend="85% target reached" icon={<CheckCircle2 size={20}/>} isDarkBlue />
//         </div>

//         {/* الجدول (كما في كودك الأصلي) */}
//         <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
//           {/* ... محتوى الجدول الخاص بكِ ... */}
//           <div className="p-6 overflow-x-auto">
//              <table className="w-full text-left">
//                 {/* ... (نفس محتوى الجدول من كودك) ... */}
//                 <thead>
//                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">
//                       <th className="py-4 px-4">Invoice ID</th>
//                       <th className="py-4 px-4">Client</th>
//                       <th className="py-4 px-4 text-right">Amount</th>
//                       <th className="py-4 px-4"></th>
//                    </tr>
//                 </thead>
//                 <tbody>
//                    {invoices.map(inv => (
//                       <tr key={inv.id} className="border-b border-slate-50 last:border-none">
//                          <td className="py-5 px-4 font-bold text-indigo-600 text-sm">{inv.id}</td>
//                          <td className="py-5 px-4 font-bold text-[#1E293B] text-sm">{inv.client}</td>
//                          <td className="py-5 px-4 font-black text-[#1E293B] text-right text-sm">{formatCurrency(inv.amount)}</td>
//                          <td className="py-5 px-4 text-right text-slate-300"><MoreVertical size={18}/></td>
//                       </tr>
//                    ))}
//                 </tbody>
//              </table>
//           </div>
//         </div>
//       </main>

//       {/* 4. شريط التنقل السفلي (Mobile Bottom Bar) */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around items-center p-3 pb-6 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
//         <BottomTab to="/dashboard" icon={<LayoutDashboard size={22} />} label="HOME" />
//         <BottomTab to="/projects" icon={<Briefcase size={22} />} label="PROJECTS" />
//         <BottomTab to="/invoices" icon={<FileText size={22} />} label="INVOICES" active />
//         <BottomTab to="/settings" icon={<Settings size={22} />} label="SETTINGS" />
//       </div>

//       {/* 5. زر الموبايل العائم (Floating Button) */}
//       <button className="lg:hidden fixed bottom-24 right-6 w-14 h-14 bg-[#2D3184] text-white rounded-2xl shadow-2xl flex items-center justify-center z-40 active:scale-90 transition-transform">
//         <Plus size={28} />
//       </button>
//     </div>
//   );
// };

// // مكونات التنقل السفلي
// const BottomTab = ({ to, icon, label, active }) => (
//   <Link to={to} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-indigo-600' : 'text-slate-300'}`}>
//     {icon}
//     <span className="text-[9px] font-black tracking-tighter uppercase">{label}</span>
//   </Link>
// );

// // مكون كرت الإحصائيات (كما في كودك مع تحسين الزوايا)
// const StatCard = ({ title, value, trend, icon, isRed, isDarkBlue }) => (
//   <div className={`p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative transition-all ${isDarkBlue ? 'bg-[#2D3184] text-white' : 'bg-white'}`}>
//     <div className="flex justify-between items-start mb-6">
//       <div className={`p-3 rounded-2xl ${isDarkBlue ? 'bg-white/10' : 'bg-slate-50'}`}>{icon}</div>
//       <span className={`text-[10px] font-bold tracking-widest ${isDarkBlue ? 'text-indigo-200' : 'text-slate-400'}`}>{title}</span>
//     </div>
//     <h2 className={`text-3xl font-black ${isRed ? 'text-red-500' : isDarkBlue ? 'text-white' : 'text-[#1E293B]'}`}>
//       {formatCurrency(value)}
//     </h2>
//     <p className={`text-[11px] font-bold mt-1 ${isDarkBlue ? 'text-indigo-200/60' : 'text-indigo-500'}`}>{trend}</p>
//   </div>
// );

// export default Invoices;