"use client";

import { useResumeStore } from "@/store/resumeStore";
import type { ProjectItem } from "@/types/resume";

function newItem(): ProjectItem {
  return {
    id: crypto.randomUUID(),
    name: "",
    url: "",
    description: "",
    tech: [],
  };
}

export function ProjectsEditor() {
  const { content, setProjects } = useResumeStore();
  const items = content.projects ?? [];

  function update(index: number, patch: Partial<ProjectItem>) {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    setProjects(next);
  }

  function updateTech(index: number, techStr: string) {
    const tech = techStr.split(",").map((t) => t.trim()).filter(Boolean);
    update(index, { tech });
  }

  function add() {
    setProjects([...items, newItem()]);
  }

  function remove(index: number) {
    setProjects(items.filter((_, i) => i !== index));
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
            placeholder="Project name"
            value={item.name}
            onChange={(e) => update(index, { name: e.target.value })}
            className="w-full input-base py-2"
          />
          <input
            placeholder="URL"
            value={item.url ?? ""}
            onChange={(e) => update(index, { url: e.target.value })}
            className="w-full input-base py-2"
          />
          <textarea
            placeholder="Description"
            value={item.description ?? ""}
            onChange={(e) => update(index, { description: e.target.value })}
            rows={2}
            className="w-full input-base resize-y min-h-[60px]"
          />
          <input
            placeholder="Tech (comma-separated)"
            value={(item.tech ?? []).join(", ")}
            onChange={(e) => updateTech(index, e.target.value)}
            className="w-full input-base py-2"
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
          + Add project
        </button>
      )}
    </div>
  );
}
