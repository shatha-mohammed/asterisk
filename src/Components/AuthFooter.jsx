import { Link } from "react-router-dom";

export default function AuthFooter() {
  return (
    <div className="text-muted mt-12 flex justify-center gap-6 text-xs">
      <Link to="/privacy" className="hover:text-indigo-800">
        Privacy Policy
      </Link>
      <Link to="/terms" className="hover:text-indigo-800">
        Terms of Service
      </Link>
      <Link to="/support" className="hover:text-indigo-800">
        Support
      </Link>
    </div>
  );
}
