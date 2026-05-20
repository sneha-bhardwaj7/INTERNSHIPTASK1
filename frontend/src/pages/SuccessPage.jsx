import { motion } from "framer-motion";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { PrimaryButton } from "../components/PrimaryButton";

export function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const application = location.state?.application;

  if (!application) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-[560px]"
      >
        <div className="glass-card surface-ring rounded-[30px] p-4 text-center shadow-card sm:rounded-[34px] sm:p-8">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-brand-500 text-2xl font-black text-white shadow-soft">
            P
          </div>
          <div className="space-y-3">
            <div className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-600 ring-1 ring-brand-100">
              Submitted successfully
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-[2.4rem]">Welcome, {application.fullName.split(" ")[0] || "there"}.</h1>
            <p className="mx-auto max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
              Your application has been saved in MongoDB and the backend responded successfully. This confirms the full integration flow.
            </p>
          </div>

          <div className="mt-8 grid gap-4 rounded-[28px] border border-brand-100/80 bg-brand-50/60 p-4 text-left sm:grid-cols-2 sm:p-5">
            {[
              ["Application ID", application.id],
              ["Email", application.email],
              ["Company", application.companyName],
              ["Agency", application.isAgency ? "Yes" : "No"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <span className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-brand-500">{label}</span>
                <strong className="break-words text-sm text-slate-800">{value}</strong>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton variant="ghost" className="flex-1 py-4" onClick={() => navigate("/")}>Create another account</PrimaryButton>
            <PrimaryButton className="flex-1 py-4" onClick={() => navigate("/applications")}>Review applications</PrimaryButton>
          </div>
        </div>
      </motion.section>
    </AppLayout>
  );
}
