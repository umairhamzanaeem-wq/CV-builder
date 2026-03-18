"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getResume, updateResume } from "@/lib/api";
import { useResumeStore } from "@/store/resumeStore";
import { SectionList } from "@/components/ResumeEditor/SectionList";
import { SectionPanel } from "@/components/ResumeEditor/SectionPanel";
import { TEMPLATES, type TemplateId } from "@/components/ResumeEditor/constants";
import { SectionLabels } from "@/components/ResumeEditor/constants";
import { ResumePreview } from "@/components/ResumePreview/ResumePreview";
import { exportResumeToPdf } from "@/lib/exportPdf";
import type { SectionKey } from "@/types/resume";

const SECTION_ORDER: SectionKey[] = [
  "personalInfo",
  "education",
  "experience",
  "skills",
  "certifications",
  "projects",
];

export default function ResumeEditorPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [title, setTitle] = useState("");
  const [templateId, setTemplateId] = useState<TemplateId>("modern");
  const [activeSection, setActiveSection] = useState<SectionKey>("personalInfo");
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);

  const { content, load } = useResumeStore();
  const loadedIdRef = useRef<number | null>(null);

  const loadResume = useCallback(async () => {
    if (!id || isNaN(id)) return;
    if (loadedIdRef.current === id) return;
    loadedIdRef.current = id;
    try {
      const r = await getResume(id);
      setTitle(r.title);
      setTemplateId((r.template_id as TemplateId) || "modern");
      load(r.content);
      setReady(true);
    } catch {
      loadedIdRef.current = null;
      setNotFound(true);
    }
  }, [id, load]);

  useEffect(() => { loadResume(); }, [loadResume]);

  useEffect(() => {
    const order = content.sectionOrder?.length ? content.sectionOrder : SECTION_ORDER;
    if (!order.includes(activeSection)) {
      setActiveSection(order[0]);
    }
  }, [content.sectionOrder, activeSection]);

  async function handleSave() {
    if (!id || isNaN(id)) return;
    setSaving(true);
    try {
      await updateResume(id, { title, template_id: templateId, content });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  async function handleExportPdf() {
    setExporting(true);
    try {
      await exportResumeToPdf("resume-preview-pdf", `${title || "resume"}.pdf`);
    } catch (e) {
      console.error(e);
    } finally {
      setExporting(false);
    }
  }

  if (notFound) {
    return (
      <div className="mx-auto max-w-4xl p-8 text-center">
        <p className="mb-4 text-red-600">Resume not found.</p>
        <Link href="/dashboard" className="text-sm text-brand-700 hover:text-brand-800">&larr; Back to dashboard</Link>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-ink-50">
        <div className="h-7 w-7 rounded-full border-2 border-ink-200 border-t-brand-600 animate-spin" />
      </div>
    );
  }

  const order = content?.sectionOrder?.length ? content.sectionOrder : SECTION_ORDER;

  return (
    <div className="flex h-[calc(100vh-4rem)] min-h-0 max-h-[calc(100dvh-4rem)] flex-col bg-ink-50 md:flex-row">
      <aside className="flex h-full min-h-0 w-full flex-shrink-0 flex-col border-r border-ink-200/70 bg-white md:w-[27rem]">
        <div className="edit-section-scroll flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <div className="flex items-center gap-3 border-b border-ink-100 p-4">
            <Link
              href="/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink-200 text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-900"
              aria-label="Back"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSave}
              className="flex-1 border-0 bg-transparent text-base font-semibold text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-0"
              placeholder="Resume title"
            />
          </div>

          <div className="border-b border-ink-100 p-4">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Template</label>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value as TemplateId)}
              onBlur={handleSave}
              className="input-base w-full text-sm"
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="border-b border-ink-100 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
              Sections <span className="font-normal normal-case tracking-normal text-ink-400">- drag to reorder</span>
            </p>
            <SectionList activeSection={activeSection} onSelectSection={setActiveSection} />
          </div>

          <div className="border-b border-ink-100 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-500">{SectionLabels[activeSection]}</p>
            <div className="rounded-xl border border-ink-200 bg-ink-50/70 p-3">
              <SectionPanel section={activeSection} />
            </div>
          </div>

          <div className="sticky bottom-0 flex gap-2 border-t border-ink-100 bg-white/95 p-4 backdrop-blur">
            <button onClick={handleSave} disabled={saving} className="btn-secondary flex-1">
              {saving ? "Saving..." : saved ? "Saved" : "Save"}
            </button>
            <button onClick={handleExportPdf} disabled={exporting} className="btn-primary inline-flex flex-1 items-center justify-center gap-1.5">
              {exporting ? "Exporting..." : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export PDF
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-ink-50">
        <div className="flex shrink-0 items-center justify-between border-b border-ink-200/70 bg-white px-4 py-3 md:px-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live preview
          </span>
          <div className="flex flex-wrap gap-1">
            {order.map((key) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                  activeSection === key
                    ? "bg-brand-50 font-medium text-brand-700"
                    : "text-ink-500 hover:bg-ink-100 hover:text-ink-700"
                }`}
              >
                {key === "personalInfo" ? "Info" : SectionLabels[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-auto p-5 md:p-7">
          <div className="flex justify-center">
            <div
              id="resume-preview-pdf"
              className="rounded-lg bg-white shadow-panel"
              style={{ width: "210mm", minHeight: "297mm" }}
            >
              <ResumePreview content={content} templateId={templateId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
