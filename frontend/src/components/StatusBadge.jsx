const toneMap = {
  new: "bg-brand-100 text-brand-700 ring-brand-200",
  reviewing: "bg-brand-50 text-brand-600 ring-brand-100",
  shortlisted: "bg-brand-500 text-white ring-brand-500",
  rejected: "bg-slate-100 text-slate-600 ring-slate-200"
};

export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ring-1 ${toneMap[status] || toneMap.new}`}>
      {status}
    </span>
  );
}
