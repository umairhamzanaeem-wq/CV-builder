"use client";

import { useResumeStore } from "@/store/resumeStore";
import type { EducationItem } from "@/types/resume";

function newItem(): EducationItem {
  return {
    id: crypto.randomUUID(),
    school: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    description: "",
  };
}

export function EducationEditor() {
  const { content, setEducation } = useResumeStore();
  const items = content.education ?? [];

  function update(index: number, patch: Partial<EducationItem>) {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    setEducation(next);
  }

  function add() {
    setEducation([...items, newItem()]);
  }

  function remove(index: number) {
    setEducation(items.filter((_, i) => i !== index));
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
          <div className="grid grid-cols-2 gap-2.5">
            <input
              placeholder="School"
              value={item.school}
              onChange={(e) => update(index, { school: e.target.value })}
              className="col-span-2 input-base py-2"
            />
            <input
              placeholder="Degree"
              value={item.degree}
              onChange={(e) => update(index, { degree: e.target.value })}
              className="input-base py-2"
            />
            <input
              placeholder="Field"
              value={item.field ?? ""}
              onChange={(e) => update(index, { field: e.target.value })}
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
              className="input-base py-2"
            />
          </div>
          <textarea
            placeholder="Description"
            value={item.description ?? ""}
            onChange={(e) => update(index, { description: e.target.value })}
            rows={2}
            className="input-base resize-y min-h-[60px]"
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
          + Add education
        </button>
      )}
    </div>
  );
}
