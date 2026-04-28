import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AppLayout from "./layout/AppLayout"; 
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import AuthLayout from "./layout/AuthLayout";
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
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/expenses" element={<Expenses />} /> 
        <Route path="/reports" element={<Reports />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/projects" element={<AddProjectPage />} />
        <Route path="/add-project" element={<AddProjectPage />} />
      </Route>
    </Routes>
  );
}