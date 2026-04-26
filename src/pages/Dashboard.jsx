import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  LayoutDashboard, Briefcase, FileText, Plus, 
  BarChart3, Users, MoreVertical, DollarSign, Clock 
} from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { fetchProjects } from '../store/slices/projectsSlice';
import { fetchInvoices } from '../store/slices/invoicesSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const today = new Date().toISOString();

  // البيانات من الـ Store
  const { user } = useSelector(state => state.auth);
  const { items: projects, isLoading: projectsLoading } = useSelector(state => state.projects);
  const { items: invoices } = useSelector(state => state.invoices);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchInvoices());
  }, [dispatch]);

  const stats = {
    earnings: invoices.reduce((acc, inv) => acc + (inv.amount || 0), 0),
    activeProjects: projects.filter(p => p.status === 'active').length,
    pendingInvoices: invoices.filter(inv => inv.status === 'pending').length
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 lg:pb-10" dir="ltr">
      <main className="max-w-[1600px] mx-auto">
        
        {/* 1. الترحيب وزر الإضافة */}
        <div className="mb-10 lg:flex lg:justify-between lg:items-end">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black text-[#1E293B] tracking-tight">
              Good Morning, {user?.name?.split(' ')[0] || 'Alex'}
            </h1>
            <p className="text-slate-400 text-sm mt-1 font-medium font-sans">Today is {formatDate(today)}</p>
          </div>

          <button className="flex items-center justify-center gap-2 mt-4 bg-[#2D3184] text-white w-full lg:w-auto px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-95 transition-all">
            <Plus size={20} />
            <span className="text-sm tracking-wide">Add Project</span>
          </button>
        </div>

        {/* 2. شريط الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Active Projects" value={stats.activeProjects} trend="+2 this month" icon={<Briefcase size={20}/>} />
          <StatCard title="Total Earnings" value={formatCurrency(stats.earnings)} trend="On Track" icon={<DollarSign size={20}/>} />
          <StatCard title="Pending Invoices" value={stats.pendingInvoices} trend="3 Overdue" icon={<FileText size={20}/>} isRed />
        </div>

        {/* 3. قسم الرسم البياني والنشاطات) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Revenue Growth Chart */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xl font-bold text-[#1E293B]">Revenue Growth</h3>
                <p className="text-xs text-slate-400 font-medium">Monthly income analysis</p>
              </div>
              <div className="bg-slate-50 p-1 rounded-xl flex">
                <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-[10px] font-bold text-indigo-600">6M</button>
                <button className="px-4 py-1.5 text-[10px] font-bold text-slate-400">1Y</button>
              </div>
            </div>
            
            {/* أشرطة الرسم البياني */}
            <div className="h-[250px] flex items-end justify-between gap-3 lg:gap-6 px-2 border-b border-slate-50">
              {[
                { month: 'Jan', h: '40%' },
                { month: 'Feb', h: '60%' },
                { month: 'Mar', h: '45%' },
                { month: 'Apr', h: '70%' },
                { month: 'May', h: '90%', active: true },
                { month: 'Jun', h: '65%' }
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group h-full justify-end">
                  <div 
                    style={{ height: item.h }} 
                    className={`w-full min-w-[20px] rounded-t-xl transition-all duration-700 
                      ${item.active ? 'bg-[#2D3184] shadow-lg shadow-indigo-100' : 'bg-indigo-50 group-hover:bg-indigo-100'}`}
                  ></div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-[-25px]">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 flex flex-col">
            <h3 className="text-xl font-bold text-[#1E293B] mb-8">Recent Activity</h3>
            <div className="space-y-8 flex-1">
              <ActivityItem color="bg-emerald-500" title="System Connected" sub="Live data sync active" />
              <ActivityItem color="bg-indigo-500" title="Design Updated" sub="Layout components unified" />
              <ActivityItem color="bg-orange-500" title="CORS Handled" sub="Pending server fix" />
            </div>
            <button className="w-full mt-8 py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-[10px] font-black text-indigo-600 tracking-widest transition-all">VIEW ALL</button>
          </div>
        </div>

        {/* 4. قسم المشاريع الحالية */}
        <section className="pb-10 lg:pb-0">
          <div className="flex justify-between items-center mb-6 px-4">
            <h2 className="text-xl font-bold text-[#1E293B] ">Current Projects</h2>
            <button className="text-sm font-bold text-indigo-600">View Project Board</button>
          </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* إذا كانت البيانات من السيرفر فارغة (بسبب خطأ CORS)، سنعرض مشاريع تجريبية */}
  {projects.length === 0 ? (
    <>
      <ProjectCard 
        title="E-Commerce Launch" 
        progress={75} 
        category="STRATEGY" 
        client="FashionFlow" 
        color="bg-indigo-600" 
      />
      <ProjectCard 
        title="SaaS Dashboard" 
        progress={40} 
        category="UI DESIGN" 
        client="Nexus" 
        color="bg-orange-500" 
      />
      <ProjectCard 
        title="Mobile App" 
        progress={95} 
        category="DEVELOPMENT" 
        client="Bloom" 
        color="bg-emerald-500" 
      />
    </>
  ) : (
    // إذا اشتغل السيرفر، سيعرض البيانات الحقيقية تلقائياً
    projects.slice(0, 3).map((p, i) => (
      <ProjectCard 
        key={p.id || i}
        title={p.name} 
        progress={p.progress || 50} 
        category={p.category || "General"} 
        client={p.clientName} 
        color="bg-indigo-600" 
      />
    ))
  )}
</div>
        </section>
      </main>

      {/* زر الإضافة العائم للموبايل */}
      <button className="lg:hidden fixed bottom-24 right-6 w-14 h-14 bg-[#2D3184] text-white rounded-2xl shadow-2xl flex items-center justify-center z-40 active:scale-90 transition-transform">
        <Plus size={28} />
      </button>
    </div>
  );
}

// --- المكونات الفرعية (الأصلية) ---

const StatCard = ({ title, value, trend, icon, isRed }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-indigo-100 transition-all">
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600 transition-colors">{icon}</div>
      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${isRed ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>{trend}</span>
    </div>
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</span>
    <h2 className="text-4xl font-black text-[#1E293B] mt-1 font-sans">{value}</h2>
  </div>
);

const ActivityItem = ({ color, title, sub }) => (
  <div className="flex gap-4">
    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${color}`}></div>
    <div>
      <h4 className="text-sm font-bold text-[#1E293B]">{title}</h4>
      <p className="text-[11px] text-slate-400 font-medium mt-1">{sub}</p>
    </div>
  </div>
);

const ProjectCard = ({ title, progress, category, client, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start mb-6">
      <span className="text-[9px] font-black bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md uppercase tracking-wider">{category}</span>
      <MoreVertical size={16} className="text-slate-300" />
    </div>
    <h4 className="text-lg font-bold text-[#1E293B] mb-1">{title}</h4>
    <p className="text-xs text-slate-400 mb-6 font-sans">Client: {client}</p>
    <div className="space-y-2 mb-6">
      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">
        <span>Progress</span>
        <span className="text-[#1E293B]">{progress}%</span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000`} style={{width: `${progress}%`}}></div>
      </div>
    </div>
    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
      <div className="flex -space-x-2">
        <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white"></div>
        <div className="w-7 h-7 rounded-full bg-slate-300 border-2 border-white"></div>
      </div>
      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest font-sans"><Clock size={12}/> Due 4d</span>
    </div>
  </div>
);

