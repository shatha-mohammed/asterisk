import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function MainLayout() {
  return (
    <div className="px-4 lg:px-24">
      <Header />
      <div className="h-16"></div>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
