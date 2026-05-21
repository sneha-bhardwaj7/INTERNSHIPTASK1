export function EmptyState({ title, description, action }) {
  return (
    <div className="grid gap-4 rounded-[28px] border border-sky-100/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(239,246,255,0.85))] p-8 text-center shadow-card backdrop-blur-2xl">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-400 text-white ring-1 ring-sky-100">
        <span className="text-xl font-black">P</span>
      </div>
      <div className="grid gap-2">
        <h3 className="text-xl font-extrabold text-slate-900">{title}</h3>
        <p className="mx-auto max-w-md text-sm leading-6 text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}