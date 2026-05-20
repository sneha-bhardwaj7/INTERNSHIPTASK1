import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApplication } from "../services/applications";
import { validateApplicationForm } from "../utils/validation";
import { AppLayout } from "../layouts/AppLayout";
import { TextField } from "../components/TextField";
import { ToggleGroup } from "../components/ToggleGroup";
import { PrimaryButton } from "../components/PrimaryButton";
import { Spinner } from "../components/Spinner";

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  password: "",
  companyName: "",
  isAgency: "yes"
};

export function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setServerError("");

    const nextErrors = validateApplicationForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);

    try {
      const response = await createApplication({
        ...form,
        isAgency: form.isAgency === "yes"
      });

      navigate("/success", {
        state: {
          application: response.application,
          flashMessage: response.message
        }
      });
    } catch (error) {
      const responseErrors = error.response?.data?.errors || {};
      setErrors(responseErrors);
      setServerError(error.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AppLayout>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-[520px]"
      >
        <div className="glass-card surface-ring rounded-[30px] p-4 shadow-card sm:rounded-[34px] sm:p-8">
          <div className="mb-6 space-y-4">
            <div className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-600 ring-1 ring-brand-100">
              Secure onboarding
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-[2.35rem]">Create your PopX account</h1>
              <p className="max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
                A more premium, production-ready signup flow with real validation, polished layout, and a live backend connection.
              </p>
            </div>
            <div className="grid gap-3 rounded-[24px] border border-brand-100/80 bg-brand-50/60 p-4 sm:grid-cols-3">
              {[
                ["1", "Validate"],
                ["2", "Store in MongoDB"],
                ["3", "Review in admin view"]
              ].map(([number, label]) => (
                <div key={label} className="rounded-2xl bg-white/80 p-4 text-center shadow-sm">
                  <div className="mx-auto mb-2 grid h-9 w-9 place-items-center rounded-full bg-brand-500 text-sm font-extrabold text-white">
                    {number}
                  </div>
                  <p className="text-sm font-semibold text-slate-700">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              placeholder="Sneha Bhardwaj"
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              error={errors.fullName}
            />
            <TextField
              label="Phone Number"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              error={errors.phone}
              inputMode="tel"
            />
            <TextField
              label="Email Address"
              placeholder="sneha@company.com"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              error={errors.email}
              type="email"
            />
            <TextField
              label="Password"
              placeholder="Create a secure password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              error={errors.password}
              type="password"
            />
            <TextField
              label="Company Name"
              placeholder="PopX Studio"
              value={form.companyName}
              onChange={(event) => updateField("companyName", event.target.value)}
              error={errors.companyName}
            />
            <ToggleGroup
              label="Are you an Agency?"
              value={form.isAgency}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" }
              ]}
              onChange={(value) => updateField("isAgency", value)}
              error={errors.isAgency}
            />

            {serverError ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                {serverError}
              </div>
            ) : null}

            <PrimaryButton type="submit" className="mt-2 w-full py-4 text-base sm:text-lg" disabled={submitting}>
              {submitting ? (
                <span className="inline-flex items-center gap-3">
                  <Spinner />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </PrimaryButton>
          </form>
        </div>
      </motion.section>
    </AppLayout>
  );
}
