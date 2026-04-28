import React from 'react';
import { DollarSign, Briefcase, Globe } from 'lucide-react';

const ClientInsights = () => (
  <section className="mt-10">
    <h2 className="text-xl font-bold text-slate-800 mb-6">Client Insights</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* بطاقة الإيرادات */}
      <div className="bg-[#3525B3] p-8 rounded-[24px] text-white shadow-lg shadow-indigo-200/20 relative overflow-hidden">
        <div className="p-3 bg-white/10 rounded-xl w-fit mb-6">
          <DollarSign size={24} />
        </div>
        <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-1">Revenue Metrics</p>
        <h3 className="text-3xl font-black mb-1">$14,820</h3>
        <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest">Avg. Revenue / Client</p>
      </div>

      {/* بطاقة المشاريع النشطة */}
      <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm shadow-indigo-100/10">
        <div className="p-3 bg-indigo-50 rounded-xl w-fit mb-6 text-[#3525B3]">
          <Briefcase size={24} />
        </div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Active Deliverables</p>
        <h3 className="text-3xl font-black text-slate-800 mb-1">32 Projects</h3>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Estimated completion: Oct 24</p>
      </div>

      {/* بطاقة التواجد العالمي */}
      <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm shadow-indigo-100/10">
        <div className="p-3 bg-indigo-50 rounded-xl w-fit mb-6 text-[#3525B3]">
          <Globe size={24} />
        </div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Global Presence</p>
        <h3 className="text-3xl font-black text-slate-800 mb-1">14 Countries</h3>
        <p className="text-indigo-500 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:underline">View Distribution</p>
      </div>
    </div>
  </section>
);

export default ClientInsights;