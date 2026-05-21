export function PrimaryButton({ as: Component = "button", children, variant = "solid", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-4 text-sm sm:text-base font-extrabold transition focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-60";
  const variants = {
    solid: "bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500 text-white shadow-[0_18px_40px_rgba(14,165,233,0.28)] hover:brightness-105",
    ghost: "border border-sky-200 bg-white text-sky-700 hover:bg-sky-50",
    subtle: "bg-sky-50 text-sky-700 hover:bg-sky-100"
  };

  const sharedProps = {
    className: `${base} ${variants[variant]} ${className}`.trim(),
    ...props
  };

  if (Component === "button" && !sharedProps.type) {
    sharedProps.type = "button";
  }

  return (
    <Component {...sharedProps}>
      {children}
    </Component>
  );
}