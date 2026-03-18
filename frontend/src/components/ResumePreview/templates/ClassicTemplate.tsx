"use client";

import type { ResumeContent } from "@/types/resume";

interface Props {
  content: ResumeContent;
}

export function ClassicTemplate({ content }: Props) {
  const order = content.sectionOrder.length ? content.sectionOrder : ["personalInfo", "education", "experience", "skills", "certifications", "projects"];
  const { personalInfo, education, experience, skills, certifications = [], projects } = content;

  return (
    <div className="w-full bg-white text-gray-900 p-8 text-sm font-serif box-border min-h-[297mm]">
      {(
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {personalInfo?.fullName || "Your Name"}
          </h1>
          <div className="text-gray-600 text-xs mt-1 space-x-3">
            {personalInfo?.email && <span>{personalInfo.email}</span>}
            {personalInfo?.phone && <span>|</span>}
            {personalInfo?.phone && <span>{personalInfo.phone}</span>}
            {personalInfo?.location && <span>|</span>}
            {personalInfo?.location && <span>{personalInfo.location}</span>}
          </div>
          {personalInfo?.summary && (
            <p className="mt-3 text-gray-700 text-xs max-w-xl mx-auto leading-relaxed">
              {personalInfo.summary}
            </p>
          )}
        </header>
      )}

      <div className="space-y-5">
        {order.includes("education") && education?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-2">
              Education
            </h2>
            {education.map((ed) => (
              <div key={ed.id} className="mb-3">
                <div className="flex justify-between">
                  <span className="font-semibold">{ed.school}</span>
                  <span className="text-xs text-gray-500">
                    {ed.startDate} – {ed.endDate}
                  </span>
                </div>
                <div className="text-gray-700 text-xs italic">
                  {ed.degree}
                  {ed.field && `, ${ed.field}`}
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
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-2">
              Experience
            </h2>
            {experience.map((ex) => (
              <div key={ex.id} className="mb-3">
                <div className="flex justify-between flex-wrap">
                  <span className="font-semibold">{ex.role}, {ex.company}</span>
                  <span className="text-xs text-gray-500">
                    {ex.startDate} – {ex.current ? "Present" : ex.endDate}
                  </span>
                </div>
                {ex.location && (
                  <div className="text-xs text-gray-500">{ex.location}</div>
                )}
                {ex.description && (
                  <p className="text-gray-600 text-xs mt-1 whitespace-pre-line">
                    {ex.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {order.includes("skills") && skills?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-2">
              Skills
            </h2>
            <p className="text-gray-700 text-xs">
              {skills.join(", ")}
            </p>
          </section>
        )}

        {order.includes("certifications") && certifications?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-2">
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-3">
                <div className="flex justify-between">
                  <span className="font-semibold">
                    {cert.url ? (
                      <a href={cert.url} className="text-gray-900 underline">
                        {cert.name}
                      </a>
                    ) : (
                      cert.name
                    )}
                  </span>
                  <span className="text-xs text-gray-500">{cert.date}</span>
                </div>
                <div className="text-gray-700 text-xs italic">{cert.issuer}</div>
              </div>
            ))}
          </section>
        )}

        {order.includes("projects") && projects?.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-2">
              Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="font-semibold">
                  {proj.url ? (
                    <a href={proj.url} className="text-gray-900 underline">
                      {proj.name}
                    </a>
                  ) : (
                    proj.name
                  )}
                </div>
                {proj.description && (
                  <p className="text-gray-600 text-xs mt-0.5">{proj.description}</p>
                )}
                {proj.tech?.length ? (
                  <p className="text-gray-500 text-xs">{proj.tech.join(", ")}</p>
                ) : null}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
