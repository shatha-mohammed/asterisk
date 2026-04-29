import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginUser, clearError } from "@/store/slices";
import { useAppNavigation } from "@/hooks";
import { Input, Button } from "@/components/ui";
import { AuthFooter, AuthRedirect } from "@/components";
import { Header } from "@/layout/";

export default function Login() {
  const dispatch = useDispatch();
  const { goToDashboard } = useAppNavigation();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (user) goToDashboard();
  }, [user, goToDashboard]);

  // Clear any previous error when the user starts typing
  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form action
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
    } catch (err) {
      // Error is stored in Redux state and rendered below
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="w-full">
      {/* Mobile & small screens header */}
      <div className="lg:hidden">
        <Header />
        <div className="h-16" />
      </div>

      {/* Page title */}
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-indigo-900">Welcome back</h2>
        <p className="text-muted mt-2">
          Enter your credentials to access your dashboard.
        </p>
      </div>

      {/* Inline error banner */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
        <Button
          type="submit"
          variant="primary"
          size="full"
          isLoading={isLoading}
        >
          {/* Text changing depending on state */}
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {/* Redirect to register page */}
      <AuthRedirect
        text="New to Asterisk?"
        to="/register"
        linkText="Create an account"
      />

      {/* Footer */}
      <AuthFooter />
    </div>
  );
}
