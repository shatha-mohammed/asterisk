import React from 'react';
import { MoreVertical } from 'lucide-react';

const InvoiceRow = ({ inv }) => (
  <tr className="hover:bg-slate-50/50 transition-all group">
    <td className="py-7 px-4 font-black text-brand-accent text-sm">#{inv.invoiceId}</td>
    <td className="py-7 px-4">
      <p className="font-black text-[#1E293B] text-sm tracking-tight mb-1">Project {inv.projectId}</p>
      <p className="text-[10px] text-muted font-bold opacity-50 uppercase">ID: {inv.clientId}</p>
    </td>
    <td className="py-7 px-4 text-xs text-slate-500 font-black uppercase tracking-widest">
      {new Date(inv.dueDate).toLocaleDateString('en-GB')}
    </td>
    <td className="py-7 px-4 font-black text-[#1E293B] text-right text-base">
      ${inv.amount?.toLocaleString()}
    </td>
    <td className="py-7 px-4 text-center">
      <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${
        inv.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
      }`}>
        {inv.status}
      </span>
    </td>
    <td className="py-7 px-4 text-right">
     <button className="p-2 text-slate-300 hover:text-brand-accent hover:bg-slate-50 rounded-full transition-all duration-300">
  <MoreVertical size={20}/>
</button>
    </td>
  </tr>
);

const InvoicesTable = ({ invoices }) => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden mb-10 p-4 lg:p-10">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black text-muted uppercase tracking-[0.2em] border-b border-slate-50">
              <th className="py-6 px-4">Invoice</th>
              <th className="py-6 px-4">Project</th>
              <th className="py-6 px-4">Due Date</th>
              <th className="py-6 px-4 text-right">Amount</th>
              <th className="py-6 px-4 text-center">Status</th>
              <th className="py-6 px-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {invoices?.length > 0 ? (
              invoices.map(inv => <InvoiceRow key={inv.id} inv={inv} />)
            ) : (
              <tr>
                <td colSpan="6" className="py-20 text-center text-slate-300 font-black uppercase tracking-widest text-xs">
                  No Invoices Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesTable;