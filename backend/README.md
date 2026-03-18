# CV Builder Backend

FastAPI backend with JWT auth and SQLite (default). The database file `cv_builder.db` is created automatically in this folder when you start the server.

## Setup

1. Create a virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. Optional: copy `.env.example` to `.env` and set `SECRET_KEY`. Default `DATABASE_URL` is `sqlite:///./cv_builder.db`.

3. Run the server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://localhost:8000/docs
