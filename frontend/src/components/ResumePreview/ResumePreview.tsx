"use client";

import type { ResumeContent } from "@/types/resume";
import type { TemplateId } from "@/components/ResumeEditor/constants";
import { ModernTemplate } from "./templates/ModernTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";
import { TechTemplate } from "./templates/TechTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { CompactTemplate } from "./templates/CompactTemplate";
import { AcademicTemplate } from "./templates/AcademicTemplate";

const templates: Record<TemplateId, React.ComponentType<{ content: ResumeContent }>> = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  tech: TechTemplate,
  creative: CreativeTemplate,
  compact: CompactTemplate,
  academic: AcademicTemplate,
};

interface Props {
  content: ResumeContent;
  templateId?: TemplateId;
  className?: string;
  id?: string;
}

export function ResumePreview({ content, templateId = "modern", className, id }: Props) {
  const Template = templates[templateId] ?? ModernTemplate;

  return (
    <div
      id={id}
      className={`${className ?? ""} w-full min-h-full`}
      style={{ minHeight: "297mm" }}
    >
      <Template content={content} />
    </div>
  );
}
