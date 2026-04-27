import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../store/slices/invoicesSlice';
import { Plus, Wallet, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from "../components/ui/Button";
import StatCard from "../components/ui/StatCard";
import InvoicesTable from "../components/InvoicesTable"; 

const Invoices = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.invoices);

  useEffect(() => {
    dispatch(fetchInvoices({ page: 1 }));
  }, [dispatch]);

  const stats = {
    total: items?.reduce((acc, inv) => acc + (inv.amount || 0), 0) || 0,
    paid: items?.filter(inv => inv.status === 'paid').reduce((acc, inv) => acc + (inv.amount || 0), 0) || 0,
    pending: items?.filter(inv => inv.status === 'pending').reduce((acc, inv) => acc + (inv.amount || 0), 0) || 0,
  };

  if (isLoading) return <div className="p-20 text-center font-black text-brand-accent animate-pulse uppercase tracking-widest">Syncing Data...</div>;

  return (
    <div className="max-w-[1600px] mx-auto p-4 lg:p-10 animate-in fade-in duration-500">
      
      {/* 1. Header */}
      <div className="lg:flex lg:justify-between lg:items-end mb-10">
        <div>
          <h1 className="text-3xl lg:text-5xl font-black  text-indigo-900 tracking-tight">Invoices</h1>
          <p className="text-muted text-sm mt-2 font-bold uppercase tracking-[0.2em] opacity-60">Revenue Flow</p>
        </div>
      <Button 
  text="Create Invoice" 
  icon={<Plus size={18} />} 
  onClick={() => {}}
  variant="primary" 
  size="md" 
  className="mt-8 lg:mt-0" 
/>
     </div>

      {/* 2. Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard title="Total Billed" value={stats.total} icon={<Wallet size={22}/>} />
        <StatCard title="Pending" value={stats.pending} icon={<AlertCircle size={22}/>} variant="danger" />
        <StatCard title="Net Paid" value={stats.paid} icon={<CheckCircle2 size={22}/>} variant="accent" />
      </div>

      <InvoicesTable invoices={items} />

    </div>
  );
};

export default Invoices;