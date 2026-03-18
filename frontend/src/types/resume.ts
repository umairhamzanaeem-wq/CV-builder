export interface PersonalInfo {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  linkedin?: string;
  website?: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  description?: string;
  current?: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  url?: string;
  description?: string;
  tech?: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export type SectionKey =
  | "personalInfo"
  | "education"
  | "experience"
  | "skills"
  | "certifications"
  | "projects";

export interface ResumeContent {
  personalInfo: PersonalInfo | null;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: string[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  sectionOrder: SectionKey[];
}

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  "personalInfo",
  "education",
  "experience",
  "skills",
  "certifications",
  "projects",
];

export const defaultResumeContent: ResumeContent = {
  personalInfo: null,
  education: [],
  experience: [],
  skills: [],
  certifications: [],
  projects: [],
  sectionOrder: [...DEFAULT_SECTION_ORDER],
};

export interface Resume {
  id: number;
  title: string;
  template_id: string;
  content: ResumeContent | null;
  user_id: number;
  created_at: string;
  updated_at: string | null;
}
