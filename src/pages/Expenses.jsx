import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../store/slices/expensesSlice';
import { Plus, Receipt, TrendingDown, Calendar } from 'lucide-react';
import Button from "../components/ui/Button";
import StatCard from "../components/ui/StatCard";

const Expenses = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses({ page: 1 }));
  }, [dispatch]);

  const totalExpenses = items?.reduce((acc, exp) => acc + (exp.amount || 0), 0) || 0;

  if (isLoading) return <div className="p-20 text-center font-black text-brand-accent animate-pulse uppercase tracking-widest">Loading Expenses...</div>;

  return (
    <div className="max-w-[1600px] mx-auto p-4 lg:p-10 animate-in fade-in duration-500">
      
      {/* 1. Header */}
      <div className="lg:flex lg:justify-between lg:items-end mb-10">
        <div>
          <h1 className="text-3xl lg:text-5xl font-black text-indigo-900 tracking-tight">Expenses</h1>
          <p className="text-muted text-sm mt-2 font-bold uppercase tracking-[0.2em] opacity-60">Business Costs & Outgoings</p>
        </div>
        <Button text="Add Expense" icon={<Plus size={20} />} onClick={() => {}} variant="primary" className="mt-8 lg:mt-0" />
      </div>

      {/* 2. Stats Card - عرض إجمالي المصاريف */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard 
          title="Total Expenses" 
          value={`$${totalExpenses.toLocaleString()}`} 
          icon={<TrendingDown size={22}/>} 
          variant="danger" // لأنها أموال خارجة
        />
      </div>

      {/* 3. Expenses List/Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-4 lg:p-10">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black text-muted uppercase tracking-[0.2em] border-b border-slate-50">
              <th className="py-6 px-4">Category</th>
              <th className="py-6 px-4">Description</th>
              <th className="py-6 px-4">Date</th>
              <th className="py-6 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {items?.map(exp => (
              <tr key={exp.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="py-7 px-4">
                  <span className="px-4 py-2 rounded-xl bg-slate-100 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                    {exp.category || 'General'}
                  </span>
                </td>
                <td className="py-7 px-4 font-black text-[#1E293B] text-sm">{exp.description}</td>
                <td className="py-7 px-4 text-xs text-slate-500 font-black uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="opacity-30" />
                    {new Date(exp.date).toLocaleDateString('en-GB')}
                  </div>
                </td>
                <td className="py-7 px-4 font-black text-red-500 text-right text-base">
                  -${exp.amount?.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;