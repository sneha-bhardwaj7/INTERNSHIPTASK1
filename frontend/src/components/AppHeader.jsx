import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const navClass = ({ isActive }) =>
  [
    "rounded-full px-4 py-2 text-sm font-semibold transition",
    isActive ? "bg-brand-500 text-white shadow-soft" : "text-slate-600 hover:bg-white/70 hover:text-brand-700"
  ].join(" ");

export function AppHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex flex-col gap-3 py-2 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 z-20">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500 text-lg font-extrabold text-white shadow-soft">P</span>
          <span className="hidden sm:block">
            <span className="block text-xs font-bold uppercase tracking-[0.28em] text-brand-600">PopX</span>
            <span className="block text-sm text-slate-500">React assignment</span>
          </span>
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="ml-2 inline-flex items-center rounded-lg bg-white/80 p-2 text-slate-700 shadow-sm sm:hidden"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <nav className={`flex items-center gap-2 rounded-3xl border border-white/80 bg-white/70 p-1 shadow-sm backdrop-blur sm:justify-end ${open ? 'block w-full mt-2 p-3' : 'hidden sm:flex'}`} style={{zIndex: 10}}>
        <NavLink to="/" className={navClass} end onClick={() => setOpen(false)}>
          Signup
        </NavLink>
        <NavLink to="/applications" className={navClass} onClick={() => setOpen(false)}>
          Applications
        </NavLink>
      </nav>
    </header>
  );
}
