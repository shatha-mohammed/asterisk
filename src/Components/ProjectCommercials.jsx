import React from 'react';
import { UploadCloud, X } from 'lucide-react';
import Button from './ui/Button';

const ProjectCommercials = ({ formData, onChange, clients }) => {
  // الحسابات التلقائية 
  const budgetValue = parseFloat(formData.budget) || 0;
  const taxValue = budgetValue * 0.20;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* بطاقة Commercials */}
      <section className="bg-white p-6 md:p-8 rounded-[24px] border border-slate-100 shadow-sm shadow-indigo-100/10">
        <h2 className="font-bold text-lg text-slate-800 mb-8">Commercials</h2>
        
        <div className="space-y-6">
          {/* Client Selection */}
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2 ml-1">Client</label>
            <select 
              name="clientId" 
              value={formData.clientId} 
              onChange={onChange} 
              required
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#3525B3] font-medium appearance-none transition-all"
            >
              <option value="">Select existing client</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Budget Input */}
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2 ml-1">Budget Estimate</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input 
                name="budget" 
                value={formData.budget} 
                onChange={onChange} 
                type="number" 
                placeholder="0.00" 
                className="w-full p-4 pl-10 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#3525B3] font-medium transition-all"
              />
            </div>
          </div>

          {/* Tax Calculation Label */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-50">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax (VAT 20%)</span>
            <span className="text-xs font-bold text-slate-500">
              {budgetValue > 0 ? `$${taxValue.toFixed(2)}` : "Calculated on save"}
            </span>
          </div>
        </div>
      </section>

      {/*  Project Briefs */}
      <section className="bg-[#F8FAFF] p-6 md:p-8 rounded-[24px] border-2 border-dashed border-indigo-100 text-center">
        <h3 className="text-[10px] font-black text-[#2D3184] uppercase tracking-widest text-left mb-6">Project Briefs</h3>
        
        <div className="group cursor-pointer">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-[#3525B3] group-hover:scale-110 transition-transform">
            <UploadCloud size={24} />
          </div>
          <h4 className="text-sm font-bold text-[#2D3184]">Click to upload or drag briefs</h4>
          <p className="text-[10px] text-slate-400 mt-1">PDF, DOCU up to 10MB</p>
        </div>

        <div className="mt-6 p-3 bg-white border border-slate-100 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-[#3525B3]">
              <span className="text-[10px] font-black">PDF</span>
            </div>
            <span className="text-xs font-bold text-slate-600">style_guide_v2.pdf</span>
          </div>
          <Button 
  variant="ghost" 
  size="fit" 
  icon={<X size={16} />} 
  className="!text-slate-300 hover:!text-red-400 !p-1 !rounded-lg"
  onClick={() => console.log('Delete file')}
/>
        </div>
      </section>
    </div>
  );
};

export default ProjectCommercials;