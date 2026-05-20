export function PageShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.12),_transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[linear-gradient(to_right,rgba(37,99,235,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.07)_1px,transparent_1px)] bg-[size:72px_72px]" />
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
