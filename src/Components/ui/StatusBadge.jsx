import React from 'react';

const statusStyles = {
  active: 'bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]',
  lead: 'bg-[#EEF2FF] text-[#6366F1] border border-[#C7D2FE]',
  past: 'bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]',
};

const StatusBadge = ({ status = 'past' }) => {
  const normalizedStatus = status?.toString().toLowerCase() || 'past';
  
  const currentStyle = statusStyles[normalizedStatus] || statusStyles.past;

  return (
    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${currentStyle}`}>
      {status ? status.toUpperCase() : 'PAST'}
    </span>
  );
};

export default StatusBadge;