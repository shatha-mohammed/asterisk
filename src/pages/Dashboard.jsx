import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Briefcase, FileText, Plus, DollarSign } from 'lucide-react';
import { fetchProjects } from '../store/slices/projectsSlice';
import { fetchInvoices } from '../store/slices/invoicesSlice';
import Button from "../Components/ui/Button";
import StatCard from "../Components/ui/StatCard";
import ProjectCard from "../Components/ProjectCard";
import InvoicesTable from "../Components/InvoicesTable"; // استدعينا الجدول المشترك

export default function Dashboard() {
  const dispatch = useDispatch();
  
  const { user } = useSelector(state => state.auth);
  const { items: projects, isLoading: projectsLoading } = useSelector(state => state.projects);
  const { items: invoices } = useSelector(state => state.invoices);

  useEffect(() => {
    dispatch(fetchProjects({ page: 1 }));
    dispatch(fetchInvoices({ page: 1 }));
  }, [dispatch]);

  const stats = {
    earnings: invoices?.reduce((acc, inv) => acc + (inv.amount || 0), 0) || 0,
    activeCount: projects?.filter(p => p.status === 'active').length || 0,
    pendingInvoices: invoices?.filter(inv => inv.status === 'pending').length || 0
  };

  if (projectsLoading) return (
    <div className="p-20 text-center font-black animate-pulse text-brand-accent uppercase tracking-[0.3em]">
      Initializing Asterisk...
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto p-4 lg:p-10 animate-in fade-in duration-500">
      
      {/* 1. Header  */}
      <div className="mb-12 lg:flex lg:justify-between lg:items-end">
        <div>
          <h1 className="text-3xl lg:text-6xl font-black text-[#1E293B] tracking-tight">
            Hi, {user?.name?.split(' ')[0] || 'Designer'}!
          </h1>
          <p className="text-muted text-sm mt-3 font-bold uppercase tracking-[0.25em] opacity-60">
            Freelancer Flow Overview
          </p>
        </div>
        <div className="mt-8 lg:mt-0">
          <Button 
            text="Start New Project" 
            icon={<Plus size={20} />} 
            onClick={() => {}} 
          />
        </div>
      </div>

      {/* 2. شريط الإحصائيات الموحد */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <StatCard title="Active Work" value={stats.activeCount} trend="Projects in progress" icon={<Briefcase size={22}/>} />
        <StatCard title="Total Earnings" value={`$${stats.earnings.toLocaleString()}`} trend="Net collected" icon={<DollarSign size={22}/>} />
        <StatCard title="Pending" value={stats.pendingInvoices} trend="Payment follow-ups" icon={<FileText size={22}/>} isRed />
      </div>

      {/* 3. التحليلات والنشاطات */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
        
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-50 shadow-sm p-10 lg:p-12">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-xl font-black text-[#1E293B] tracking-tight">Revenue Growth</h3>
              <p className="text-[10px] text-muted font-black uppercase tracking-widest opacity-50">Performance metrics</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-2xl flex gap-2">
<Button 
  text="6M" 
  variant="white" 
  size="md" 
  className="!py-2.5 !px-6 text-[10px] font-black" 
  onClick={() => {}} 
/>

<Button 
  text="1Y" 
  variant="ghost" 
  size="md" 
  className="!py-2.5 !px-6 text-[10px] font-black opacity-40 hover:opacity-100" 
  onClick={() => {}} 
/>
            </div>
          </div>
          
          <div className="h-[300px] flex items-end justify-between gap-6 px-2 border-b border-slate-50/50">
            {[
              { m: 'Jan', h: '40%' }, { m: 'Feb', h: '65%' }, { m: 'Mar', h: '45%' },
              { m: 'Apr', h: '80%' }, { m: 'May', h: '100%', active: true }, { m: 'Jun', h: '70%' }
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-6 group h-full justify-end">
                <div 
                  style={{ height: item.h }} 
                  className={`w-full max-w-[45px] rounded-t-2xl transition-all duration-700 
                    ${item.active ? 'bg-brand-accent shadow-2xl shadow-indigo-100' : 'bg-slate-50 group-hover:bg-indigo-50/50'}`}
                ></div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-[-35px]">
                  {item.m}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity  */}
        <div className="bg-white rounded-[3rem] border border-slate-50 shadow-sm p-10 flex flex-col">
          <h3 className="text-xl font-black text-[#1E293B] mb-12 tracking-tight">Recent Activity</h3>
          <div className="space-y-12 flex-1">
            <ActivityItem color="bg-emerald-500" title="Payment" sub="Invoice #4420 paid" />
            <ActivityItem color="bg-brand-accent" title="Project" sub="Asterisk UI Phase 1" />
            <ActivityItem color="bg-amber-500" title="System" sub="Cloud sync completed" />
          </div>
<Button 
  text="VIEW FEED" 
  variant="ghost" 
  size="full" 
  className="mt-12 tracking-[0.3em] text-[9px] font-black opacity-40 hover:opacity-100 transition-all" 
  onClick={() => {}} 
/>        </div>
      </div>

      {/* 4. Recent Invoices */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8 px-4">
          <h2 className="text-2xl font-black text-[#1E293B] tracking-tight">Recent Invoices</h2>
<Button 
  text="Go to billing" 
  variant="ghost" 
  size="sm" 
  className="text-[10px] tracking-[0.2em] text-brand-accent font-black" 
  onClick={() => goTo('/invoices')} 
/>        </div>
        <InvoicesTable invoices={invoices?.slice(0, 4)} />
      </section>

      {/* 5. Projects Section */}
      <section>
        <div className="flex justify-between items-center mb-8 px-4">
          <h2 className="text-2xl font-black text-[#1E293B] tracking-tight">Active Projects</h2>
<Button 
  text="View all" 
  variant="ghost" 
  size="sm" 
  className="text-[10px] tracking-[0.2em]" 
  onClick={() => {}} 
/>        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects?.length > 0 ? (
            projects.slice(0, 3).map((p) => (
              <ProjectCard 
                key={p.id}
                title={p.title} 
                progress={p.status === 'done' ? 100 : 65} 
                category="CREATIVE" 
                client={p.clientId || "Direct Client"} 
                color="bg-brand-accent" 
              />
            ))
          ) : (
            <div className="col-span-3 p-24 text-center bg-white rounded-[3rem] border border-dashed border-slate-100">
               <p className="text-slate-300 font-black uppercase tracking-[0.4em] text-[10px]">No active pipeline</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const ActivityItem = ({ color, title, sub }) => (
  <div className="flex gap-6 group cursor-default items-start">
    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${color} shadow-sm group-hover:scale-[1.4] transition-all duration-300`}></div>
    <div>
      <h4 className="text-sm font-black text-[#1E293B] tracking-tight leading-none mb-2">{title}</h4>
      <p className="text-[10px] text-muted font-bold opacity-40 uppercase tracking-wider">{sub}</p>
    </div>
  </div>
);