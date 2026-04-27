import { Outlet } from "react-router-dom";
import {
  Asterisk,
  LayoutDashboardIcon,
  ReceiptTextIcon,
  FolderCode,
  UsersRound,
} from "lucide-react";

export default function AuthLayout() {
  const featuresData = [
    {
      icon: LayoutDashboardIcon,
      title: "Centralized Workspace",
      desc: "Track your active projects, pending invoices, and monthly revenue in one unified, high-performance dashboard tailored for freelancers.",
    },
    {
      icon: ReceiptTextIcon,
      title: "Financial Control",
      desc: "Generate professional invoices, track daily expenses, and monitor your profit margins effortlessly without touching a spreadsheet.",
    },
    {
      icon: FolderCode,
      title: "Project Mastery",
      desc: "Manage project statuses, set clear deadlines, and keep your client deliverables organized. Never miss a deadline again.",
    },
    {
      icon: UsersRound,
      title: "Client Management",
      desc: "Build a powerful client database with contact details, company info, and project history, all accessible in seconds.",
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-white">
      <div className="hidden w-1/2 flex-col justify-between bg-indigo-800 p-12 text-white lg:flex">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-2xl text-indigo-900">
            <Asterisk className="text-indigo-800" />
          </div>
          <span className="text-2xl font-bold">Asterisk</span>
        </div>

        {/* Features */}
        <div className="my-auto max-w-[85%]">
          <h1 className="text-4xl leading-14 font-bold">
            Everything you need to scale your freelance career.
          </h1>
          <div className="mt-12 flex flex-col gap-8">
            {featuresData.map((f) => {
              return (
                <div key={f.title} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
                    <f.icon size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {f.title}
                    </h2>
                    <p className="text-mutedInd mt-1 text-sm">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-indigo-400">
          © 2026 Asterisk. All rights reserved.
        </div>
      </div>

      {/* Login / Register */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md px-8 py-12 sm:px-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
