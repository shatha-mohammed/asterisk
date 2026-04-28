import React from 'react';
import { DollarSign, Briefcase, Globe } from 'lucide-react';

const StatCard = ({ title, value, subtext, icon: Icon, variant }) => {
  const variants = {
    purple: 'bg-[#3B338B] text-white',
    white: 'bg-white text-gray-900 border border-gray-100',
  };

  return (
    <div className={`p-6 rounded-2xl shadow-sm ${variants[variant]} flex-1`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${variant === 'purple' ? 'bg-white/10' : 'bg-indigo-50'}`}>
          <Icon className={`w-6 h-6 ${variant === 'purple' ? 'text-white' : 'text-indigo-600'}`} />
        </div>
      </div>
      <div className="space-y-1">
        <p className={`text-sm ${variant === 'purple' ? 'text-indigo-100' : 'text-gray-500'}`}>{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        {subtext && <p className={`text-xs ${variant === 'purple' ? 'text-indigo-200' : 'text-gray-400'}`}>{subtext}</p>}
      </div>
    </div>
  );
};

const ClientsStatCards = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <StatCard 
        variant="purple"
        title="Revenue Metrics"
        value="$14,820"
        subtext="Avg. Revenue / Client"
        icon={DollarSign}
      />
      <StatCard 
        variant="white"
        title="Active Deliverables"
        value="32 Projects"
        subtext="Estimated completion: Oct 24"
        icon={Briefcase}
      />
      <StatCard 
        variant="white"
        title="Global Presence"
        value="14 Countries"
        subtext="View Distribution"
        icon={Globe}
      />
    </div>
  );
};

export default ClientsStatCards;