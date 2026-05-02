import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/all-arts", label: "Explore", icon: "🔲" },
  { to: "/login", label: "Login", icon: "🔑" },
  { to: "/sign-up", label: "Sign Up", icon: "⚡" },
  { to: "/requirement", label: "About", icon: "ℹ" },
  { to: "/profile", label: "Artist Profile", icon: "👤" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const desktopLinkClassName = ({ isActive }) =>
    [
      "inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-[11px] font-medium tracking-wide whitespace-nowrap transition-all duration-200",
      isActive
        ? "border-amber-400 bg-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.28)]"
        : "border-[#2e2e2e] bg-transparent text-gray-300 hover:border-amber-400/40 hover:bg-white/5 hover:text-amber-300",
    ].join(" ");

  const mobileLinkClassName = ({ isActive }) =>
    [
      "flex w-full items-center gap-2 rounded-md border px-3 py-3 text-sm font-medium transition-all duration-200",
      isActive
        ? "border-amber-400 bg-amber-400 text-black"
        : "border-[#2e2e2e] bg-[#171717] text-gray-200 hover:border-amber-400/40 hover:bg-white/5 hover:text-amber-300",
    ].join(" ");

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#2a2a2a] bg-[#1A1410] font-[Cinzel,serif] backdrop-blur supports-backdrop-filter:bg-[#1A1410]">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-3 px-4 sm:px-5 lg:h-18 lg:px-6 2xl:px-8">
        <div className="flex min-w-0 flex-1 items-center">
          <h1 className="select-none truncate text-lg font-bold tracking-[0.18em] sm:text-xl lg:text-2xl">
            <span className="text-white">ART</span>
            <span className="text-amber-400">IFY</span>
          </h1>
        </div>

        <div className="hidden flex-1 items-center justify-center xl:flex">
          <ul className="flex flex-wrap items-center justify-center gap-2 2xl:gap-2.5">
            {navLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink to={to} className={desktopLinkClassName}>
                  <span className="text-[11px] leading-none">{icon}</span>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden shrink-0 xl:flex">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-red-800/60 px-3 py-2 text-[11px] font-medium tracking-wide whitespace-nowrap text-red-400 transition-all duration-200 hover:border-red-500 hover:bg-red-500/10">
            <span className="text-[11px]">⏻</span>
            Logout
          </button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex h-10 items-center justify-center rounded-md border border-[#2e2e2e] bg-[#171717] px-3 text-gray-200 transition-all duration-200 hover:border-amber-400/40 hover:bg-white/5 hover:text-amber-300"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-panel"
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
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 xl:hidden ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
          aria-label="Close navigation menu"
        />

        <aside
          id="mobile-navigation-panel"
          className={`absolute right-0 top-0 flex h-full w-88 max-w-[86vw] flex-col border-l border-[#2a2a2a] bg-[#151515] shadow-2xl shadow-black/50 transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#2a2a2a] px-4 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Menu
              </p>
              <h2 className="mt-1 text-lg font-bold tracking-[0.18em] text-white">
                ART<span className="text-amber-400">IFY</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={closeMobileMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#2e2e2e] bg-[#171717] text-gray-200 transition-all duration-200 hover:border-amber-400/40 hover:bg-white/5 hover:text-amber-300"
              aria-label="Close navigation menu"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-500">
              Navigation
            </p>

            <ul className="space-y-2">
              {navLinks.map(({ to, label, icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={closeMobileMenu}
                    className={mobileLinkClassName}
                  >
                    <span className="text-sm leading-none">{icon}</span>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-[#2a2a2a] pt-4">
              <button className="flex w-full items-center justify-center gap-1.5 rounded-md border border-red-800/60 px-3 py-3 text-sm font-medium tracking-wide text-red-400 transition-all duration-200 hover:border-red-500 hover:bg-red-500/10">
                <span>⏻</span>
                Logout
              </button>
            </div>
          </div>
        </aside>
      </div>
    </nav>
  );
};

export default Navbar;
