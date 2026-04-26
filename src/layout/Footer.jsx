import { Link } from "react-router-dom";
import Logo from "../Components/ui/Logo";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 p-5 md:grid-cols-3 md:flex-row md:justify-between">
        <Logo />
        <nav className="text-muted flex items-center justify-center gap-6 text-xs leading-4">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/support">Contact Support</Link>
        </nav>
      </div>
      <p className="text-muted border-t border-indigo-300 p-4 text-center text-xs leading-4">
        © 2026 Asterisk. All rights reserved.
      </p>
    </>
  );
}
