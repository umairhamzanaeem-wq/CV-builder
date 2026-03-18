"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SectionKey } from "@/types/resume";

interface Props {
  id: SectionKey;
  label: string;
  active?: boolean;
  onSelect?: () => void;
}

export function SortableSection({ id, label, active, onSelect }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex touch-none items-center gap-2.5 rounded-xl border px-3.5 py-2.5 transition-colors ${
        isDragging
          ? "z-10 cursor-grabbing border-brand-400 bg-brand-50"
          : "cursor-grab border-ink-200 bg-white hover:bg-ink-50"
      } ${active ? "border-brand-300 bg-brand-50/50 ring-1 ring-brand-500/30" : ""}`}
    >
      <span
        className="cursor-grab select-none text-ink-300 hover:text-ink-500 active:cursor-grabbing"
        {...attributes}
        {...listeners}
        aria-hidden
      >
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="5" cy="3" r="1.2" />
          <circle cx="11" cy="3" r="1.2" />
          <circle cx="5" cy="8" r="1.2" />
          <circle cx="11" cy="8" r="1.2" />
          <circle cx="5" cy="13" r="1.2" />
          <circle cx="11" cy="13" r="1.2" />
        </svg>
      </span>
      <button
        type="button"
        onClick={onSelect}
        className={`flex-1 text-left text-sm transition-colors ${
          active ? "font-medium text-brand-700" : "text-ink-700 hover:text-ink-900"
        }`}
      >
        {label}
      </button>
    </li>
  );
}
