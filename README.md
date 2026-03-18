# CV Builder – Full Stack Application

A full-stack Resume/CV Builder with user auth, drag-and-drop section reordering, live preview, multiple templates, and PDF export.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, dnd-kit, Zustand, jspdf, html2canvas
- **Backend**: Python FastAPI, JWT auth, SQLAlchemy ORM
- **Database**: SQLite (local file; no separate DB server)

## Project Structure

```
CV_builder/
├── backend/          # FastAPI app
│   ├── app/
│   │   ├── api/      # auth, resumes routes
│   │   ├── core/     # security (JWT, password hashing)
│   │   ├── crud/     # user, resume CRUD
│   │   ├── models/   # User, Resume
│   │   ├── schemas/  # Pydantic schemas
│   │   └── database.py, config.py
│   ├── main.py
│   └── requirements.txt
├── frontend/         # Next.js 14 app
│   ├── src/
│   │   ├── app/      # pages (/, login, signup, dashboard, dashboard/resume/[id])
│   │   ├── components/ # ResumeEditor, ResumePreview (templates)
│   │   ├── lib/      # api, exportPdf
│   │   ├── store/    # authStore, resumeStore (Zustand)
│   │   └── types/
│   └── package.json
└── README.md
```

## Quick Start

The app uses **SQLite** by default. The database file `cv_builder.db` is created automatically in the `backend/` folder when you start the API. No database server or setup needed.

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # Optional: set SECRET_KEY etc.
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://localhost:8000/docs

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:3000. The frontend proxies API requests to `http://localhost:8000` via `next.config.js`.

## Features

- **Auth**: Sign up, log in (JWT); dashboard and resume editor require login.
- **Dashboard**: List resumes, create new, delete, open in editor.
- **Resume editor**: Sidebar (section list + form) + live preview.
- **Sections**: Personal Info, Education, Experience, Skills, Projects.
- **Drag and drop**: Reorder sections with dnd-kit (drag the ⋮⋮ handle); click section name to edit.
- **Templates**: Modern, Classic, Minimal (select in sidebar).
- **Export**: Export current preview as PDF (client-side via html2canvas + jspdf).
- **Persistence**: Resume content stored as JSON in SQLite; auto-save on blur, manual Save button.

## Environment

- **Backend** (`.env`): Optional. Defaults use `sqlite:///./cv_builder.db`. You can set `SECRET_KEY`, `ALGORITHM`, `ACCESS_TOKEN_EXPIRE_MINUTES`.
- **Frontend** (optional `.env.local`): `NEXT_PUBLIC_API_URL` if backend is not at `http://localhost:8000`
