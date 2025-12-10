import { useState } from "react";

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Projects", href: "#projects" },
    { label: "Clients", href: "#clients" },
    { label: "Contact", href: "#contact" },
    { label: "Newsletter", href: "#newsletter" },
  ];

  const handleClick = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full shadow-sm bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        <h1 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-indigo-600 to-indigo-900 text-transparent bg-clip-text tracking-tight">
          Project Studio
        </h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <button
              key={l.href}
              className="text-gray-700 hover:text-indigo-600 font-medium"
              onClick={() => handleClick(l.href)}
            >
              {l.label}
            </button>
          ))}
          <a
            href="/admin/projects"
            className="ml-4 rounded-full bg-indigo-600 text-white px-4 py-2 text-xs font-semibold hover:bg-indigo-700"
          >
            Admin
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(true)}
        >
          <svg
            width="26"
            height="26"
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

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white md:hidden flex flex-col">
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

          <nav className="mt-4 flex flex-col gap-4 px-6">
            {links.map((l) => (
              <button
                key={l.href}
                className="text-base font-medium text-gray-700 hover:text-indigo-600 text-left"
                onClick={() => handleClick(l.href)}
              >
                {l.label}
              </button>
            ))}
            <a
              href="/admin/projects"
              className="mt-4 rounded-full bg-indigo-600 text-white px-4 py-2 text-sm font-semibold text-center"
              onClick={() => setOpen(false)}
            >
              Open Admin
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
