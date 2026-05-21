export function ToggleGroup({ label, error, value, options, onChange }) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-semibold text-slate-700">{label}</legend>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center justify-center rounded-2xl border px-4 py-4 sm:py-3 text-sm font-semibold transition ${
                selected
                  ? "border-transparent bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500 text-white shadow-soft"
                  : "border-sky-100 bg-white/95 text-slate-600 hover:border-sky-200 hover:bg-sky-50/70"
              }`}
            >
              <input
                className="sr-only"
                type="radio"
                name="isAgency"
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {error ? <p className="text-sm font-medium text-rose-500">{error}</p> : null}
    </fieldset>
  );
}
