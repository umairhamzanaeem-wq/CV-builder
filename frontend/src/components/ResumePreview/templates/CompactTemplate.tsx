"use client";

import type { ResumeContent } from "@/types/resume";

const DEFAULT_ORDER = ["personalInfo", "education", "experience", "skills", "certifications", "projects"] as const;

interface Props {
  content: ResumeContent;
}

export function CompactTemplate({ content }: Props) {
  const order = content.sectionOrder?.length ? content.sectionOrder : [...DEFAULT_ORDER];
  const { personalInfo, education, experience, skills, certifications = [], projects } = content;

  return (
    <div className="w-full bg-white text-gray-900 p-6 text-xs box-border min-h-[297mm]">
      {(
        <header className="border-b border-gray-300 pb-2 mb-3">
          <h1 className="text-lg font-bold text-gray-900">
            {personalInfo?.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap gap-x-3 gap-y-0 text-gray-600 mt-0.5">
            {personalInfo?.email && <span>{personalInfo.email}</span>}
            {personalInfo?.phone && <span>{personalInfo.phone}</span>}
            {personalInfo?.location && <span>{personalInfo.location}</span>}
            {personalInfo?.linkedin && (
              <a href={personalInfo.linkedin} className="text-blue-700 underline">LinkedIn</a>
            )}
            {personalInfo?.website && (
              <a href={personalInfo.website} className="text-blue-700 underline">Website</a>
            )}
          </div>
          {personalInfo?.summary && (
            <p className="mt-1.5 text-gray-700 leading-snug">{personalInfo.summary}</p>
          )}
        </header>
      )}

      <div className="space-y-3">
        {order.includes("experience") && experience?.length > 0 && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-0.5 mb-1.5">
              Experience
            </h2>
            {experience.map((ex) => (
              <div key={ex.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900">{ex.role}</span>
                  <span className="text-gray-500">{ex.startDate} – {ex.current ? "Present" : ex.endDate}</span>
                </div>
                <div className="text-gray-600">{ex.company}{ex.location ? ` · ${ex.location}` : ""}</div>
                {ex.description && <p className="text-gray-600 mt-0.5 whitespace-pre-line leading-snug">{ex.description}</p>}
              </div>
            ))}
          </section>
        )}

        {order.includes("education") && education?.length > 0 && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-0.5 mb-1.5">
              Education
            </h2>
            {education.map((ed) => (
              <div key={ed.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900">{ed.school}</span>
                  <span className="text-gray-500">{ed.startDate} – {ed.endDate}</span>
                </div>
                <div className="text-gray-600">{ed.degree}{ed.field ? `, ${ed.field}` : ""}</div>
                {ed.description && <p className="text-gray-600 mt-0.5 leading-snug">{ed.description}</p>}
              </div>
            ))}
          </section>
        )}

        {order.includes("skills") && skills?.length > 0 && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-0.5 mb-1.5">
              Skills
            </h2>
            <p className="text-gray-700 leading-snug">{skills.join(" · ")}</p>
          </section>
        )}

        {order.includes("certifications") && certifications?.length > 0 && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-0.5 mb-1.5">
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <div className="font-semibold text-gray-900">
                  {cert.url ? (
                    <a href={cert.url} className="text-blue-700 underline">{cert.name}</a>
                  ) : (
                    cert.name
                  )}
                </div>
                <div className="text-gray-600 leading-snug">{cert.issuer}{cert.date ? ` · ${cert.date}` : ""}</div>
              </div>
            ))}
          </section>
        )}

        {order.includes("projects") && projects?.length > 0 && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-0.5 mb-1.5">
              Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <div className="font-semibold text-gray-900">
                  {proj.url ? (
                    <a href={proj.url} className="text-blue-700 underline">{proj.name}</a>
                  ) : (
                    proj.name
                  )}
                </div>
                {proj.description && <p className="text-gray-600 mt-0.5 leading-snug">{proj.description}</p>}
                {proj.tech?.length ? <p className="text-gray-500 mt-0.5">{proj.tech.join(", ")}</p> : null}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
