import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="px-4 lg:px-24">
      <Header />
      <div className="h-16"></div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
