"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getResumes, deleteResume } from "@/lib/api";
import type { Resume } from "@/types/resume";

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function load() {
    try {
      const data = await getResumes();
      setResumes(data);
    } catch {
      setResumes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate() {
    setCreating(true);
    try {
      const { createResume } = await import("@/lib/api");
      const r = await createResume({ title: "Untitled Resume" });
      window.location.href = `/dashboard/resume/${r.id}`;
    } catch {
      setCreating(false);
    }
  }

  async function handleDelete(id: number, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Delete this resume?")) return;
    setDeletingId(id);
    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[40vh] w-full max-w-5xl items-center justify-center p-8">
        <div className="h-7 w-7 rounded-full border-2 border-ink-200 border-t-brand-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl p-6 sm:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">My Resumes</h1>
          <p className="mt-0.5 text-sm text-ink-500">Create and manage your resumes</p>
        </div>
        <button
          onClick={handleCreate}
          disabled={creating}
          className="btn-primary inline-flex items-center gap-1.5 px-4 py-2.5 disabled:opacity-50"
        >
          {creating ? "Creating…" : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              New resume
            </>
          )}
        </button>
      </div>

      {resumes.length === 0 ? (
        <div className="card-base border-dashed border-ink-300 p-12 text-center">
          <p className="mb-4 text-ink-500">No resumes yet</p>
          <button onClick={handleCreate} disabled={creating} className="btn-primary inline-flex items-center gap-1.5 px-4 py-2.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Create your first resume
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((r) => (
            <li key={r.id}>
              <Link
                href={`/dashboard/resume/${r.id}`}
                className="group block card-base p-5 transition-all hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-card-hover"
              >
                <div className="mb-3 h-20 rounded-xl border border-ink-200 bg-ink-50 p-3">
                  <div className="h-2 w-2/5 rounded bg-ink-900/85" />
                  <div className="mt-2 h-1.5 w-3/5 rounded bg-ink-300" />
                  <div className="mt-3 h-px bg-ink-200" />
                  <div className="mt-2 flex gap-1.5">
                    <span className="h-4 w-10 rounded bg-brand-100" />
                    <span className="h-4 w-10 rounded bg-brand-100" />
                    <span className="h-4 w-10 rounded bg-brand-100" />
                  </div>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-medium text-ink-900 transition-colors group-hover:text-brand-700">{r.title}</h2>
                    <p className="mt-1 text-xs capitalize text-ink-400">{r.template_id} template</p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(r.id, e)}
                    disabled={deletingId === r.id}
                    className="rounded-md p-1.5 text-ink-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                    aria-label="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
