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

  return (
    <div className="animate-in fade-in mx-auto max-w-400 p-4 duration-500 lg:p-10">
      <PageHeader
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
    </div>
  );
}
