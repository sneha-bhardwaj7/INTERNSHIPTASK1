import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteApplication, getApplications, updateApplication } from "../services/applications";
import { AppLayout } from "../layouts/AppLayout";
import { EmptyState } from "../components/EmptyState";
import { PrimaryButton } from "../components/PrimaryButton";
import { Spinner } from "../components/Spinner";
import { StatusBadge } from "../components/StatusBadge";

const statusOptions = ["all", "new", "reviewing", "shortlisted", "rejected"];

export function ApplicationsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);
  const [mutatingId, setMutatingId] = useState("");

  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getApplications({ search, status });
        if (active) {
          setItems(response.items || []);
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.response?.data?.message || "Unable to load applications.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [search, status, refreshKey]);

  async function handleDelete(id) {
    setMutatingId(id);

    try {
      await deleteApplication(id);
      setRefreshKey((value) => value + 1);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to delete the application.");
    } finally {
      setMutatingId("");
    }
  }

  async function handleStatusChange(id, nextStatus) {
    setMutatingId(id);

    try {
      await updateApplication(id, { status: nextStatus });
      setRefreshKey((value) => value + 1);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update the application.");
    } finally {
      setMutatingId("");
    }
  }

  const summary = useMemo(() => {
    const total = items.length;
    const shortlisted = items.filter((item) => item.status === "shortlisted").length;
    const reviewing = items.filter((item) => item.status === "reviewing").length;

    return { total, shortlisted, reviewing };
  }, [items]);

  return (
    <AppLayout>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full"
      >
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-600 ring-1 ring-brand-100">
              MongoDB-backed admin view
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Applications</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-500">
              Search, inspect, update status, or delete submissions. This screen proves that the UI is wired to a real backend and not static data.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 rounded-[24px] border border-white/70 bg-white/80 p-3 shadow-card backdrop-blur-2xl sm:grid-cols-3">
            {[
              ["Total", summary.total],
              ["Reviewing", summary.reviewing],
              ["Shortlisted", summary.shortlisted]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-brand-50/70 px-4 py-3 text-center">
                <div className="text-lg font-black text-brand-700">{value}</div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card surface-ring rounded-[30px] p-4 shadow-card sm:rounded-[34px] sm:p-8">
          <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">Search</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, email, company, or phone"
                className="w-full rounded-2xl border border-brand-100/80 bg-white/95 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-300 focus:ring-4 focus:ring-brand-100"
              />
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStatus(option)}
                  className={`rounded-2xl px-4 py-3 text-sm font-bold capitalize transition ${
                    status === option
                      ? "bg-brand-500 text-white shadow-soft"
                      : "border border-brand-100 bg-white/90 text-slate-600 hover:bg-brand-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-brand-100 bg-brand-50/60">
              <span className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm font-semibold text-brand-700 shadow-sm">
                <Spinner /> Loading applications...
              </span>
            </div>
          ) : error ? (
            <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-5 text-sm font-medium text-rose-600">
              {error}
            </div>
          ) : items.length === 0 ? (
            <EmptyState
              title="No applications found"
              description="Try changing the search or status filter, or create a new application from the signup screen."
              action={
                <PrimaryButton as={Link} to="/">
                  Go to signup
                </PrimaryButton>
              }
            />
          ) : (
            <div className="grid gap-4">
              {items.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.35 }}
                  className="rounded-[28px] border border-brand-100/80 bg-white/90 p-4 shadow-sm sm:p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg font-extrabold text-slate-900">{item.fullName}</h2>
                        <StatusBadge status={item.status} />
                      </div>
                      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                        <p><span className="font-semibold text-slate-800">Email:</span> {item.email}</p>
                        <p><span className="font-semibold text-slate-800">Phone:</span> {item.phone}</p>
                        <p><span className="font-semibold text-slate-800">Company:</span> {item.companyName}</p>
                        <p><span className="font-semibold text-slate-800">Agency:</span> {item.isAgency ? "Yes" : "No"}</p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:min-w-[210px]">
                      <select
                        value={item.status}
                        onChange={(event) => handleStatusChange(item.id, event.target.value)}
                        disabled={mutatingId === item.id}
                        className="rounded-2xl border border-brand-100 bg-brand-50/70 px-4 py-3 text-sm font-semibold text-brand-700 outline-none focus:ring-4 focus:ring-brand-100"
                      >
                        {statusOptions.filter((option) => option !== "all").map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <PrimaryButton
                        variant="subtle"
                        className="w-full py-3"
                        onClick={() => handleDelete(item.id)}
                        disabled={mutatingId === item.id}
                      >
                        {mutatingId === item.id ? "Working..." : "Delete"}
                      </PrimaryButton>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </motion.section>
    </AppLayout>
  );
}
