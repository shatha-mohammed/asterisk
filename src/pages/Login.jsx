import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../store/slices/authSlice";
import { useAppNavigation } from "../hooks/useAppNavigation";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthFooter from "../components/AuthFooter";
import AuthRedirect from "../components/AuthRedirect";

export default function Login() {
  const dispatch = useDispatch();
  const { goToDashboard } = useAppNavigation();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user) goToDashboard();
  }, [user, goToDashboard]);

  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(formData)).unwrap();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-indigo-800">Welcome back</h2>
        <p className="text-muted mt-2">
          Enter your credentials to access your Asterisk dashboard.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Login */}
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
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {/* Register */}
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
