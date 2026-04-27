import { Link } from "react-router-dom";

export default function AuthRedirect({ text, to, linkText }) {
  return (
    <p className="text-muted mt-8 text-center text-sm">
      {text}{" "}
      <Link
        to={to}
        className="font-semibold text-indigo-600 underline-offset-4 hover:text-indigo-500 hover:underline"
      >
        {linkText}
      </Link>
    </p>
  );
}
