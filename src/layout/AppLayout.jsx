import { Outlet } from "react-router-dom";
import { Sidebar, BottomNav, TopBar } from "@/components";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. Sidebar (Desktop only) */}
      <aside className="fixed inset-y-0 z-50 hidden w-72 md:block">
        <Sidebar />
      </aside>

      <div className="flex min-h-screen flex-1 flex-col md:ml-72">
        {/* 2. TopBar (Responsive) */}
        <div className="sticky top-0 z-40">
          <TopBar />
        </div>

        {/* 3. Page Content */}
        <main className="max-w-screen flex-1 p-4 pb-24 md:p-8 md:pb-8">
          <Outlet />
        </main>

        {/* 4. Bottom Nav for mobile */}
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
