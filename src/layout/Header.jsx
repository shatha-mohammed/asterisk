import { useState } from "react";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppNavigation } from "../hooks/useAppNavigation";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import DrawerMenu from "../components/DrawerMenu";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
  { name: "About", path: "/about" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { goToLogin } = useAppNavigation();

  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-white px-4 shadow-md lg:px-24">
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={() => setIsOpen(true)}
            text={<Menu className="text-indigo-900" />}
            variant="ghost"
            size="fit"
            className="sm:hidden"
          />

          <Logo />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center justify-center gap-3 text-[14px] text-slate-500 transition-all duration-300 sm:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `transition-all duration-300 ${
                  isActive
                    ? "relative font-bold text-indigo-900 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-indigo-900 after:content-['']"
                    : "text-slate-500 hover:text-indigo-900"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <Button text="Login" size="md" onClick={goToLogin} />
      </div>

      {/* Mobile Menu */}
      <DrawerMenu isOpen={isOpen} navLinks={navLinks} setIsOpen={setIsOpen} />
    </>
  );
}
