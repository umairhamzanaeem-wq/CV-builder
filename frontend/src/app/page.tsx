import Link from "next/link";

const highlights = [
  {
    title: "Template variety",
    desc: "8 production-ready templates tailored for modern hiring workflows.",
  },
  {
    title: "Live editing",
    desc: "Every change appears instantly on the A4 preview in real time.",
  },
  {
    title: "Section control",
    desc: "Reorder, refine, and prioritize each section without friction.",
  },
  {
    title: "Export quality",
    desc: "One-click PDF output optimized for ATS and recruiter readability.",
  },
  {
    title: "Complete profile",
    desc: "Support for personal info, experience, projects, skills, and certifications.",
  },
  {
    title: "Focused workflow",
    desc: "A clean interface designed to help you ship resumes faster.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-ink-50">
      <header className="border-b border-ink-200/70 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <span className="text-base font-semibold text-ink-900">CV Builder</span>
          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-100 hover:text-ink-900">
              Sign in
            </Link>
            <Link href="/signup" className="btn-primary px-4 py-2 text-sm">
              Start free
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-16 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="pill mb-4">Trusted by students, professionals, and founders</span>
          <h1 className="max-w-xl text-balance text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl">
            Resumes that look credible, clear, and recruiter-ready.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-600 sm:text-lg">
            Build your resume in minutes with a focused editor, live preview, and templates
            designed for real hiring pipelines.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/signup" className="btn-primary px-5 py-3 text-sm">
              Create resume
            </Link>
            <Link href="/login" className="btn-secondary px-5 py-3 text-sm">
              Open dashboard
            </Link>
          </div>
          <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
            <div>
              <p className="text-xl font-semibold text-ink-900">8</p>
              <p className="text-xs text-ink-500">Templates</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-ink-900">Live</p>
              <p className="text-xs text-ink-500">Preview</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-ink-900">A4</p>
              <p className="text-xs text-ink-500">PDF export</p>
            </div>
          </div>
        </div>

        <div className="card-base overflow-hidden bg-white">
          <div className="border-b border-ink-200 px-5 py-3">
            <p className="text-sm font-medium text-ink-700">Resume Quality Preview</p>
          </div>
          <div className="space-y-4 p-5">
            <div className="h-3 w-2/5 rounded bg-ink-900/90" />
            <div className="h-2 w-3/5 rounded bg-ink-300" />
            <div className="h-px bg-ink-200" />
            <div className="space-y-2">
              <div className="h-2 w-1/4 rounded bg-ink-500" />
              <div className="h-2 w-11/12 rounded bg-ink-200" />
              <div className="h-2 w-10/12 rounded bg-ink-200" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-1/3 rounded bg-ink-500" />
              <div className="h-2 w-11/12 rounded bg-ink-200" />
              <div className="h-2 w-9/12 rounded bg-ink-200" />
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="h-6 rounded-md bg-brand-50" />
              <div className="h-6 rounded-md bg-brand-50" />
              <div className="h-6 rounded-md bg-brand-50" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink-200/70 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-ink-900">Built for practical job searching</h2>
            <p className="mt-2 text-sm text-ink-500">Everything you need, without visual noise.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="card-base p-5">
                <h3 className="text-sm font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="card-base flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-ink-900">Ready to build your next resume?</h2>
            <p className="mt-1 text-sm text-ink-500">No credit card. Start with a clean template.</p>
          </div>
          <Link href="/signup" className="btn-primary px-5 py-3 text-sm">
            Create your resume
          </Link>
        </div>
      </section>

      <footer className="border-t border-ink-200/70 bg-white py-7">
        <p className="text-center text-xs text-ink-400">CV Builder</p>
      </footer>
    </main>
  );
}
