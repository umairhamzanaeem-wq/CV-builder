"use client";

import { useResumeStore } from "@/store/resumeStore";
import type { PersonalInfo } from "@/types/resume";

const fields: { key: keyof PersonalInfo; label: string; placeholder?: string }[] = [
  { key: "fullName", label: "Full name", placeholder: "Jane Doe" },
  { key: "email", label: "Email", placeholder: "jane@example.com" },
  { key: "phone", label: "Phone", placeholder: "+1 234 567 8900" },
  { key: "location", label: "Location", placeholder: "City, Country" },
  { key: "summary", label: "Summary", placeholder: "Short professional summary…" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/..." },
  { key: "website", label: "Website", placeholder: "https://..." },
];

export function PersonalInfoEditor() {
  const { content, setPersonalInfo } = useResumeStore();
  const info = content.personalInfo ?? {};

  function update(key: keyof PersonalInfo, value: string) {
    setPersonalInfo({ ...info, [key]: value || undefined });
  }

  return (
    <div className="space-y-4 pb-2">
      {fields.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
          {key === "summary" ? (
            <textarea
              value={info.summary ?? ""}
              onChange={(e) => update("summary", e.target.value)}
              placeholder={placeholder}
              rows={3}
              className="input-base resize-y min-h-[80px] block w-full"
            />
          ) : (
            <input
              type="text"
              value={info[key] ?? ""}
              onChange={(e) => update(key, e.target.value)}
              placeholder={placeholder}
              className="input-base block w-full min-h-[42px]"
            />
          )}
        </div>
      ))}
    </div>
  );
}
