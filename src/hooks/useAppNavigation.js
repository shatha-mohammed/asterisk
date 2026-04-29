import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export function useAppNavigation() {
  const navigate = useNavigate();

  const goTo = useCallback((path) => navigate(path), [navigate]);
  const goToRegister = useCallback(() => navigate("/register"), [navigate]);
  const goToLogin = useCallback(() => navigate("/login"), [navigate]);
  const goToDashboard = useCallback(() => navigate("/dashboard"), [navigate]);
  const goBack = useCallback(() => navigate(-1), [navigate]);

  return { goTo, goToRegister, goToLogin, goToDashboard, goBack };
}
