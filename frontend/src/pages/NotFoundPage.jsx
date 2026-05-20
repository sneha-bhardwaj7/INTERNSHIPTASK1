import { Link } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { PrimaryButton } from "../components/PrimaryButton";

export function NotFoundPage() {
  return (
    <AppLayout>
      <div className="glass-card surface-ring max-w-xl rounded-[30px] p-5 text-center shadow-card sm:rounded-[34px] sm:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-600">404</p>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">The route you opened does not exist in this project.</p>
        <PrimaryButton as={Link} to="/" className="mt-6">
          Back to signup
        </PrimaryButton>
      </div>
    </AppLayout>
  );
}
