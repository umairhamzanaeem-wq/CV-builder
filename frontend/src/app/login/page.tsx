"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      setAuth(data.access_token, data.user);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink-50 px-6 py-10">
      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden rounded-2xl border border-ink-200/70 bg-white p-8 shadow-card lg:block">
          <span className="pill">Professional Resume Builder</span>
          <h1 className="mt-5 text-3xl font-semibold leading-tight text-ink-900">
            Welcome back.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">
            Access your resumes, switch templates, and export recruiter-ready PDFs.
          </p>
          <div className="mt-8 space-y-3">
            <div className="rounded-xl border border-ink-200 bg-ink-50 p-3 text-sm text-ink-700">
              Real-time A4 live preview
            </div>
            <div className="rounded-xl border border-ink-200 bg-ink-50 p-3 text-sm text-ink-700">
              Drag-and-drop section ordering
            </div>
            <div className="rounded-xl border border-ink-200 bg-ink-50 p-3 text-sm text-ink-700">
              Fast PDF export for applications
            </div>
          </div>
        </div>

        <div className="card-base w-full max-w-md p-7 sm:p-8 lg:justify-self-end">
          <div className="mb-8">
            <Link href="/" className="text-sm font-medium text-ink-400 hover:text-ink-600">
              &larr; Back
            </Link>
            <h2 className="mt-4 text-2xl font-semibold text-ink-900">Sign in</h2>
            <p className="mt-1 text-sm text-ink-500">Continue where you left off.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-base"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-700">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-base"
                placeholder="Your password"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary mt-1 w-full py-2.5 disabled:opacity-50">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-500">
            No account?{" "}
            <Link href="/signup" className="font-medium text-brand-700 hover:text-brand-800">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
