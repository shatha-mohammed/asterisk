import { useMemo } from "react";

export default function RevenueChart({ invoices = [], range = "6M" }) {
  const chartData = useMemo(() => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentDate = new Date();
    const monthsData = [];
    const monthsCount = range === "1Y" ? 12 : 6;

    // get months to show
    for (let i = monthsCount - 1; i >= 0; i--) {
      const d = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1,
      );
      monthsData.push({
        monthIndex: d.getMonth(),
        year: d.getFullYear(),
        label: monthNames[d.getMonth()],
        total: 0,
      });
    }

    // if there is no invoices
    if (!invoices || invoices.length === 0) {
      return monthsData.map((m) => ({
        m: m.label,
        h: "5%",
        active: false,
        totalAmount: 0,
      }));
    }

    // calculate total month invoices amount
    invoices.forEach((inv) => {
      const invDate = new Date(inv.date || inv.createdAt);
      const m = invDate.getMonth();
      const y = invDate.getFullYear();

      const targetMonth = monthsData.find(
        (obj) => obj.monthIndex === m && obj.year === y,
      );

      if (targetMonth && inv.status !== "cancelled") {
        targetMonth.total += inv.amount || 0;
      }
    });

    // get the max month total amount
    const maxTotal = Math.max(...monthsData.map((m) => m.total));

    // return the final result
    return monthsData.map((item) => {
      const heightPercent =
        maxTotal === 0 ? 5 : Math.round((item.total / maxTotal) * 100);

      return {
        m: item.label,
        h: `${heightPercent}%`,
        active: item.total === maxTotal && maxTotal > 0,
        totalAmount: item.total,
      };
    });
  }, [invoices, range]);

  return (
    <div className="flex h-64 w-full items-end justify-between gap-2 overflow-x-auto border-b border-slate-100 px-2 pb-6 md:gap-6 md:overflow-hidden">
      {chartData.map((item, i) => (
        <div
          key={i}
          title={`Total: $${item.totalAmount.toLocaleString()}`}
          className="group flex h-full min-w-8 flex-1 cursor-pointer flex-col items-center justify-end gap-3 md:min-w-0"
        >
          <div
            style={{ height: item.h }}
            className={`w-full max-w-12 rounded-t-lg transition-all duration-700 md:rounded-t-2xl ${
              item.active
                ? "bg-brand-accent shadow-xl shadow-indigo-100"
                : "bg-slate-100 group-hover:bg-indigo-50"
            }`}
          ></div>
          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
            {item.m}
          </span>
        </div>
      ))}
    </div>
  );
}
