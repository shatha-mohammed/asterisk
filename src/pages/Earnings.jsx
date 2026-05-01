<<<<<<< HEAD
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader, LoadingState } from "@/components/ui";
import {
  EarningStatsCards,
  EarningMonthFilter,
  EarningMobileCards,
  EarningTable,
} from "@/components/earningsComponents";
import { useEarningsData } from "@/hooks/useEarningsData";

export default function Earnings() {
  const {
    isLoading,
    monthlyData,
    paginatedData,
    totals,
    monthFilter,
    monthOptions,
    page,
    totalPages,
    setPage,
    handleMonthChange,
  } = useEarningsData();

  if (isLoading && monthlyData.length === 0)
    return <LoadingState message="Calculating Earnings..." />;
=======
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoices, fetchExpenses } from "@/store/slices";
import { TAX_RATE, PAGINATION } from "@/constants";
import { PageHeader, LoadingState } from "@/components/ui";

export default function Earnings() {
  const dispatch = useDispatch();
  const { items: invoices, isLoading: invoicesLoading } = useSelector(
    (state) => state.invoices,
  );
  const { items: expenses, isLoading: expensesLoading } = useSelector(
    (state) => state.expenses,
  );

  useEffect(() => {
    dispatch(fetchInvoices({ page: 1, limit: PAGINATION.ALL }));
    dispatch(fetchExpenses({ page: 1, limit: PAGINATION.ALL }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const monthlyData = useMemo(() => {
    const dataByMonth = {};

    // Aggregates paid invoices into monthly buckets (YYYY-MM) to calculate the gross revenue time-series data.
    const paidInvoices = invoices?.filter((inv) => inv.status === "paid") || [];
    paidInvoices.forEach((inv) => {
      const date = new Date(inv.date || inv.createdAt);
      // make the month be like: 04-2026
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!dataByMonth[monthKey]) {
        dataByMonth[monthKey] = {
          label: date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
          gross: 0,
          expenses: 0,
          date: date,
        };
      }
      // calculate month gross
      dataByMonth[monthKey].gross += inv.amount || 0;
    });

    // Aggregates expenses into monthly buckets (YYYY-MM) to calculate revenue and expense data for accurate Net Profit calculation.
    const allExpenses = expenses || [];
    allExpenses.forEach((exp) => {
      const date = new Date(exp.date);
      // make the month be like: 04-2026
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!dataByMonth[monthKey]) {
        dataByMonth[monthKey] = {
          label: date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
          gross: 0,
          expenses: 0,
          date: date,
        };
      }
      // calculate month expenses
      dataByMonth[monthKey].expenses += exp.amount || 0;
    });

    // Convert object to array, calculate net, and sort by date descending
    const result = Object.values(dataByMonth).map((month) => {
      const net = month.gross * (1 - TAX_RATE) - month.expenses;
      return { ...month, net };
    });

    result.sort((a, b) => b.date - a.date);

    return result;
  }, [invoices, expenses]);

  const isLoading = invoicesLoading || expensesLoading;

  if (isLoading && monthlyData.length === 0) {
    return <LoadingState message="Calculating Earnings..." />;
  }

  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b

  return (
    <div className="animate-in fade-in mx-auto max-w-400 p-4 duration-500 lg:p-10">
      <PageHeader
<<<<<<< HEAD
        title="Earnings"
        subtitle="Revenue, Commission & Net Breakdown"
        action={
          <EarningMonthFilter
            value={monthFilter}
            onChange={handleMonthChange}
            options={monthOptions}
          />
        }
      />

      <EarningStatsCards totals={totals} />

      <EarningMobileCards rows={paginatedData} />

      <EarningTable
        rows={paginatedData}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      {/* Mobile pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between md:hidden">
          <span className="text-xs font-bold text-slate-400">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            {[
              {
                icon: ChevronLeft,
                disabled: page <= 1,
                go: (p) => Math.max(1, p - 1),
              },
              {
                icon: ChevronRight,
                disabled: page >= totalPages,
                go: (p) => Math.min(totalPages, p + 1),
              },
            ].map(({ icon: Icon, disabled, go }) => (
              <button
                key={go.toString()}
                disabled={disabled}
                onClick={() => setPage(go)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-indigo-400 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      )}
=======
        title="Earnings Report"
        subtitle="Monthly Revenue & Expenses"
      />

      <div className="overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-4 shadow-sm lg:p-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-muted border-b border-slate-50 text-[10px] font-black tracking-[0.2em] uppercase">
                <th className="px-4 py-6">Month</th>
                <th className="px-4 py-6 text-right">Gross Invoiced</th>
                <th className="px-4 py-6 text-right">Expenses</th>
                <th className="px-4 py-6 text-right">Net Earning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {monthlyData.length > 0 ? (
                monthlyData.map((row, index) => (
                  <tr
                    key={index}
                    className="group transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-7 text-sm font-black text-slate-800">
                      {row.label}
                    </td>
                    <td className="px-4 py-7 text-right text-sm font-bold text-slate-500">
                      {formatCurrency(row.gross)}
                    </td>
                    <td className="px-4 py-7 text-right text-sm font-bold text-red-500">
                      -{formatCurrency(row.expenses)}
                    </td>
                    <td
                      className={`px-4 py-7 text-right text-base font-black ${row.net >= 0 ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {formatCurrency(row.net)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-20 text-center text-xs font-black tracking-widest text-slate-300 uppercase"
                  >
                    No Earnings Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
    </div>
  );
}
