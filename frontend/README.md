# CV Builder Frontend

Next.js 14 (App Router) + TypeScript + TailwindCSS. Uses dnd-kit for drag-and-drop, Zustand for state, and jspdf/html2canvas for PDF export.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Ensure the backend is running at `http://localhost:8000` (or set `NEXT_PUBLIC_API_URL` in `.env.local`).

3. Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the proxy in `next.config.js` so API calls go to the backend.

## Features

- **Auth**: Sign up / Log in (JWT stored in Zustand persist).
- **Dashboard**: List and create resumes; open or delete.
- **Resume editor**: Sidebar (section list + section editor) + live preview.
- **Sections**: Personal Info, Education, Experience, Skills, Projects.
- **Drag and drop**: Reorder sections via dnd-kit (drag the ⋮⋮ handle).
- **Templates**: Modern, Classic, Minimal (switch in sidebar).
- **Export PDF**: Renders the preview with html2canvas and jspdf.
