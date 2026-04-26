export default function AppLayout({ children }) {
  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <div className="w-[240px] bg-slate-900 p-4">
        Sidebar
      </div>

      <div className="flex-1">
        <div className="h-[60px] bg-slate-900 p-4">
          Navbar
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}