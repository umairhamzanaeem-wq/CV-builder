"use client";

import type { ResumeContent } from "@/types/resume";

interface Props {
  content: ResumeContent;
}

export function ModernTemplate({ content }: Props) {
  const order = content?.sectionOrder?.length
    ? content.sectionOrder
    : ["personalInfo", "education", "experience", "skills", "certifications", "projects"];
  const { personalInfo = null, education = [], experience = [], skills = [], certifications = [], projects = [] } = content ?? {};

  return (
    <div className="w-full bg-white text-gray-900 p-8 text-sm box-border min-h-[297mm]">
      <header className="border-b-2 border-blue-600 pb-3 mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {personalInfo?.fullName?.trim() || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-600 text-xs mt-1">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
          {personalInfo?.linkedin && (
            <a href={personalInfo.linkedin} className="text-blue-600 hover:underline">LinkedIn</a>
          )}
          {personalInfo?.website && (
            <a href={personalInfo.website} className="text-blue-600 hover:underline">Website</a>
          )}
        </div>
        {personalInfo?.summary && (
          <p className="mt-2 text-gray-700 text-xs leading-relaxed">{personalInfo.summary}</p>
        )}
      </header>

      <div className="space-y-4">
        {order.includes("education") && education?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-blue-600 border-b border-gray-200 pb-1 mb-2">Education</h2>
            {education.map((ed) => (
              <div key={ed.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900">{ed.school || "School"}</span>
                  <span className="text-xs text-gray-500">{ed.startDate || "—"} – {ed.endDate || "—"}</span>
                </div>
                <div className="text-gray-700 text-xs">{ed.degree}{ed.field && ` in ${ed.field}`}</div>
                {ed.description && <p className="text-gray-600 text-xs mt-1">{ed.description}</p>}
              </div>
            ))}
          </section>
        )}

        {order.includes("experience") && experience?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-blue-600 border-b border-gray-200 pb-1 mb-2">Experience</h2>
            {experience.map((ex) => (
              <div key={ex.id} className="mb-3">
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <span className="font-semibold text-gray-900">{ex.role || "Role"}</span>
                  <span className="text-xs text-gray-500">{ex.startDate || "—"} – {ex.current ? "Present" : (ex.endDate || "—")}</span>
                </div>
                <div className="text-gray-700 text-xs">{ex.company}{ex.location && ` · ${ex.location}`}</div>
                {ex.description && <p className="text-gray-600 text-xs mt-1 whitespace-pre-line">{ex.description}</p>}
              </div>
            ))}
          </section>
        )}

        {order.includes("skills") && skills?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-blue-600 border-b border-gray-200 pb-1 mb-2">Skills</h2>
            <p className="text-gray-700 text-xs">{skills.join(" · ")}</p>
          </section>
        )}

        {order.includes("certifications") && certifications?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-blue-600 border-b border-gray-200 pb-1 mb-2">Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900">
                    {cert.url ? <a href={cert.url} className="text-blue-600 hover:underline">{cert.name}</a> : cert.name}
                  </span>
                  {cert.date && <span className="text-xs text-gray-500">{cert.date}</span>}
                </div>
                {cert.issuer && <div className="text-gray-600 text-xs">{cert.issuer}</div>}
              </div>
            ))}
          </section>
        )}

        {order.includes("projects") && projects?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-blue-600 border-b border-gray-200 pb-1 mb-2">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="font-semibold text-gray-900">
                  {proj.url ? <a href={proj.url} className="text-blue-600 hover:underline">{proj.name}</a> : proj.name}
                </div>
                {proj.description && <p className="text-gray-600 text-xs mt-0.5">{proj.description}</p>}
                {proj.tech?.length ? <p className="text-gray-500 text-xs mt-0.5">{proj.tech.join(", ")}</p> : null}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
