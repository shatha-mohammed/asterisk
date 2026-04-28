import React from 'react';
import { MoreHorizontal, FileText, ChevronLeft, ChevronRight, Mail, DollarSign } from 'lucide-react';
import StatusBadge from './ui/StatusBadge';

const ClientsTable = ({ clients = [], isLoading = false }) => {
  const dummyData = [
    { id: 1, initials: 'SH', name: 'Sarah Henderson', email: 'sarah@nexustech.io', company: 'Nexus Tech Solutions', projects: 12, revenue: 45200.00, status: 'Active' },
    { id: 2, initials: 'MK', name: 'Marcus Knight', email: 'marcus@knightventures.com', company: 'Knight Ventures', projects: 2, revenue: 8500.00, status: 'Lead' },
  ];

  const displayData = (clients && Array.isArray(clients) && clients.length > 0) ? clients : dummyData;

  if (isLoading) return <div className="h-64 flex items-center justify-center animate-pulse text-gray-400">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {displayData.map((client) => (
          <div key={client.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold text-xs">
                  {client.initials || client.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{client.name}</h3>
                  <p className="text-[11px] text-gray-400">{client.email}</p>
                </div>
              </div>
              <StatusBadge status={client.status} />
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Company</p>
                <p className="text-xs font-medium text-gray-600">{client.company}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Revenue</p>
                <p className="text-xs font-bold text-[#2D3184]">${client.revenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#F9FAFB] border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase">Client</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase">Company</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase text-right">Revenue</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase text-center">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {displayData.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold text-[10px]">
                      {client.initials}
                    </div>
                    <div className="text-sm font-bold text-gray-900">{client.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{client.company}</td>
                <td className="px-6 py-4 text-right text-sm font-bold">${client.revenue.toLocaleString()}</td>
                <td className="px-6 py-4 text-center"><StatusBadge status={client.status} /></td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination - Simplified for Mobile */}
      <div className="flex items-center justify-between px-2 md:px-0">
         <button className="text-xs font-bold text-[#4F46E5] md:hidden">View All</button>
      </div>
    </div>
  );
};

export default ClientsTable;