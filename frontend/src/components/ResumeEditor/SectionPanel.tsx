"use client";

import type { SectionKey } from "@/types/resume";
import { PersonalInfoEditor } from "./PersonalInfoEditor";
import { EducationEditor } from "./EducationEditor";
import { ExperienceEditor } from "./ExperienceEditor";
import { SkillsEditor } from "./SkillsEditor";
import { CertificationsEditor } from "./CertificationsEditor";
import { ProjectsEditor } from "./ProjectsEditor";

const editors: Record<SectionKey, React.ComponentType> = {
  personalInfo: PersonalInfoEditor,
  education: EducationEditor,
  experience: ExperienceEditor,
  skills: SkillsEditor,
  certifications: CertificationsEditor,
  projects: ProjectsEditor,
};

interface Props {
  section: SectionKey;
}

export function SectionPanel({ section }: Props) {
  const Editor = editors[section];
  if (!Editor) return null;
  return (
    <div className="min-h-0 pr-1 -mr-1">
      <Editor />
    </div>
  );
}
