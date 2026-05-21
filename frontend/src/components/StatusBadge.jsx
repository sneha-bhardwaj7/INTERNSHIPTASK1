const toneMap = {
  new: "bg-sky-100 text-sky-700 ring-sky-200",
  review: "bg-cyan-100 text-cyan-700 ring-cyan-200",
  reviewing: "bg-cyan-100 text-cyan-700 ring-cyan-200",
  shortlist: "bg-emerald-500 text-white ring-emerald-500",
  shortlisted: "bg-emerald-500 text-white ring-emerald-500",
  reject: "bg-rose-100 text-rose-700 ring-rose-200",
  rejected: "bg-rose-100 text-rose-700 ring-rose-200"
};

export function StatusBadge({ status }) {
  const normalized = String(status || "new").toLowerCase();

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ring-1 ${toneMap[normalized] || toneMap.new}`}>
      {normalized}
    </span>
  );
}
