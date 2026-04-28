import React from 'react';
import { Tag } from 'lucide-react';

const ProjectIdentity = ({ formData, onChange }) => (
  <section className="bg-white p-6 md:p-8 rounded-[24px] border border-slate-100 shadow-sm shadow-indigo-100/10">
    <div className="flex items-center gap-3 mb-8 text-[#3525B3]">
      <div className="p-2 bg-indigo-50 rounded-xl"><Tag size={20} /></div>
      <h2 className="font-bold text-lg text-slate-800">Project Identity</h2>
    </div>
    <div className="space-y-6">
      <div>
        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2 ml-1">Project Name</label>
        <input 
          name="name" value={formData.name} onChange={onChange} required
          type="text" placeholder="e.g. Q4 Brand Identity Redesign" 
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-[#3525B3] transition-all font-medium"
        />
      </div>
      <div>
        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2 ml-1">Project Description</label>
        <textarea 
          name="description" value={formData.description} onChange={onChange} rows="5" 
          placeholder="Briefly describe the objectives..." 
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-[#3525B3] transition-all font-medium"
        ></textarea>
      </div>
    </div>
  </section>
);

export default ProjectIdentity;