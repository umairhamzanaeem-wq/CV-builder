"use client";

import { useResumeStore } from "@/store/resumeStore";
import type { CertificationItem } from "@/types/resume";

function newItem(): CertificationItem {
  return {
    id: crypto.randomUUID(),
    name: "",
    issuer: "",
    date: "",
    url: "",
  };
}

export function CertificationsEditor() {
  const { content, setCertifications } = useResumeStore();
  const items = content.certifications ?? [];

  function update(index: number, patch: Partial<CertificationItem>) {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    setCertifications(next);
  }

  function add() {
    setCertifications([...items, newItem()]);
  }

  function remove(index: number) {
    setCertifications(items.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">Entries</span>
        <button type="button" onClick={add} className="text-xs font-medium text-brand-600 hover:text-brand-700 transition">
          + Add
        </button>
      </div>
      {items.map((item, index) => (
        <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-3 space-y-3">
          <input
            placeholder="Certification name"
            value={item.name}
            onChange={(e) => update(index, { name: e.target.value })}
            className="w-full input-base py-2"
          />
          <div className="grid grid-cols-2 gap-2.5">
            <input
              placeholder="Issuing organization"
              value={item.issuer}
              onChange={(e) => update(index, { issuer: e.target.value })}
              className="input-base py-2"
            />
            <input
              placeholder="Date (e.g. 2024)"
              value={item.date}
              onChange={(e) => update(index, { date: e.target.value })}
              className="input-base py-2"
            />
          </div>
          <input
            placeholder="Credential URL (optional)"
            value={item.url ?? ""}
            onChange={(e) => update(index, { url: e.target.value })}
            className="w-full input-base py-2"
          />
          <button type="button" onClick={() => remove(index)} className="text-xs text-red-600 hover:text-red-700 transition">
            Remove
          </button>
        </div>
      ))}
      {items.length === 0 && (
        <button
          type="button"
          onClick={add}
          className="w-full rounded-lg border border-dashed border-gray-300 py-3 text-sm text-gray-400 hover:border-brand-500 hover:text-brand-600 transition-colors"
        >
          + Add certification
        </button>
      )}
    </div>
  );
}
