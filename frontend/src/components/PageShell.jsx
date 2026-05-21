export function PageShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#e0f2fe_0%,#f8fafc_36%,#ecfeff_70%,#fefce8_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.28),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.16),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.14),_transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 bg-[linear-gradient(to_right,rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.08)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -right-28 top-32 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl animate-float [animation-delay:1.5s]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl animate-float [animation-delay:3s]" />
      <div className="relative mx-auto flex min-h-screen w-full flex-col px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex flex-1 items-start justify-center sm:items-center">
          <div className="w-full max-w-[420px] px-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
