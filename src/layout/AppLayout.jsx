import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar"; 

export default function AppLayout() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. السايد بار (ديسك توب فقط) */}
      <aside className="hidden md:block w-64 fixed inset-y-0 z-50">
        <Sidebar />
      </aside>

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* 2. توب بار (يظهر فقط في الديسك توب من مقاس md وأكبر) */}
        <div className="hidden md:block">
          <TopBar />
        </div>

        {/* 3. هيدر الموبايل البسيط (يظهر فقط في الموبايل) */}
        <header className="md:hidden bg-white p-4 flex justify-between items-center border-b border-slate-100 sticky top-0 z-20">
          <h1 className="text-[#2D3184] font-bold text-lg font-sans">Asterisk</h1>
          <img 
            src={user?.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"} 
            className="w-9 h-9 rounded-full border shadow-sm" 
            alt="Profile" 
          />
        </header>

        {/* 4. محتوى الصفحات */}
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          <Outlet /> 
        </main>

        {/* 5. البوتوم بار للموبايل */}
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}