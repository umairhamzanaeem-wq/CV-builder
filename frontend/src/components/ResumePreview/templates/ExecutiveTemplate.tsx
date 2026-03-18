"use client";

import type { ResumeContent } from "@/types/resume";

const DEFAULT_ORDER = ["personalInfo", "education", "experience", "skills", "certifications", "projects"] as const;

interface Props {
  content: ResumeContent;
}

export function ExecutiveTemplate({ content }: Props) {
  const order = content.sectionOrder?.length ? content.sectionOrder : [...DEFAULT_ORDER];
  const { personalInfo, education, experience, skills, certifications = [], projects } = content;

  return (
    <div className="w-full bg-white text-gray-900 text-sm box-border flex min-h-[297mm]">
      {/* Left sidebar */}
      <aside className="w-[36%] min-h-full bg-gray-800 text-gray-100 p-6">
        {(
          <div className="mb-6">
            <h1 className="text-lg font-bold text-white leading-tight">
              {personalInfo?.fullName || "Your Name"}
            </h1>
            <div className="mt-3 space-y-1 text-xs text-gray-300">
              {personalInfo?.email && <p>{personalInfo.email}</p>}
              {personalInfo?.phone && <p>{personalInfo.phone}</p>}
              {personalInfo?.location && <p>{personalInfo.location}</p>}
              {personalInfo?.linkedin && (
                <a href={personalInfo.linkedin} className="text-gray-300 underline">LinkedIn</a>
              )}
              {personalInfo?.website && (
                <a href={personalInfo.website} className="text-gray-300 underline block">Website</a>
              )}
            </div>
            {personalInfo?.summary && (
              <p className="mt-4 text-xs text-gray-400 leading-relaxed">{personalInfo.summary}</p>
            )}
          </div>
        )}
        {order.includes("skills") && skills?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Skills</h2>
            <p className="text-xs text-gray-300 leading-relaxed">{skills.join(" · ")}</p>
          </section>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {order.includes("experience") && experience?.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-800 pb-1 mb-3">
              Experience
            </h2>
            {experience.map((ex) => (
              <div key={ex.id} className="mb-4">
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <span className="font-semibold text-gray-900">{ex.role}</span>
                  <span className="text-xs text-gray-500">
                    {ex.startDate} – {ex.current ? "Present" : ex.endDate}
                  </span>
                </div>
                <div className="text-gray-700 text-xs">
                  {ex.company}
                  {ex.location && ` · ${ex.location}`}
                </div>
                {ex.description && (
                  <p className="text-gray-600 text-xs mt-1 whitespace-pre-line">{ex.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {order.includes("education") && education?.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-800 pb-1 mb-3">
              Education
            </h2>
            {education.map((ed) => (
              <div key={ed.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900">{ed.school}</span>
                  <span className="text-xs text-gray-500">{ed.startDate} – {ed.endDate}</span>
                </div>
                <div className="text-gray-700 text-xs">
                  {ed.degree}
                  {ed.field && ` in ${ed.field}`}
                </div>
                {ed.description && <p className="text-gray-600 text-xs mt-1">{ed.description}</p>}
              </div>
            ))}
          </section>
        )}

        {order.includes("certifications") && certifications?.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-800 pb-1 mb-3">
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-3">
                <div className="font-semibold text-gray-900">
                  {cert.url ? (
                    <a href={cert.url} className="text-gray-900 underline">{cert.name}</a>
                  ) : (
                    cert.name
                  )}
                </div>
                <div className="text-gray-700 text-xs">
                  {cert.issuer}
                  {cert.date && ` · ${cert.date}`}
                </div>
              </div>
            ))}
          </section>
        )}

        {order.includes("projects") && projects?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-800 pb-1 mb-3">
              Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="font-semibold text-gray-900">
                  {proj.url ? (
                    <a href={proj.url} className="text-gray-900 underline">{proj.name}</a>
                  ) : (
                    proj.name
                  )}
                </div>
                {proj.description && <p className="text-gray-600 text-xs mt-0.5">{proj.description}</p>}
                {proj.tech?.length ? (
                  <p className="text-gray-500 text-xs mt-0.5">{proj.tech.join(", ")}</p>
                ) : null}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
