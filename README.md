# ✈️ Travel Journal

A full-stack travel notebook — schedule, diary, and AI in one place.

## Tech Stack

| Layer    | Tech |
|----------|------|
| Backend  | Python · FastAPI · SQLAlchemy · Alembic |
| Frontend | Next.js · TypeScript · Tailwind CSS |
| Auth     | JWT (access + refresh tokens) |
| DB (dev) | SQLite → PostgreSQL (prod) |
| AI       | OpenAI / Anthropic (Phase 5) |

---

## Project Structure

```
travel-journal/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry point
│   │   ├── core/
│   │   │   ├── config.py        # App settings (pydantic-settings)
│   │   │   ├── database.py      # SQLAlchemy engine + session
│   │   │   └── security.py      # JWT + bcrypt
│   │   ├── models/              # ORM models (SQLAlchemy)
│   │   ├── schemas/             # Request/Response schemas (Pydantic)
│   │   ├── routers/             # API route handlers
│   │   ├── services/            # Business logic
│   │   └── dependencies/        # FastAPI dependency injection
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── app/                 # Next.js App Router
    │   ├── components/          # Reusable UI components
    │   ├── lib/                 # API client, utils
    │   └── types/               # TypeScript types
    └── .env.local.example
```

---

## Getting Started

### Backend

```bash
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up env
cp .env.example .env

# Run dev server
uvicorn app.main:app --reload
# → http://localhost:8000/docs
```

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
# → http://localhost:3000
```

---

## Roadmap

| Phase | Area | Feature | Status |
|-------|------|---------|--------|
| 1A | Backend  | Auth, User, JWT, DB setup | 🔨 In Progress |
| 1B | Frontend | Login/Register, basic layout | ⬜ Pending |
| 2A | Backend  | Trip model & CRUD API | ⬜ Pending |
| 2B | Frontend | Trip dashboard & cards | ⬜ Pending |
| 3A | Backend  | Itinerary, timeline structure | ⬜ Pending |
| 3B | Frontend | Timeline UI, calendar | ⬜ Pending |
| 4A | Backend  | Places, photo upload, journal | ⬜ Pending |
| 4B | Frontend | Gallery, map, journal pages | ⬜ Pending |
| 5A | Backend  | AI journal, captions, recommendations | ⬜ Pending |
| 5B | Frontend | AI assistant UI | ⬜ Pending |
| 6A | Backend  | Public sharing, collaboration | ⬜ Pending |
| 6B | Frontend | Social UI, public profiles | ⬜ Pending |
| 7A | Backend  | Redis, background jobs, security | ⬜ Pending |
| 7B | Frontend | Responsive, performance, deployment | ⬜ Pending |
