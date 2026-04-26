// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   LayoutDashboard, Briefcase, FileText, Settings, 
//   Menu, X, Bell, Search, Plus, Calendar, 
//   BarChart3, Users, MoreVertical, DollarSign, Clock 
// } from 'lucide-react';
// import { formatCurrency, formatDate } from '../utils/formatters';

// const Dashboard = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const today = new Date().toISOString();

//   const stats = {
//     earnings: 42850,
//     activeProjects: 12,
//     pendingInvoices: 7
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] pb-24 lg:pb-10" dir="ltr">

//       {/* 2. هيدر الديسك توب (البحث والبروفايل) */}
//       <header className="hidden lg:flex bg-white border-b border-slate-100 p-6 px-10 justify-between items-center sticky top-0 z-40">
//         <div className="relative w-full max-w-xl">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
//           <input type="text" placeholder="Search projects, clients..." className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm outline-none" />
//         </div>
//         <div className="flex items-center gap-6">
//           <Bell className="text-slate-400" size={20} />
//           <div className="flex items-center gap-3 border-l pl-6">
//             <div className="text-right">
//               <p className="text-sm font-bold text-[#1E293B]">Alex Morgan</p>
//               <p className="text-[10px] text-indigo-500 font-bold uppercase">Pro Plan</p>
//             </div>
//             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" className="w-10 h-10 rounded-full border shadow-sm" alt="P" />
//           </div>
//         </div>
//       </header>

//       {/* 3. هيدر الموبايل البسيط */}
//       <header className="lg:hidden bg-white p-4 flex justify-between items-center border-b border-slate-100 sticky top-0 z-20">
//         <div className="flex items-center gap-3">
//           <h1 className="text-[#2D3184] font-bold text-lg ms-4">Asterisk</h1>
//         </div>
//         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" className="w-9 h-9 rounded-full border shadow-sm" alt="P" />
//       </header>

//       {/* 4. المحتوى الرئيسي */}
//       <main className="p-4 lg:p-10 max-w-[1600px] mx-auto">
        
//         {/* الترحيب وزر الإضافة */}
//         <div className="mb-10 lg:flex lg:justify-between lg:items-end">
//           <div>
//             <h1 className="text-3xl lg:text-4xl font-black text-[#1E293B] tracking-tight">Good Morning, Alex</h1>
//             <p className="text-slate-400 text-sm mt-1 font-medium">Today is {formatDate(today)}</p>
//           </div>

//           <button className="flex items-center justify-center gap-2 mt-4 bg-[#2D3184] text-white w-full lg:w-auto px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-95 transition-all">
//     <Plus size={20} />
//     <span className="text-sm tracking-wide">Add Project</span>
//           </button>

//         </div>

//         {/* شريط الإحصائيات (مثل صفحة الانفويس) */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           <StatCard title="Active Projects" value={stats.activeProjects} trend="+2 this month" icon={<Briefcase size={20}/>} />
//           <StatCard title="Total Earnings" value={formatCurrency(stats.earnings)} trend="On Track" icon={<DollarSign size={20}/>} />
//           <StatCard title="Pending Invoices" value={stats.pendingInvoices} trend="3 Overdue" icon={<FileText size={20}/>} isRed />
//         </div>

//         {/* قسم الرسم البياني والنشاطات */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
//           {/* Revenue Growth */}
//           <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
//   <div className="flex justify-between items-center mb-10">
//     <div>
//       <h3 className="text-xl font-bold text-[#1E293B]">Revenue Growth</h3>
//       <p className="text-xs text-slate-400 font-medium">Monthly income analysis</p>
//     </div>
//     <div className="bg-slate-50 p-1 rounded-xl flex">
//       <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-[10px] font-bold text-indigo-600">6M</button>
//       <button className="px-4 py-1.5 text-[10px] font-bold text-slate-400">1Y</button>
//     </div>
//   </div>
//           <div className="h-[250px] flex items-end justify-between gap-3 lg:gap-6 px-2 border-b border-slate-50">
//     {[
//       { month: 'Jan', h: '40%' },
//       { month: 'Feb', h: '60%' },
//       { month: 'Mar', h: '45%' },
//       { month: 'Apr', h: '70%' },
//       { month: 'May', h: '90%', active: true }, // العمود المميز
//       { month: 'Jun', h: '65%' }
//     ].map((item, i) => (
//       <div key={i} className="flex-1 flex flex-col items-center gap-4 group h-full justify-end">
//         {/* العمود نفسه */}
//         <div 
//           style={{ height: item.h }} 
//           className={`w-full min-w-[20px] rounded-t-xl transition-all duration-700 
//             ${item.active ? 'bg-[#2D3184] shadow-lg shadow-indigo-100' : 'bg-indigo-50 group-hover:bg-indigo-100'}`}
//         ></div>
//         {/* اسم الشهر تحت العمود */}
//         <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-[-25px]">
//           {item.month}
//         </span>
//       </div>
//     ))}
//   </div>
// </div>

