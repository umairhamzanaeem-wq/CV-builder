"use client";

import { useResumeStore } from "@/store/resumeStore";
import type { ExperienceItem } from "@/types/resume";

function newItem(): ExperienceItem {
  return {
    id: crypto.randomUUID(),
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    current: false,
  };
}

export function ExperienceEditor() {
  const { content, setExperience } = useResumeStore();
  const items = content.experience ?? [];

  function update(index: number, patch: Partial<ExperienceItem>) {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    setExperience(next);
  }

  function add() {
    setExperience([...items, newItem()]);
  }

  function remove(index: number) {
    setExperience(items.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">Entries</span>
        <button
          type="button"
          onClick={add}
          className="text-xs font-medium text-brand-600 hover:text-brand-700 transition"
        >
          + Add
        </button>
      </div>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="rounded-lg border border-gray-200 bg-white p-3 space-y-3"
        >
          <input
            placeholder="Company"
            value={item.company}
            onChange={(e) => update(index, { company: e.target.value })}
            className="w-full input-base py-2"
          />
          <div className="grid grid-cols-2 gap-2.5">
            <input
              placeholder="Role"
              value={item.role}
              onChange={(e) => update(index, { role: e.target.value })}
              className="input-base py-2"
            />
            <input
              placeholder="Location"
              value={item.location ?? ""}
              onChange={(e) => update(index, { location: e.target.value })}
              className="input-base py-2"
            />
            <input
              placeholder="Start year"
              value={item.startDate}
              onChange={(e) => update(index, { startDate: e.target.value })}
              className="input-base py-2"
            />
            <input
              placeholder="End year"
              value={item.endDate}
              onChange={(e) => update(index, { endDate: e.target.value })}
              disabled={item.current}
              className="input-base py-2 disabled:opacity-60"
            />
          </div>
          <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={item.current ?? false}
              onChange={(e) => update(index, { current: e.target.checked })}
              className="rounded border-gray-300 bg-white text-brand-500 focus:ring-brand-500/30"
            />
            Current role
          </label>
          <textarea
            placeholder="Description"
            value={item.description ?? ""}
            onChange={(e) => update(index, { description: e.target.value })}
            rows={3}
            className="w-full input-base resize-y min-h-[72px]"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-xs text-red-600 hover:text-red-700 transition"
          >
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
          + Add experience
        </button>
      )}
    </div>
  );
}
