import type { SectionKey } from "@/types/resume";

export const SectionLabels: Record<SectionKey, string> = {
  personalInfo: "Personal Info",
  education: "Education",
  experience: "Experience",
  skills: "Skills",
  certifications: "Certifications",
  projects: "Projects",
};

export const TEMPLATES = [
  { id: "modern", name: "Modern" },
  { id: "classic", name: "Classic" },
  { id: "minimal", name: "Minimal" },
  { id: "executive", name: "Executive" },
  { id: "tech", name: "Tech" },
  { id: "creative", name: "Creative" },
  { id: "compact", name: "Compact" },
  { id: "academic", name: "Academic" },
] as const;

export type TemplateId = (typeof TEMPLATES)[number]["id"];
