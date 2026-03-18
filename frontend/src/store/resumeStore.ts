import { create } from "zustand";
import type {
  ResumeContent,
  PersonalInfo,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  CertificationItem,
  SectionKey,
} from "@/types/resume";
import { defaultResumeContent, DEFAULT_SECTION_ORDER } from "@/types/resume";

interface ResumeState {
  content: ResumeContent;
  setContent: (content: ResumeContent | ((prev: ResumeContent) => ResumeContent)) => void;
  setPersonalInfo: (info: PersonalInfo | null) => void;
  setEducation: (items: EducationItem[]) => void;
  setExperience: (items: ExperienceItem[]) => void;
  setSkills: (skills: string[]) => void;
  setCertifications: (items: CertificationItem[]) => void;
  setProjects: (items: ProjectItem[]) => void;
  setSectionOrder: (order: SectionKey[]) => void;
  reset: () => void;
  load: (content: ResumeContent | null) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  content: { ...defaultResumeContent },
  setContent: (content) =>
    set((state) => ({
      content:
        typeof content === "function" ? content(state.content) : content,
    })),
  setPersonalInfo: (info) =>
    set((state) => ({
      content: { ...state.content, personalInfo: info },
    })),
  setEducation: (education) =>
    set((state) => ({
      content: { ...state.content, education },
    })),
  setExperience: (experience) =>
    set((state) => ({
      content: { ...state.content, experience },
    })),
  setSkills: (skills) =>
    set((state) => ({
      content: { ...state.content, skills },
    })),
  setCertifications: (certifications) =>
    set((state) => ({
      content: { ...state.content, certifications },
    })),
  setProjects: (projects) =>
    set((state) => ({
      content: { ...state.content, projects },
    })),
  setSectionOrder: (sectionOrder) =>
    set((state) => ({
      content: { ...state.content, sectionOrder },
    })),
  reset: () => set({ content: { ...defaultResumeContent } }),
  load: (content) =>
    set({
      content: content
        ? {
            ...defaultResumeContent,
            ...content,
            certifications: content.certifications ?? [],
            sectionOrder:
              content.sectionOrder?.length ?? 0
                ? [...new Set([...DEFAULT_SECTION_ORDER, ...content.sectionOrder])]
                : defaultResumeContent.sectionOrder,
          }
        : { ...defaultResumeContent },
    }),
}));
