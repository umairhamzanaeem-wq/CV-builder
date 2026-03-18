"use client";

import type { ResumeContent } from "@/types/resume";

const DEFAULT_ORDER = ["personalInfo", "education", "experience", "skills", "certifications", "projects"] as const;

interface Props {
  content: ResumeContent;
}

export function TechTemplate({ content }: Props) {
  const order = content.sectionOrder?.length ? content.sectionOrder : [...DEFAULT_ORDER];
  const { personalInfo, education, experience, skills, certifications = [], projects } = content;

  return (
    <div className="w-full bg-white text-gray-900 p-8 text-sm box-border font-sans min-h-[297mm]">
      {(
        <header className="border-l-4 border-emerald-600 pl-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {personalInfo?.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-600 text-xs mt-1 font-mono">
            {personalInfo?.email && <span>{personalInfo.email}</span>}
            {personalInfo?.phone && <span>|</span>}
            {personalInfo?.phone && <span>{personalInfo.phone}</span>}
            {personalInfo?.location && <span>|</span>}
            {personalInfo?.location && <span>{personalInfo.location}</span>}
            {personalInfo?.linkedin && (
              <a href={personalInfo.linkedin} className="text-emerald-600 hover:underline">linkedin</a>
            )}
            {personalInfo?.website && (
              <a href={personalInfo.website} className="text-emerald-600 hover:underline ml-1">url</a>
            )}
          </div>
          {personalInfo?.summary && (
            <p className="mt-2 text-gray-700 text-xs leading-relaxed">{personalInfo.summary}</p>
          )}
        </header>
      )}

      <div className="space-y-5">
        {order.includes("experience") && experience?.length > 0 && (
          <section>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 mb-2">
              &gt; experience
            </h2>
            {experience.map((ex) => (
              <div key={ex.id} className="mb-3 pl-2 border-l border-gray-200">
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <span className="font-semibold text-gray-900">{ex.role}</span>
                  <span className="text-xs text-gray-500 font-mono">
                    {ex.startDate} – {ex.current ? "Present" : ex.endDate}
                  </span>
                </div>
                <div className="text-gray-600 text-xs">{ex.company}{ex.location ? ` · ${ex.location}` : ""}</div>
                {ex.description && (
                  <p className="text-gray-600 text-xs mt-1 whitespace-pre-line">{ex.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {order.includes("education") && education?.length > 0 && (
          <section>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 mb-2">
              &gt; education
            </h2>
            {education.map((ed) => (
              <div key={ed.id} className="mb-3 pl-2 border-l border-gray-200">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900">{ed.school}</span>
                  <span className="text-xs text-gray-500 font-mono">{ed.startDate} – {ed.endDate}</span>
                </div>
                <div className="text-gray-700 text-xs">
                  {ed.degree}
                  {ed.field && `, ${ed.field}`}
                </div>
                {ed.description && <p className="text-gray-600 text-xs mt-1">{ed.description}</p>}
              </div>
            ))}
          </section>
        )}

        {order.includes("skills") && skills?.length > 0 && (
          <section>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 mb-2">
              &gt; skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, i) => (
                <span
                  key={`${s}-${i}`}
                  className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-mono"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {order.includes("certifications") && certifications?.length > 0 && (
          <section>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 mb-2">
              &gt; certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-3 pl-2 border-l border-gray-200">
                <div className="font-semibold text-gray-900">
                  {cert.url ? (
                    <a href={cert.url} className="text-emerald-600 hover:underline">{cert.name}</a>
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
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 mb-2">
              &gt; projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 pl-2 border-l border-gray-200">
                <div className="font-semibold text-gray-900">
                  {proj.url ? (
                    <a href={proj.url} className="text-emerald-600 hover:underline">{proj.name}</a>
                  ) : (
                    proj.name
                  )}
                </div>
                {proj.description && <p className="text-gray-600 text-xs mt-0.5">{proj.description}</p>}
                {proj.tech?.length ? (
                  <p className="text-gray-500 text-xs mt-0.5 font-mono">{proj.tech.join(", ")}</p>
                ) : null}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
