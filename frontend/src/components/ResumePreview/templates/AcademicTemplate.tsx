"use client";

import type { ResumeContent } from "@/types/resume";

const DEFAULT_ORDER = ["personalInfo", "education", "experience", "skills", "certifications", "projects"] as const;

interface Props {
  content: ResumeContent;
}

export function AcademicTemplate({ content }: Props) {
  const order = content.sectionOrder?.length ? content.sectionOrder : [...DEFAULT_ORDER];
  const { personalInfo, education, experience, skills, certifications = [], projects } = content;

  return (
    <div className="w-full bg-white text-gray-900 p-8 text-sm box-border font-serif min-h-[297mm]">
      {(
        <header className="text-center border-b border-gray-300 pb-4 mb-5">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {personalInfo?.fullName || "Your Name"}
          </h1>
          <div className="text-gray-600 text-xs mt-2 space-x-2">
            {personalInfo?.email && <span>{personalInfo.email}</span>}
            {personalInfo?.phone && <span>|</span>}
            {personalInfo?.phone && <span>{personalInfo.phone}</span>}
            {personalInfo?.location && <span>|</span>}
            {personalInfo?.location && <span>{personalInfo.location}</span>}
          </div>
          {(personalInfo?.linkedin || personalInfo?.website) && (
            <div className="text-xs mt-1 text-gray-600">
              {personalInfo?.linkedin && <a href={personalInfo.linkedin} className="underline">LinkedIn</a>}
              {personalInfo?.linkedin && personalInfo?.website && " · "}
              {personalInfo?.website && <a href={personalInfo.website} className="underline">Website</a>}
            </div>
          )}
          {personalInfo?.summary && (
            <p className="mt-3 text-gray-700 text-xs leading-relaxed max-w-xl mx-auto italic">
              {personalInfo.summary}
            </p>
          )}
        </header>
      )}

      <div className="space-y-5">
        {order.includes("education") && education?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-2">
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
                {ed.description && (
                  <p className="text-gray-600 text-xs mt-1">{ed.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {order.includes("experience") && experience?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-2">
              Professional Experience
            </h2>
            {experience.map((ex) => (
              <div key={ex.id} className="mb-3">
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <span className="font-semibold text-gray-900">{ex.role}</span>
                  <span className="text-xs text-gray-500">
                    {ex.startDate} – {ex.current ? "Present" : ex.endDate}
                  </span>
                </div>
                <div className="text-gray-700 text-xs">
                  {ex.company}
                  {ex.location && `, ${ex.location}`}
                </div>
                {ex.description && (
                  <p className="text-gray-600 text-xs mt-1 whitespace-pre-line">{ex.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {order.includes("skills") && skills?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-2">
              Skills
            </h2>
            <p className="text-gray-700 text-xs">{skills.join(", ")}</p>
          </section>
        )}

        {order.includes("certifications") && certifications?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-2">
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
                <div className="text-gray-700 text-xs">{cert.issuer}{cert.date ? ` · ${cert.date}` : ""}</div>
              </div>
            ))}
          </section>
        )}

        {order.includes("projects") && projects?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-2">
              Selected Projects
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
                {proj.description && (
                  <p className="text-gray-600 text-xs mt-0.5">{proj.description}</p>
                )}
                {proj.tech?.length ? (
                  <p className="text-gray-500 text-xs mt-0.5">{proj.tech.join(", ")}</p>
                ) : null}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
