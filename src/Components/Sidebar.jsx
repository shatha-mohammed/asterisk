import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LayoutDashboard, Briefcase, FileText, Receipt, Users, Settings, LogOut, DollarSign } from "lucide-react";

import { logout } from "@/store/slices";
import { Button, Logo } from "@/components/ui";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "Projects", path: "/projects", icon: <Briefcase size={20} /> },
    { name: "Invoices", path: "/invoices", icon: <FileText size={20} /> },
    { name: "Earnings", path: "/earnings", icon: <DollarSign size={20} /> },
    { name: "Clients", path: "/clients", icon: <Users size={20} /> },
    { name: "Expenses", path: "/expenses", icon: <Receipt size={20} /> },
  ];

  return (
    <div className="sticky top-0 flex h-screen w-72 flex-col border-r border-slate-100 bg-white p-8">
      <div className="mb-12 px-2">
        <Logo />
      </div>

      {user && (
        <div className="mb-10 flex items-center gap-4 rounded-3xl border border-slate-50 bg-slate-50/50 p-4 px-2">
          <img
            src={
              user.avatarUrl ||
              "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
            }
            alt="Avatar"
            className="h-11 w-11 rounded-2xl object-cover shadow-sm"
          />
          <div className="overflow-hidden">
            <h2 className="truncate text-sm font-black text-slate-800">
              {user.name}
            </h2>
            <p className="text-muted text-[10px] font-bold tracking-wider uppercase opacity-60">
              Admin Account
            </p>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-black transition-all duration-300 ${
                isActive
                  ? "text-brand-accent bg-indigo-50 shadow-sm shadow-indigo-100/20"
                  : "text-muted hover:text-brand-accent opacity-70 hover:bg-slate-50 hover:opacity-100"
              } `
            }
          >
            <span className="transition-transform duration-300">
              {item.icon}
            </span>
            <span className="tracking-tight">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-6">
        <div className="space-y-1 border-t border-slate-50 pt-6">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex w-full items-center gap-4 rounded-xl px-5 py-3 text-sm font-bold transition-all ${isActive ? "text-brand-accent bg-slate-50" : "text-muted opacity-60 hover:text-slate-800 hover:opacity-100"} `
            }
          >
            <Settings size={18} /> Settings
          </NavLink>

          <Button
            text="Logout"
            icon={<LogOut size={18} />}
            variant="ghost"
            size="full"
            onClick={() => dispatch(logout())}
            className="text-muted justify-start gap-4 border-none px-5 py-3 text-sm font-bold opacity-60 transition-all hover:text-red-500 hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
