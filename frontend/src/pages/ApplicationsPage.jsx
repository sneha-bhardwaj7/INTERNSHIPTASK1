import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteApplication,
  getApplications,
  updateApplication,
} from "../services/applications";

import { AppLayout } from "../layouts/AppLayout";
import { EmptyState } from "../components/EmptyState";
import { PrimaryButton } from "../components/PrimaryButton";
import { Spinner } from "../components/Spinner";
import { StatusBadge } from "../components/StatusBadge";

const statusOptions = ["all", "new", "review", "shortlist", "reject"];

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
        const response = await getApplications({
          search,
          status,
        });

        if (active) {
          setItems(response.items || []);
        }
      } catch (requestError) {
        if (active) {
          setError(
            requestError.response?.data?.message ||
              "Unable to load applications."
          );
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
      setError(
        requestError.response?.data?.message ||
          "Unable to delete the application."
      );
    } finally {
      setMutatingId("");
    }
  }

  async function handleStatusChange(id, nextStatus) {
    setMutatingId(id);

    try {
      await updateApplication(id, {
        status: nextStatus,
      });

      setRefreshKey((value) => value + 1);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to update the application."
      );
    } finally {
      setMutatingId("");
    }
  }

  const summary = useMemo(() => {
    const total = items.length;

    const shortlisted = items.filter(
      (item) => item.status === "shortlisted"
    ).length;

    const reviewing = items.filter(
      (item) => item.status === "reviewing"
    ).length;

    return {
      total,
      shortlisted,
      reviewing,
    };
  }, [items]);

  return (
    <AppLayout>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="w-full overflow-x-hidden"
      >
        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          {/* LEFT */}
          <div className="space-y-3 w-full">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-cyan-400/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-sky-700 ring-1 ring-sky-200">
              MongoDB-backed admin view
            </div>

            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl break-words">
              Applications
            </h1>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 break-words">
              Search, inspect, update status, or delete submissions.
              This screen proves that the UI is wired to a real backend
              and not static data.
            </p>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="flex flex-wrap gap-3 w-full xl:w-auto">
            {[
              ["Total", summary.total],
              ["Reviewing", summary.reviewing],
              ["Shortlisted", summary.shortlisted],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex-1 min-w-[110px] rounded-2xl border border-sky-100 bg-white/80 px-4 py-3 text-center shadow-sm"
              >
                <div className="text-lg font-black text-sky-700">
                  {value}
                </div>

                <div className="break-words text-[10px] font-bold uppercase tracking-[0.12em] text-sky-500 sm:text-xs">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="glass-card surface-ring overflow-hidden rounded-[24px] p-3 shadow-card sm:rounded-[34px] sm:p-8">
          {/* SEARCH + FILTER */}
          <div className="mb-6 flex flex-col gap-4">
            {/* SEARCH */}
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Search
              </span>

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, email, company, or phone"
                className="soft-input w-full rounded-2xl px-4 py-3 text-sm text-slate-900"
              />
            </label>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStatus(option)}
                  className={`rounded-2xl px-4 py-3 text-sm font-bold capitalize transition ${
                    status === option
                      ? "bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500 text-white shadow-soft"
                      : "border border-sky-100 bg-white/90 text-slate-600 hover:bg-sky-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-sky-100 bg-sky-50/70">
              <span className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm font-semibold text-sky-700 shadow-sm">
                <Spinner />
                Loading applications...
              </span>
            </div>
          ) : error ? (
            <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-5 text-sm font-medium text-rose-600 break-words">
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
                  transition={{
                    delay: index * 0.04,
                    duration: 0.35,
                  }}
                  className="rounded-[28px] border border-sky-100/80 bg-white/92 p-4 shadow-[0_16px_40px_rgba(14,165,233,0.10)] sm:p-5"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    {/* LEFT CONTENT */}
                    <div className="space-y-3 w-full">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="break-words text-lg font-extrabold text-slate-900">
                          {item.fullName}
                        </h2>

                        <StatusBadge status={item.status} />
                      </div>

                      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                        <p className="break-all">
                          <span className="font-semibold text-slate-800">
                            Email:
                          </span>{" "}
                          {item.email}
                        </p>

                        <p className="break-all">
                          <span className="font-semibold text-slate-800">
                            Phone:
                          </span>{" "}
                          {item.phone}
                        </p>

                        <p className="break-all">
                          <span className="font-semibold text-slate-800">
                            Company:
                          </span>{" "}
                          {item.companyName}
                        </p>

                        <p className="break-all">
                          <span className="font-semibold text-slate-800">
                            Agency:
                          </span>{" "}
                          {item.isAgency ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT ACTIONS */}
                    <div className="grid w-full gap-3 xl:min-w-[220px] xl:w-auto">
                      <select
                        value={item.status}
                        onChange={(event) =>
                          handleStatusChange(
                            item.id,
                            event.target.value
                          )
                        }
                        disabled={mutatingId === item.id}
                        className="w-full rounded-2xl border border-brand-100 bg-brand-50/70 px-4 py-3 text-sm font-semibold text-brand-700 outline-none focus:ring-4 focus:ring-brand-100"
                      >
                        {statusOptions
                          .filter((option) => option !== "all")
                          .map((option) => (
                            <option
                              key={option}
                              value={option}
                            >
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
                        {mutatingId === item.id
                          ? "Working..."
                          : "Delete"}
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