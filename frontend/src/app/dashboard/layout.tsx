"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token, user, logout, isAuthenticated, _hasHydrated, setHasHydrated } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = setTimeout(() => setHasHydrated(true), 150);
    return () => clearTimeout(t);
  }, [setHasHydrated]);

  useEffect(() => {
    if (!_hasHydrated) return;
    if (!isAuthenticated()) {
      router.replace("/login");
    }
  }, [_hasHydrated, isAuthenticated, router]);

  if (!_hasHydrated || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-50">
        <div className="h-7 w-7 rounded-full border-2 border-ink-200 border-t-brand-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-ink-50">
      <header className="sticky top-0 z-20 border-b border-ink-200/70 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/dashboard" className="text-base font-semibold text-ink-900">
            CV Builder
          </Link>
          <div className="relative flex items-center gap-3">
            <span className="hidden max-w-[180px] truncate text-sm text-ink-500 sm:inline">
              {user?.full_name || user?.email}
            </span>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white shadow-card"
              aria-expanded={menuOpen}
              aria-haspopup="true"
            >
              {(user?.full_name || user?.email || "U").charAt(0).toUpperCase()}
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-full z-20 mt-2 w-52 rounded-xl border border-ink-200 bg-white py-1.5 shadow-card-hover">
                  <div className="border-b border-ink-100 px-3.5 py-2.5">
                    <p className="text-xs text-ink-400">Signed in as</p>
                    <p className="truncate text-sm font-medium text-ink-900">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                      router.push("/");
                      router.refresh();
                    }}
                    className="w-full px-3.5 py-2 text-left text-sm text-ink-600 transition-colors hover:bg-ink-50 hover:text-red-600"
                  >
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 min-h-0">{children}</main>
    </div>
  );
}