//           {/* Recent Activity */}
//           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 flex flex-col">
//             <h3 className="text-xl font-bold text-[#1E293B] mb-8">Recent Activity</h3>
//             <div className="space-y-8 flex-1">
//               <ActivityItem color="bg-emerald-500" title="Invoice #4201 Paid" sub="2 hours ago • Acme Corp" />
//               <ActivityItem color="bg-indigo-500" title="New Project Created" sub="5 hours ago • Brand Redesign" />
//               <ActivityItem color="bg-orange-500" title="Pending Review" sub="Yesterday • Mobile UI" />
//               <ActivityItem color="bg-slate-300" title="System Update" sub="2 days ago • Auto-backup" />
//             </div>
//             <button className="w-full mt-8 py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-[10px] font-black text-indigo-600 tracking-widest transition-all">VIEW ALL ACTIVITY</button>
//           </div>
//         </div>

//         {/* Current Projects Section */}
//         <section className="pb-10 lg:pb-0">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold text-[#1E293B]">Current Projects</h2>
//             <button className="text-sm font-bold text-indigo-600">View Project Board</button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//              <ProjectCard title="E-Commerce Launch" progress={75} category="STRATEGY" client="FashionFlow" color="bg-indigo-600" />
//              <ProjectCard title="SaaS Dashboard" progress={40} category="UI DESIGN" client="Nexus" color="bg-orange-500" />
//              <ProjectCard title="Mobile App" progress={95} category="DEVELOPMENT" client="Bloom" color="bg-emerald-500" />
//           </div>
//         </section>
//       </main>

//     {/* 5. شريط التنقل السفلي الموحد (Bottom Bar) - النسخة المطورة */}
// <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around items-center p-2 pb-6 z-50 shadow-[0_-5px_25px_rgba(0,0,0,0.05)]">
  
//   <BottomTab to="/dashboard" icon={<LayoutDashboard size={20} />} label="HOME" />
  
//   <BottomTab to="/projects" icon={<Briefcase size={20} />} label="PROJECTS" />
  
//   {/* أضفنا زر العملاء هنا */}
//   <BottomTab to="/clients" icon={<Users size={20} />} label="CLIENTS" />
  
//   {/* أضفنا زر التقارير هنا */}
//   <BottomTab to="/reports" icon={<BarChart3 size={20} />} label="REPORTS" />
  
//   <BottomTab to="/invoices" icon={<FileText size={20} />} label="INVOICES" />

// </div>
      

//       {/* زر الإضافة العائم */}
//       <button className="lg:hidden fixed bottom-24 right-6 w-14 h-14 bg-[#2D3184] text-white rounded-2xl shadow-2xl flex items-center justify-center z-40 active:scale-90 transition-transform">
//         <Plus size={28} />
//       </button>
//     </div>
//   );
// };

// // --- المكونات الفرعية (Sub-components) ---

// const StatCard = ({ title, value, trend, icon, isRed }) => (
//   <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-indigo-100 transition-all">
//     <div className="flex justify-between items-start mb-6">
//       <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600 transition-colors">{icon}</div>
//       <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${isRed ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>{trend}</span>
//     </div>
//     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</span>
//     <h2 className="text-4xl font-black text-[#1E293B] mt-1">{value}</h2>
//   </div>
// );

// const ActivityItem = ({ color, title, sub }) => (
//   <div className="flex gap-4">
//     <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${color}`}></div>
//     <div>
//       <h4 className="text-sm font-bold text-[#1E293B]">{title}</h4>
//       <p className="text-[11px] text-slate-400 font-medium mt-1">{sub}</p>
//     </div>
//   </div>
// );

// const ProjectCard = ({ title, progress, category, client, color }) => (
//   <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
//     <div className="flex justify-between items-start mb-6">
//       <span className="text-[9px] font-black bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md uppercase tracking-wider">{category}</span>
//       <MoreVertical size={16} className="text-slate-300" />
//     </div>
//     <h4 className="text-lg font-bold text-[#1E293B] mb-1">{title}</h4>
//     <p className="text-xs text-slate-400 mb-6">Client: {client}</p>
//     <div className="space-y-2 mb-6">
//       <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//         <span>Progress</span>
//         <span className="text-[#1E293B]">{progress}%</span>
//       </div>
//       <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
//         <div className={`h-full ${color} transition-all duration-1000`} style={{width: `${progress}%`}}></div>
//       </div>
//     </div>
//     <div className="flex justify-between items-center pt-4 border-t border-slate-50">
//       <div className="flex -space-x-2">
//         <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white"></div>
//         <div className="w-7 h-7 rounded-full bg-slate-300 border-2 border-white"></div>
//       </div>
//       <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest"><Clock size={12}/> Due 4d</span>
//     </div>
//   </div>
// );

// const BottomTab = ({ to, icon, label, active }) => (
//   <Link to={to} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-indigo-600' : 'text-slate-300'}`}>
//     {icon}
//     <span className="text-[9px] font-black tracking-tighter uppercase">{label}</span>
//   </Link>
// );

// export default Dashboard;