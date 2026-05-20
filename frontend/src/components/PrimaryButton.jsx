export function PrimaryButton({ as: Component = "button", children, variant = "solid", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-4 text-sm sm:text-base font-extrabold transition focus:outline-none focus:ring-4 focus:ring-brand-200 disabled:cursor-not-allowed disabled:opacity-60";
  const variants = {
    solid: "bg-brand-500 text-white shadow-soft hover:bg-brand-600",
    ghost: "border border-brand-200 bg-white text-brand-700 hover:bg-brand-50",
    subtle: "bg-brand-50 text-brand-700 hover:bg-brand-100"
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