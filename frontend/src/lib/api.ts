import { useAuthStore } from "@/store/authStore";

/** Extract error message from FastAPI error response (string or 422 validation array). */
function parseApiError(data: unknown, fallback: string): string {
  if (!data || typeof data !== "object") return fallback;
  const d = data as { detail?: string | Array<{ msg?: string }> };
  if (typeof d.detail === "string") return d.detail;
  if (Array.isArray(d.detail) && d.detail.length > 0 && d.detail[0].msg)
    return d.detail[0].msg;
  return fallback;
}

// Use same-origin proxy so the browser only hits localhost:3000; Next.js forwards to the backend.
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "/api/proxy";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return useAuthStore.getState().token;
}

function getHeaders(includeAuth = true): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const token = getToken();
  if (includeAuth && token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const msg = parseApiError(data, "Login failed");
    throw new Error(msg);
  }
  return res.json();
}

export async function signup(email: string, password: string, fullName?: string) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify({ email, password, full_name: fullName }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const msg = parseApiError(data, "Signup failed");
    throw new Error(msg);
  }
  return res.json();
}

export async function getResumes(): Promise<import("@/types/resume").Resume[]> {
  const res = await fetch(`${API_BASE}/resumes`, { headers: getHeaders() });
  if (res.status === 401) {
    if (typeof window !== "undefined") useAuthStore.getState().logout();
    throw new Error("Session expired. Please log in again.");
  }
  if (!res.ok) throw new Error("Failed to fetch resumes");
  return res.json();
}

export async function getResume(
  id: number
): Promise<import("@/types/resume").Resume> {
  const res = await fetch(`${API_BASE}/resumes/${id}`, {
    headers: getHeaders(),
  });
  if (res.status === 401) {
    if (typeof window !== "undefined") useAuthStore.getState().logout();
    throw new Error("Session expired. Please log in again.");
  }
  if (!res.ok) throw new Error("Failed to fetch resume");
  return res.json();
}

export async function createResume(body: {
  title?: string;
  template_id?: string;
  content?: import("@/types/resume").ResumeContent;
}) {
  const res = await fetch(`${API_BASE}/resumes`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  if (res.status === 401) {
    if (typeof window !== "undefined") useAuthStore.getState().logout();
    throw new Error("Session expired. Please log in again.");
  }
  if (!res.ok) throw new Error("Failed to create resume");
  return res.json();
}

export async function updateResume(
  id: number,
  body: {
    title?: string;
    template_id?: string;
    content?: import("@/types/resume").ResumeContent;
  }
) {
  const res = await fetch(`${API_BASE}/resumes/${id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  if (res.status === 401) {
    if (typeof window !== "undefined") useAuthStore.getState().logout();
    throw new Error("Session expired. Please log in again.");
  }
  if (!res.ok) throw new Error("Failed to update resume");
  return res.json();
}

export async function deleteResume(id: number) {
  const res = await fetch(`${API_BASE}/resumes/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (res.status === 401) {
    if (typeof window !== "undefined") useAuthStore.getState().logout();
    throw new Error("Session expired. Please log in again.");
  }
  if (!res.ok) throw new Error("Failed to delete resume");
}
