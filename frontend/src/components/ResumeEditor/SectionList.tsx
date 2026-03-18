"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useResumeStore } from "@/store/resumeStore";
import type { SectionKey } from "@/types/resume";
import { SectionLabels } from "./constants";
import { SortableSection } from "./SortableSection";

const SECTION_IDS: SectionKey[] = [
  "personalInfo",
  "education",
  "experience",
  "skills",
  "certifications",
  "projects",
];

interface SectionListProps {
  activeSection?: SectionKey;
  onSelectSection?: (key: SectionKey) => void;
}

export function SectionList({ activeSection, onSelectSection }: SectionListProps) {
  const { content, setSectionOrder } = useResumeStore();
  const order = content.sectionOrder.length ? content.sectionOrder : SECTION_IDS;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = order.indexOf(active.id as SectionKey);
    const newIndex = order.indexOf(over.id as SectionKey);
    if (oldIndex === -1 || newIndex === -1) return;
    const next = arrayMove(order, oldIndex, newIndex);
    setSectionOrder(next);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={order}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-2.5">
          {order.map((id) => (
            <SortableSection
              key={id}
              id={id}
              label={SectionLabels[id] ?? id}
              active={activeSection === id}
              onSelect={() => onSelectSection?.(id)}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
