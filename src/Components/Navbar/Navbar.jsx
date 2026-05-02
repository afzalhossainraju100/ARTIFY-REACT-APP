import React from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/all-arts", label: "Explore", icon: "🔲" },
  // { to: "/artwork-detail", label: "Artwork Detail", icon: "🎨" },
  { to: "/login", label: "Login", icon: "🔑" },
  { to: "/sign-up", label: "Sign Up", icon: "⚡" },
  // { to: "/dashboard", label: "Artist Dashboard", icon: "📊" },
  // { to: "/upload-art", label: "Upload Art", icon: "⬆" },
  { to: "/about", label: "About", icon: "ℹ" },
  { to: "/profile", label: "Artist Profile", icon: "👤" },
];

const Navbar = () => {
  const linkClassName = ({ isActive }) =>
    [
      "inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-[11px] font-medium tracking-wide whitespace-nowrap transition-all duration-200",
      isActive
        ? "border-amber-400 bg-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.28)]"
        : "border-[#2e2e2e] bg-transparent text-gray-300 hover:border-amber-400/40 hover:bg-white/5 hover:text-amber-300",
    ].join(" ");

  const mobileLinkClassName = ({ isActive }) =>
    [
      "flex w-full items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-all duration-200",
      isActive
        ? "border-amber-400 bg-amber-400 text-black"
        : "border-[#2e2e2e] bg-[#171717] text-gray-200 hover:border-amber-400/40 hover:bg-white/5 hover:text-amber-300",
    ].join(" ");

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#2a2a2a] bg-[#1A1410] font-[Cinzel,serif] backdrop-blur supports-[backdrop-filter]:bg-[#1A1410]">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-3 px-4 sm:px-5 lg:h-[4.5rem] lg:px-6 2xl:px-8">
        {/* Brand */}
        <div className="flex min-w-0 flex-1 items-center">
          <h1 className="select-none truncate text-lg font-bold tracking-[0.18em] sm:text-xl lg:text-2xl">
            <span className="text-white">ART</span>
            <span className="text-amber-400">IFY</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 items-center justify-center xl:flex">
          <ul className="flex flex-wrap items-center justify-center gap-2 2xl:gap-2.5">
            {navLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink to={to} className={linkClassName}>
                  <span className="text-[11px] leading-none">{icon}</span>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Logout */}
        <div className="hidden flex-shrink-0 xl:flex">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-red-800/60 px-3 py-2 text-[11px] font-medium tracking-wide whitespace-nowrap text-red-400 transition-all duration-200 hover:border-red-500 hover:bg-red-500/10">
            <span className="text-[11px]">⏻</span>
            Logout
          </button>
        </div>

        {/* Tablet + Mobile Menu */}
        <div className="flex items-center gap-2 xl:hidden">
          <div className="dropdown dropdown-end">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-sm border-[#2e2e2e] bg-[#171717] text-gray-200 hover:border-amber-400/40 hover:bg-white/5 hover:text-amber-300"
              aria-label="Open navigation menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 w-72 rounded-box border border-[#2a2a2a] bg-[#151515] p-3 shadow-2xl shadow-black/40 sm:w-80"
            >
              <li className="mb-2 px-1 text-xs uppercase tracking-[0.3em] text-gray-500">
                Navigation
              </li>
              {navLinks.map(({ to, label, icon }) => (
                <li key={to} className="mb-2">
                  <NavLink to={to} className={mobileLinkClassName}>
                    <span className="text-sm leading-none">{icon}</span>
                    {label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-1 pt-2">
                <button className="flex w-full items-center justify-center gap-1.5 rounded-md border border-red-800/60 px-3 py-2 text-sm font-medium tracking-wide text-red-400 transition-all duration-200 hover:border-red-500 hover:bg-red-500/10">
                  <span>⏻</span>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
