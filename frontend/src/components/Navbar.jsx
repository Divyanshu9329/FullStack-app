import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Project", path: "/admin/projects" },
    { label: "Clients", path: "/admin/clients" },
    { label: "Contacts", path: "/admin/contacts" },
    { label: "Subscribers", path: "/admin/subscribers" },
  ];

  return (
    <header className="w-full shadow-sm bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-indigo-600 to-indigo-900 text-transparent bg-clip-text tracking-tight">
          FLIPR Admin
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative text-sm font-medium transition ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                } after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full ${
                  isActive
                    ? "after:bg-indigo-600"
                    : "after:bg-transparent hover:after:bg-indigo-600"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(true)}
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* MOBILE FULLSCREEN MENU – NO TRANSPARENCY */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white md:hidden flex flex-col">
          {/* top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-bold text-indigo-700">Menu</h2>
            <button onClick={() => setOpen(false)}>
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* links */}
          <nav className="mt-4 flex flex-col gap-4 px-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive ? "text-indigo-600" : "text-gray-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
