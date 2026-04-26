import { useNavigate } from "react-router-dom";

export function useAppNavigation() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const goToRegister = () => goTo("/register");
  const goToLogin = () => goTo("/login");
  const goToDashboard = () => goTo("/dashboard");

  return {
    goTo,
    goToRegister,
    goToLogin,
    goToDashboard,
    goBack: () => navigate(-1),
  };
}
