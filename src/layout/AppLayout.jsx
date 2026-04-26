export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <div className="w-60 bg-slate-900 p-4">Sidebar</div>

      <div className="flex-1">
        <div className="h-15 bg-slate-900 p-4">Navbar</div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
