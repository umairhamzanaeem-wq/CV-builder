"use client";

import type { ResumeContent } from "@/types/resume";

interface Props {
  content: ResumeContent;
}

export function MinimalTemplate({ content }: Props) {
  const order = content.sectionOrder.length ? content.sectionOrder : ["personalInfo", "education", "experience", "skills", "certifications", "projects"];
  const { personalInfo, education, experience, skills, certifications = [], projects } = content;

  return (
    <div className="w-full bg-white text-gray-900 p-8 text-sm box-border min-h-[297mm]">
      {(
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            {personalInfo?.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap gap-2 text-gray-500 text-xs mt-1">
            {personalInfo?.email && <span>{personalInfo.email}</span>}
            {personalInfo?.phone && <span>{personalInfo.phone}</span>}
            {personalInfo?.location && <span>{personalInfo.location}</span>}
          </div>
          {personalInfo?.summary && (
            <p className="mt-2 text-gray-600 text-xs leading-relaxed">
              {personalInfo.summary}
            </p>
          )}
        </header>
      )}

      <div className="space-y-5">
        {order.includes("education") && education?.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-gray-500 mb-2">
              Education
            </h2>
            {education.map((ed) => (
              <div key={ed.id} className="mb-2">
                <span className="font-medium text-gray-900">{ed.school}</span>
                <span className="text-gray-500 text-xs ml-2">
                  {ed.startDate} – {ed.endDate}
                </span>
                <div className="text-gray-600 text-xs">
                  {ed.degree}
                  {ed.field && `, ${ed.field}`}
                </div>
                {ed.description && (
                  <p className="text-gray-500 text-xs mt-0.5">{ed.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {order.includes("experience") && experience?.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-gray-500 mb-2">
              Experience
            </h2>
            {experience.map((ex) => (
              <div key={ex.id} className="mb-2">
                <span className="font-medium text-gray-900">{ex.role}</span>
                <span className="text-gray-500 text-xs ml-2">
                  {ex.startDate} – {ex.current ? "Present" : ex.endDate}
                </span>
                <div className="text-gray-600 text-xs">{ex.company}</div>
                {ex.description && (
                  <p className="text-gray-500 text-xs mt-0.5 whitespace-pre-line">
                    {ex.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {order.includes("skills") && skills?.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-gray-500 mb-2">
              Skills
            </h2>
            <p className="text-gray-600 text-xs">{skills.join(", ")}</p>
          </section>
        )}

        {order.includes("certifications") && certifications?.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-gray-500 mb-2">
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <span className="font-medium text-gray-900">
                  {cert.url ? (
                    <a href={cert.url} className="hover:underline">
                      {cert.name}
                    </a>
                  ) : (
                    cert.name
                  )}
                </span>
                <span className="text-gray-500 text-xs ml-2">{cert.date}</span>
                <div className="text-gray-600 text-xs">{cert.issuer}</div>
              </div>
            ))}
          </section>
        )}

        {order.includes("projects") && projects?.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-gray-500 mb-2">
              Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                {proj.url ? (
                  <a href={proj.url} className="font-medium text-gray-900 hover:underline">
                    {proj.name}
                  </a>
                ) : (
                  <span className="font-medium text-gray-900">{proj.name}</span>
                )}
                {proj.description && (
                  <p className="text-gray-500 text-xs mt-0.5">{proj.description}</p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
