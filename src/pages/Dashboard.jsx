// Dashboard.jsx — Main overview page showing stats, revenue chart, invoices, and projects.

import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Briefcase, FileText, Plus, DollarSign } from "lucide-react";

import {
  fetchProjects,
  fetchInvoices,
  fetchClients,
  fetchExpenses,
} from "@/store/slices";
import { PAGINATION } from "@/constants";
import { useAppNavigation } from "@/hooks";
import { Button, StatCard, PageHeader, LoadingState } from "@/components/ui";
import { ProjectCard, InvoicesTable, RevenueChart } from "@/components";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { goTo } = useAppNavigation();
  const { user } = useSelector((state) => state.auth);
  const {
    items: projects,
    isLoading,
    error,
  } = useSelector((state) => state.projects);
  const { items: invoices } = useSelector((state) => state.invoices);
  const { items: clients } = useSelector((state) => state.clients);
  const [chartRange, setChartRange] = useState("6M");

  // Always re-fetch on mount to avoid stale data after CRUD operations
  useEffect(() => {
    dispatch(fetchProjects({ page: 1, limit: PAGINATION.DASHBOARD }));
    // Fetch ALL invoices and expenses so the Total Earnings stat is globally accurate
    dispatch(fetchInvoices({ page: 1, limit: PAGINATION.ALL }));
    dispatch(fetchExpenses({ page: 1, limit: PAGINATION.ALL }));
    dispatch(fetchClients({ page: 1, limit: PAGINATION.ALL }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Creates an lookup map for clients to prevent nested loop performance bottlenecks during rendering.
  const clientMap = useMemo(() => {
    const map = new Map();
    clients?.forEach((c) => map.set(c.id, c));
    return map;
  }, [clients]);

  // Calculate dashboard stats only when invoices, projects, or expenses change
  const stats = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Sum all paid invoices this month
    const thisMonthIncome =
      invoices
        ?.filter((inv) => {
          if (inv.status !== "paid") return false;
          return new Date(inv.date || inv.createdAt) >= startOfMonth;
        })
        .reduce((acc, inv) => acc + (inv.amount || 0), 0) || 0;

    return {
      income: thisMonthIncome,
      activeCount: projects?.filter((p) => p.status === "active").length || 0,
      pendingInvoices:
        invoices?.filter((inv) => inv.status === "pending").length || 0,
    };
  }, [invoices, projects]);

  if (isLoading) return <LoadingState message="Initializing Asterisk..." />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <p className="mb-4 text-2xl font-black text-red-500">
          Something went wrong
        </p>
        <p className="text-muted text-sm">{error}</p>
        <Button
          text="Try Again"
          onClick={() => window.location.reload()}
          className="mt-6"
        />
      </div>
    );

  return (
    <div className="animate-in fade-in mx-auto max-w-400 p-4 duration-500 lg:p-10">
      <PageHeader
        title={`Hi, ${user?.name?.split(" ")[0] || "Designer"}!`}
        subtitle="Freelancer Flow Overview"
        action={
          <Button
            text="Add New Project"
            icon={<Plus size={20} />}
            onClick={() => goTo("/add-project")}
          />
        }
      />

      {/* Stat cards */}
      <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        <StatCard
          title="Active Projects"
          value={stats.activeCount}
          trend="In progress"
          icon={<Briefcase size={22} />}
        />
        <StatCard
          title="This Month's Income"
          value={`$${stats.income.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          trend="Gross invoiced"
          icon={<DollarSign size={22} />}
        />
        <StatCard
          title="Pending"
          value={stats.pendingInvoices}
          trend="Follow-ups"
          icon={<FileText size={22} />}
          isRed
        />
      </div>

      {/* Revenue chart */}
      <div className="mb-16 overflow-hidden rounded-[3rem] border border-slate-50 bg-white p-10 shadow-sm lg:p-12">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black tracking-tight text-indigo-900">
              Revenue Growth
            </h3>
            <p className="text-muted/50 text-[10px] font-black tracking-widest uppercase">
              Performance metrics
            </p>
          </div>
          <div className="flex gap-2 rounded-2xl bg-slate-50 p-2">
            {["6M", "1Y"].map((r) => (
              <Button
                key={r}
                text={r}
                size="md"
                onClick={() => setChartRange(r)}
                variant={chartRange === r ? "white" : "ghost"}
                className={`m-0! p-0! text-[10px] font-black max-md:w-fit! md:px-6! md:py-2.5! ${chartRange !== r && "opacity-40"}`}
              />
            ))}
          </div>
        </div>
        <RevenueChart invoices={invoices} range={chartRange} />
      </div>

      {/* Recent invoices */}
      <div className="mb-16">
        <div className="mb-8 flex items-center justify-between px-4">
          <h2 className="text-2xl font-black tracking-tight text-indigo-900">
            Recent Invoices
          </h2>
          <Button
            text="View All"
            variant="ghost"
            size="sm"
            onClick={() => goTo("/invoices")}
            className="text-brand-accent text-[10px] font-black tracking-[0.2em]"
          />
        </div>
        <InvoicesTable invoices={invoices?.slice(0, 4)} />
      </div>

      {/* Active projects */}
      <div>
        <div className="mb-8 flex items-center justify-between px-4">
          <h2 className="text-2xl font-black tracking-tight text-indigo-900">
            Active Projects
          </h2>
          <Button
            text="View all"
            variant="ghost"
            size="sm"
            onClick={() => goTo("/projects")}
            className="text-[10px] tracking-[0.2em]"
          />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {projects?.slice(0, 3).map((p) => (
            <ProjectCard
              key={p.id}
              project={{
                name: p.title,
                client: clientMap.get(p.clientId)?.name || "Client",
                budget: p.budget || "0.00",
                deadline: p.dueDate
                  ? new Date(p.dueDate).toLocaleDateString("en-GB")
                  : "No deadline",
                status: p.status || "active",
                updatedAt: p.updatedAt,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
