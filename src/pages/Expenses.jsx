import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses, deleteExpense, updateExpense } from "@/store/slices";
import { Plus, TrendingDown, Calendar, Filter, Receipt } from "lucide-react";
import { useAppNavigation, useCrudModals } from "@/hooks";
import { PAGINATION } from "@/constants";
import {
  Button,
  StatCard,
  Pagination,
  ActionButtons,
  DeleteConfirmModal,
  EditModal,
  LoadingState,
  PageHeader,
} from "@/components/ui";
import toast from "react-hot-toast";

const Expenses = () => {
  const dispatch = useDispatch();
  const { goTo } = useAppNavigation();
  const { items, pagination, isLoading } = useSelector(
    (state) => state.expenses,
  );
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("");
  const { deleteModal, editModal } = useCrudModals();

  // Re-fetch when page changes
  useEffect(() => {
    dispatch(fetchExpenses({ page, limit: PAGINATION.LIST }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Date filter
  const filteredItems = useMemo(() => {
    if (!items || !dateFilter) return items || [];
    const cutoff = new Date();
    const offsets = {
      "7d": () => cutoff.setDate(cutoff.getDate() - 7),
      "1m": () => cutoff.setMonth(cutoff.getMonth() - 1),
      "3m": () => cutoff.setMonth(cutoff.getMonth() - 3),
      "6m": () => cutoff.setMonth(cutoff.getMonth() - 6),
      "1y": () => cutoff.setFullYear(cutoff.getFullYear() - 1),
    };
    offsets[dateFilter]?.();
    return items.filter((exp) => new Date(exp.date) >= cutoff);
  }, [items, dateFilter]);

  // Month-over-month expense stats
  const stats = useMemo(() => {
    if (!items) return { thisMonth: 0, lastMonth: 0, diff: 0 };
    const now = new Date();
    const startThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endLastMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
    );
    let thisMonth = 0,
      lastMonth = 0;
    items.forEach((exp) => {
      const d = new Date(exp.date);
      if (d >= startThisMonth) thisMonth += exp.amount || 0;
      else if (d >= startLastMonth && d <= endLastMonth)
        lastMonth += exp.amount || 0;
    });
    const diff =
      lastMonth === 0 && thisMonth > 0
        ? 100
        : lastMonth > 0
          ? ((thisMonth - lastMonth) / lastMonth) * 100
          : 0;
    return { thisMonth, lastMonth, diff };
  }, [items]);

  if (isLoading && !items?.length)
    return <LoadingState message="Loading Expenses..." />;

  const fmt = (n) =>
    `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="animate-in fade-in mx-auto max-w-400 p-4 duration-500 lg:p-10">
      <PageHeader
        title="Expenses"
        subtitle="Business Costs & Outgoings"
        action={
          <div className="flex items-center gap-4">
            {/* Date range filter dropdown */}
            <div className="relative">
              <Filter
                size={14}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
              />
              <select
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setPage(1);
                }}
                className="appearance-none rounded-xl border border-slate-200 bg-white py-3 pr-10 pl-10 text-xs font-bold text-slate-600 focus:border-indigo-400 focus:outline-none"
              >
                <option value="">All Time</option>
                <option value="7d">Last 7 Days</option>
                <option value="1m">Last 1 Month</option>
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last 1 Year</option>
              </select>
            </div>
            <Button
              text="Add Expense"
              icon={<Plus size={20} />}
              onClick={() => goTo("/add-expense")}
              variant="primary"
            />
          </div>
        }
      />

      {/* Stats row */}
      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        <StatCard
          title="This Month"
          value={fmt(stats.thisMonth)}
          icon={<TrendingDown size={22} />}
          isRed
        />
        <StatCard
          title="Last Month"
          value={fmt(stats.lastMonth)}
          icon={<Calendar size={22} />}
          isRed
        />
        <StatCard
          title="vs Last Month"
          value={`${Math.abs(stats.diff).toFixed(1)}%`}
          trend={
            stats.diff > 0
              ? "Increased"
              : stats.diff < 0
                ? "Decreased"
                : "No Change"
          }
          icon={<TrendingDown size={22} />}
          isRed={stats.diff > 0}
        />
      </div>

      {/* Mobile cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredItems.map((exp) => (
          <div
            key={exp.id}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                  <Receipt size={16} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {exp.title}
                  </h3>
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    {new Date(exp.date).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
              <span className="text-sm font-black text-red-500">
                -${exp.amount?.toLocaleString()}
              </span>
            </div>
            <div className="mt-3 flex justify-end border-t border-slate-50 pt-2">
              <ActionButtons
                onEdit={() => editModal.open(exp)}
                onDelete={() => deleteModal.open(exp)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-4 shadow-sm md:block lg:p-10">
        <table className="w-full text-left">
          <thead>
            <tr className="text-muted border-b border-slate-50 text-[10px] font-black tracking-[0.2em] uppercase">
              <th className="px-4 py-6">Title</th>
              <th className="px-4 py-6">Date</th>
              <th className="px-4 py-6 text-right">Amount</th>
              <th className="px-4 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredItems.length > 0 ? (
              filteredItems.map((exp) => (
                <tr key={exp.id} className="group hover:bg-slate-50/50">
                  <td className="px-4 py-7 text-sm font-black text-slate-800">
                    {exp.title}
                  </td>
                  <td className="px-4 py-7 text-xs font-bold text-slate-500">
                    {new Date(exp.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-7 text-right text-base font-black text-red-500">
                    -${exp.amount?.toLocaleString()}
                  </td>
                  <td className="px-4 py-7 text-right">
                    <ActionButtons
                      onEdit={() => editModal.open(exp)}
                      onDelete={() => deleteModal.open(exp)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-20 text-center text-xs font-black tracking-widest text-slate-300 uppercase"
                >
                  No Expenses Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <Pagination pagination={pagination} onPageChange={setPage} />
      )}

      {/* Delete modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        itemName={deleteModal.item?.title || "Expense"}
        onConfirm={() => {
          dispatch(deleteExpense(deleteModal.item.id))
            .unwrap()
            .then(() => {
              toast.success("Expense deleted!");
              deleteModal.close();
            })
            .catch((err) => toast.error("Failed to delete: " + err));
        }}
      />

      {/* Edit modal */}
      <EditModal
        key={editModal.item?.id || "empty"}
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        itemName={editModal.item?.title || "Expense"}
        itemData={editModal.item}
        onSave={(data) => {
          dispatch(
            updateExpense({
              id: editModal.item.id,
              updatedData: { ...data, amount: parseFloat(data.amount) || 0 },
            }),
          )
            .unwrap()
            .then(() => {
              toast.success("Expense updated!");
              editModal.close();
            })
            .catch((err) => toast.error("Failed to update: " + err));
        }}
      />
    </div>
  );
};

export default Expenses;
