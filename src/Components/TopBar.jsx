import { useState, useMemo, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Search,
  Briefcase,
  FileText,
  Users,
  Receipt,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui";
import { useAppNavigation } from "@/hooks";
import { logout } from "../store/slices";
import { Link } from "react-router-dom";

export default function TopBar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: projects } = useSelector((state) => state.projects);
  const { items: invoices } = useSelector((state) => state.invoices);
  const { items: clients } = useSelector((state) => state.clients);
  const { items: expenses } = useSelector((state) => state.expenses);
  const { goTo } = useAppNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  // close the dropdown if we clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results = [];

    // Search Projects
    if (projects?.length) {
      const filtered = projects.filter((p) =>
        p.title?.toLowerCase().includes(query),
      );
      if (filtered.length) {
        results.push({
          category: "Projects",
          icon: <Briefcase size={14} />,
          items: filtered
            .slice(0, 3)
            .map((p) => ({ id: p.id, title: p.title, path: "/projects" })),
        });
      }
    }

    // Search Clients
    if (clients?.length) {
      const filtered = clients.filter(
        (c) =>
          c.name?.toLowerCase().includes(query) ||
          c.company?.toLowerCase().includes(query) ||
          c.email?.toLowerCase().includes(query),
      );
      if (filtered.length) {
        results.push({
          category: "Clients",
          icon: <Users size={14} />,
          items: filtered.slice(0, 3).map((c) => ({
            id: c.id,
            title: c.name,
            sub: c.company,
            path: "/clients",
          })),
        });
      }
    }

    // Search Invoices
    if (invoices?.length) {
      const filtered = invoices.filter(
        (i) =>
          i.invoiceId?.toLowerCase().includes(query) ||
          i.projectId?.toLowerCase().includes(query),
      );
      if (filtered.length) {
        results.push({
          category: "Invoices",
          icon: <FileText size={14} />,
          items: filtered.slice(0, 3).map((i) => ({
            id: i.id,
            title: `Invoice #${i.invoiceId}`,
            path: "/invoices",
          })),
        });
      }
    }

    // Search Expenses
    if (expenses?.length) {
      const filtered = expenses.filter((e) =>
        e.title?.toLowerCase().includes(query),
      );
      if (filtered.length) {
        results.push({
          category: "Expenses",
          icon: <Receipt size={14} />,
          items: filtered
            .slice(0, 3)
            .map((e) => ({ id: e.id, title: e.title, path: "/expenses" })),
        });
      }
    }

    return results;
  }, [searchQuery, projects, clients, invoices, expenses]);

  return (
    <div
      className="sticky top-0 z-40 flex h-auto min-h-24 w-full flex-col-reverse items-center justify-between gap-4 border-b border-slate-50 bg-white/80 p-4 backdrop-blur-md md:flex-row md:gap-0 md:px-10 md:py-0"
      dir="ltr"
    >
      <div className="w-full md:max-w-xl md:flex-1">
        <div className="group relative" ref={searchRef}>
          <Search
            className="group-focus-within:text-brand-accent absolute top-1/2 left-5 -translate-y-1/2 text-slate-300 transition-colors"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder="Search projects, invoices, clients..."
            className="w-full rounded-[1.2rem] border border-transparent bg-slate-50/50 py-3 pr-6 pl-14 text-sm font-bold tracking-tight text-slate-600 transition-all outline-none focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50/50"
          />

          {/* Search Dropdown */}
          {isDropdownOpen && searchQuery.trim() !== "" && (
            <div className="absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
              {searchResults.length > 0 ? (
                <div className="max-h-96 overflow-y-auto p-2">
                  {searchResults.map((section, idx) => (
                    <div key={idx} className="mb-2 last:mb-0">
                      <div className="flex items-center gap-2 px-3 py-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        {section.icon}
                        {section.category}
                      </div>
                      <div className="space-y-1">
                        {section.items.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              goTo(item.path);
                              setIsDropdownOpen(false);
                              setSearchQuery("");
                            }}
                            className="cursor-pointer rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50"
                          >
                            <div className="text-sm font-bold text-slate-700">
                              {item.title}
                            </div>
                            {item.sub && (
                              <div className="text-xs text-slate-400">
                                {item.sub}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-xs font-bold text-slate-400">
                    No results found for "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-between md:w-auto md:justify-end md:gap-4">
        {/* Mobile Logo Only */}
        <div className="font-sans text-lg font-bold text-[#2D3184] md:hidden">
          Asterisk
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 md:hidden">
            <Link
              to="/settings"
              className="hover:text-brand-accent! rounded-2xl! p-3! text-slate-400! hover:bg-slate-50!"
            >
              <Settings size={20} />
            </Link>

            <Button
              variant="ghost"
              size="fit"
              icon={<LogOut size={20} />}
              className="hover:text-brand-accent! rounded-2xl! p-3! text-slate-400! hover:bg-slate-50!"
              onClick={() => dispatch(logout())}
            />
          </div>

          <div className="hidden h-10 w-px bg-slate-100 md:mx-2 md:block"></div>

          <Link
            to="/profile"
            className="group flex cursor-pointer items-center gap-4 rounded-2xl p-1.5 pl-2 transition-all hover:bg-slate-50/80"
          >
            <div className="hidden flex-col text-right sm:flex">
              <span className="group-hover:text-brand-accent mb-1 text-sm leading-none font-black tracking-tight text-[#1E293B] transition-colors">
                {user?.name || "Freelancer"}
              </span>
              <span className="text-muted text-[9px] font-black tracking-[0.15em] uppercase opacity-50">
                {user?.role || "Freelancer"}
              </span>
            </div>

            <div className="relative">
              <div className="h-10 w-10 overflow-hidden rounded-[1.1rem] border-2 border-white bg-indigo-50 shadow-sm transition-all group-hover:scale-105 group-hover:shadow-md md:h-12 md:w-12">
                <img
                  src={
                    user?.avatarUrl ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                  }
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-[3px] border-white bg-emerald-500 md:h-4 md:w-4 md:border-4"></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
