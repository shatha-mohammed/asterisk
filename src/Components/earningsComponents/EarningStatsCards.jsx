import { DollarSign, Percent, TrendingDown, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/ui";

const fmt = (n) =>
  `$${(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function EarningStatsCards({ totals }) {
  return (
    <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
      <StatCard
        title="Gross Invoiced"
        value={fmt(totals.gross)}
        trend="Total billed"
        icon={<DollarSign size={22} />}
      />
      <StatCard
        title="Commission"
        value={fmt(totals.commission)}
        trend="Platform fee"
        icon={<Percent size={22} />}
        isRed
      />
      <StatCard
        title="Expenses"
        value={fmt(totals.expenses)}
        trend="Business costs"
        icon={<TrendingDown size={22} />}
        isRed
      />
      <StatCard
        title="Net Earning"
        value={fmt(totals.net)}
        trend={totals.net >= 0 ? "Profit" : "Loss"}
        icon={<TrendingUp size={22} />}
        isRed={totals.net < 0}
      />
    </div>
  );
}
