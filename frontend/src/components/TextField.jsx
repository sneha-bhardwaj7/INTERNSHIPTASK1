export function TextField({ label, error, hint, multiline = false, className = "", ...props }) {
  const sharedClasses =
    "soft-input w-full rounded-2xl px-4 py-4 sm:py-3 text-slate-900 outline-none transition placeholder:text-slate-400";

  return (
    <label className="grid gap-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        {hint ? <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{hint}</span> : null}
      </div>
      {multiline ? (
        <textarea className={`${sharedClasses} min-h-[120px] resize-none ${className}`} {...props} />
      ) : (
        <input className={`${sharedClasses} ${className}`} {...props} />
      )}
      {error ? <p className="text-sm font-medium text-rose-500">{error}</p> : null}
    </label>
  );
}
