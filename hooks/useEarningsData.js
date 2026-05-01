import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoices, fetchExpenses, fetchProjects } from "@/store/slices";
import { PAGINATION } from "@/constants";

const ROWS_PER_PAGE = 6;

export function useEarningsData() {
  const dispatch = useDispatch();
  const { items: invoices, isLoading: invoicesLoading } = useSelector((s) => s.invoices);
  const { items: expenses, isLoading: expensesLoading } = useSelector((s) => s.expenses);
  const { items: projects, isLoading: projectsLoading } = useSelector((s) => s.projects);

  const [monthFilter, setMonthFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchInvoices({ page: 1, limit: PAGINATION.ALL }));
    dispatch(fetchExpenses({ page: 1, limit: PAGINATION.ALL }));
    dispatch(fetchProjects({ page: 1, limit: PAGINATION.ALL }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectMap = useMemo(() => {
    const map = new Map();
    projects?.forEach((p) => map.set(p.id, p));
    return map;
  }, [projects]);

  const monthlyData = useMemo(() => {
    const buckets = {};

    (invoices?.filter((inv) => inv.status === "paid") || []).forEach((inv) => {
      const date = new Date(inv.date || inv.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (!buckets[key])
        buckets[key] = {
          label: date.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
          monthKey: key,
          gross: 0,
          commission: 0,
          expenses: 0,
          date,
        };
      const amount = inv.amount || 0;
      const rate = (projectMap.get(inv.projectId)?.commission || 0) / 100;
      buckets[key].gross += amount;
      buckets[key].commission += amount * rate;
    });

    (expenses || []).forEach((exp) => {
      const date = new Date(exp.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (!buckets[key])
        buckets[key] = {
          label: date.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
          monthKey: key,
          gross: 0,
          commission: 0,
          expenses: 0,
          date,
        };
      buckets[key].expenses += exp.amount || 0;
    });

    return Object.values(buckets)
      .map((m) => ({ ...m, net: m.gross - m.commission - m.expenses }))
      .sort((a, b) => b.date - a.date);
  }, [invoices, expenses, projectMap]);

  const filteredData = useMemo(
    () => (monthFilter ? monthlyData.filter((r) => r.monthKey === monthFilter) : monthlyData),
    [monthlyData, monthFilter],
  );

  const totals = useMemo(
    () =>
      filteredData.reduce(
        (acc, r) => ({
          gross: acc.gross + r.gross,
          commission: acc.commission + r.commission,
          expenses: acc.expenses + r.expenses,
          net: acc.net + r.net,
        }),
        { gross: 0, commission: 0, expenses: 0, net: 0 },
      ),
    [filteredData],
  );

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ROWS_PER_PAGE));
  const paginatedData = filteredData.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);
  const monthOptions = monthlyData.map((r) => ({ value: r.monthKey, label: r.label }));
  const isLoading = invoicesLoading || expensesLoading || projectsLoading;

  const handleMonthChange = (e) => {
    setMonthFilter(e.target.value);
    setPage(1);
  };

  return {
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
  };
}
