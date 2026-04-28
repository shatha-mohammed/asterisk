import React from "react";
import Button from "./ui/Button"; 
import { Download, Plus, Search } from "lucide-react";

const ClientsActions = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* العنوان والأزرار */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-[#3525B3] tracking-tight">Clients</h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">Manage your customer relationships</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none">
            <Button 
              variant="white" 
              size="md"
              text="Export"
              icon={<Download size={18} />}
              className="w-full sm:w-auto !px-4 sm:!px-7" // تحكم في الحجم للموبايل
            />
          </div>
          
          <div className="flex-1 sm:flex-none">
            <Button 
              variant="primary" 
              size="md"
              text="Add Client"
              icon={<Plus size={18} />}
              className="w-full sm:w-auto !px-4 sm:!px-7"
            />
          </div>
        </div>
      </div>

      {/* حقل البحث */}
      <div className="relative group w-full md:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3525B3] transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search for clients..." 
          className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-[#3525B3]/5 focus:border-[#3525B3] transition-all shadow-sm placeholder:text-slate-400"
        />
      </div>
    </div>
  );
};

export default ClientsActions;