import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import Logo from "./ui/Logo";
import Button from "./ui/Button";

export default function DrawerMenu({ isOpen, setIsOpen, navLinks }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white p-6 shadow-xl transition-transform duration-300 sm:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-indigo-900/20 pb-4">
          <Logo />
          <Button
            text={<X className="text-indigo-900" />}
            variant="ghost"
            size="fit"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <nav className="mt-6 flex flex-col gap-4 text-[16px] text-slate-500">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `transition-all duration-300 ${
                  isActive
                    ? "relative rounded-lg bg-indigo-900/20 pl-2 font-bold text-indigo-900"
                    : "text-slate-500 hover:text-indigo-900"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
