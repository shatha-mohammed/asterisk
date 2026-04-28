import React from 'react';
import { Calendar } from 'lucide-react';

const ProjectLogistics = ({ formData, onChange }) => (
  <section className="bg-white p-6 md:p-8 rounded-[24px] border border-slate-100 shadow-sm shadow-indigo-100/10 mt-6">
    <div className="flex items-center gap-3 mb-8 text-[#3525B3]">
      <div className="p-2 bg-indigo-50 rounded-xl"><Calendar size={20} /></div>
      <h2 className="font-bold text-lg text-slate-800">Logistics & Timeline</h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2 ml-1">Target Deadline</label>
        <input 
          name="deadline" value={formData.deadline} onChange={onChange}
          type="date" 
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#3525B3] font-medium"
        />
      </div>
      <div>
        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2 ml-1">Project Category</label>
        <select 
          name="category" value={formData.category} onChange={onChange}
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#3525B3] font-medium appearance-none"
        >
          <option value="Design & Branding">Design & Branding</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile App">Mobile App</option>
        </select>
      </div>
    </div>
  </section>
);

export default ProjectLogistics;