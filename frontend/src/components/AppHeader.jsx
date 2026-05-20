import { Link, NavLink } from "react-router-dom";

const navClass = ({ isActive }) =>
  [
    "rounded-full px-4 py-2 text-sm font-semibold transition",
    isActive ? "bg-brand-500 text-white shadow-soft" : "text-slate-600 hover:bg-white/70 hover:text-brand-700"
  ].join(" ");

export function AppHeader() {
  return (
    <header className="flex flex-col gap-4 py-2 sm:flex-row sm:items-center sm:justify-between">
      <Link to="/" className="flex items-center gap-3 self-start">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500 text-lg font-extrabold text-white shadow-soft">
          P
        </span>
        <span>
          <span className="block text-xs font-bold uppercase tracking-[0.28em] text-brand-600">PopX</span>
          <span className="block text-sm text-slate-500">React assignment</span>
        </span>
      </Link>

      <nav className="flex w-full min-w-0 items-center gap-2 overflow-x-auto rounded-3xl border border-white/80 bg-white/70 p-1 shadow-sm backdrop-blur sm:w-auto sm:justify-end">
        <NavLink to="/" className={navClass} end>
          Signup
        </NavLink>
        <NavLink to="/applications" className={navClass}>
          Applications
        </NavLink>
      </nav>
    </header>
  );
}
