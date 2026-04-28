import React from 'react';
import { MoreVertical, Calendar, DollarSign, Clock } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const { 
    name = "Untitled Project", 
    client = "General Client", 
    budget = "0.00", 
    deadline = "No deadline", 
    status = "Active" 
  } = project || {};

  return (
    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm shadow-indigo-100/10 hover:shadow-md hover:border-indigo-100 transition-all group">
      {/* Header: Name and Action */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-[#3525B3] group-hover:bg-[#3525B3] group-hover:text-white transition-colors duration-300">
            <span className="font-black text-lg">{name.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-[#3525B3] transition-colors">{name}</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">{client}</p>
          </div>
        </div>
      <Button 
  variant="ghost" 
  size="fit" 
  icon={<MoreVertical size={20} />} 
  className="!text-slate-300 hover:!text-slate-600 !p-2"
  onClick={() => console.log('Open menu')}
/>
      </div>

      {/* Body: Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
            <DollarSign size={14} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Budget</p>
            <p className="text-sm font-bold text-slate-700">${budget}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
            <Calendar size={14} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Deadline</p>
            <p className="text-sm font-bold text-slate-700">{deadline}</p>
          </div>
        </div>
      </div>

      {/* Footer: Progress & Status */}
      <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
          <Clock size={14} />
          <span>Last active 2d ago</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;