import { useState } from "react";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import Button from "../Components/ui/Button";
import Logo from "../Components/ui/Logo";
import DrawerMenu from "../Components/DrawerMenu";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
  { name: "About", path: "/about" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex h-16 items-center justify-between bg-white">
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

        <Button text="Login" size="md" />
      </div>

      {/* Mobile Menu */}
      <DrawerMenu isOpen={isOpen} navLinks={navLinks} setIsOpen={setIsOpen} />
    </>
  );
}
