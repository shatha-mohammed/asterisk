import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AppLayout from "./layout/AppLayout"; 
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard.jsx"; 
import Reports from "./pages/Reports";
import Invoices from "./pages/Invoices"; 
import Expenses from './pages/Expenses'; 
import ClientsPage from './pages/ClientsPage';
import AddProjectPage from './pages/AddProjectPage';

export default function App() {
  return (
    <Routes>
      {/* المسارات العامة - Landing Page */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* مسارات التطبيق - بعد تسجيل الدخول */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/expenses" element={<Expenses />} /> 
        <Route path="/reports" element={<Reports />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/projects" element={<AddProjectPage />} />
        <Route path="/add-project" element={<AddProjectPage />} />
        {/* توجيه أي مسار خطأ داخل الـ App إلى الداشبورد */}
        <Route path="/app" element={<Navigate to="/dashboard" replace />} />
        </Route>
          {/* توجيه عام لأي مسار غير معروف */}
         <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}