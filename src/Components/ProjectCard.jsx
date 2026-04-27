import React from 'react';
import { MoreVertical, Clock } from 'lucide-react';

const ProjectCard = ({ title, progress, category, client, color = "bg-indigo-800" }) => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-md group">
    <div className="flex justify-between items-start mb-6">
      <span className="text-[9px] font-black bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg uppercase tracking-widest">
        {category}
      </span>
      <MoreVertical size={18} className="text-slate-300 cursor-pointer hover:text-indigo-600 transition-colors" />
    </div>
    
    <h4 className="text-xl font-black text-[#1E293B] mb-1 tracking-tight">{title}</h4>
    <p className="text-xs text-slate-400 mb-8 font-medium italic">Client: {client}</p>
    
    <div className="space-y-3 mb-8">
      <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
        <span>Progress</span>
        <span className="text-indigo-900">{progress}%</span>
      </div>
      <div className="w-full bg-slate-50 h-2.5 rounded-full overflow-hidden border border-slate-100">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out shadow-sm`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
    
    <div className="flex justify-between items-center pt-5 border-t border-slate-50">
      <div className="flex -space-x-2">
        <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-indigo-600">AM</div>
        <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-slate-400">R</div>
      </div>
      <span className="text-[10px] font-black text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
        <Clock size={14} className="text-indigo-500" /> 
        Due 4 days
      </span>
    </div>
  </div>
);

export default ProjectCard;