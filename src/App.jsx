import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

import { setOnUnauthorized } from "@/services/api";
import { logout } from "@/store/slices";
import { ProtectedRoute } from "@/components";
import {
  AboutPage,
  AddClientPage,
  AddExpensePage,
  AddInvoicePage,
  AddProjectPage,
  ClientsPage,
  Contact,
  Dashboard,
  Earnings,
  Expenses,
  Home,
  Invoices,
  Login,
  ProjectsPage,
  Register,
  Settings,
  Profile,
} from "@/pages";
import { AppLayout, AuthLayout, MainLayout } from "@/layout";
import { SEO } from "@/components";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // The 401 interceptor — dispatches logout and redirects to login
  useEffect(() => {
    setOnUnauthorized(() => {
      dispatch(logout());
      navigate("/login", { replace: true });
    });
  }, [navigate, dispatch]);

  // The 401 interceptor — dispatches logout and redirects to login
  useEffect(() => {
    setOnUnauthorized(() => {
      dispatch(logout());
      navigate("/login", { replace: true });
    });
  }, [navigate, dispatch]);

  return (
    <>
      <SEO />
      <Toaster position="top-right" />
      <Routes>
        {/* Public pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Auth pages */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected pages */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/add-invoice" element={<AddInvoicePage />} />
            <Route path="/earnings" element={<Earnings />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/add-expense" element={<AddExpensePage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/add-client" element={<AddClientPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/add-project" element={<AddProjectPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
