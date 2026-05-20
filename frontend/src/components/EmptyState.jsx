export function EmptyState({ title, description, action }) {
  return (
    <div className="grid gap-4 rounded-[28px] border border-white/70 bg-white/80 p-8 text-center shadow-card backdrop-blur-2xl">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
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