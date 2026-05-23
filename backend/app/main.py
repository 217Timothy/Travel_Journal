from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings

app = FastAPI(
    title="Travel Journal API",
    description="Backend API for the Travel Journal application",
    version="0.1.0",
    docs_url="/docs",    # Swagger UI → http://localhost:8000/docs
    redoc_url="/redoc",
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
# Uncomment as you build each phase:

# Phase 1A
# from app.routers import auth, users
# app.include_router(auth.router,  prefix="/api/v1/auth",  tags=["Auth"])
# app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])

# Phase 2A
# from app.routers import trips
# app.include_router(trips.router, prefix="/api/v1/trips", tags=["Trips"])

# Phase 3A
# from app.routers import itinerary
# app.include_router(itinerary.router, prefix="/api/v1/itinerary", tags=["Itinerary"])

# Phase 4A
# from app.routers import places, photos, journal
# ...

# Phase 5A
# from app.routers import ai
# app.include_router(ai.router, prefix="/api/v1/ai", tags=["AI"])


# ── Health Check ──────────────────────────────────────────────────────────────
@app.get("/health", tags=["System"])
def health_check():
    return {"status": "ok", "env": settings.APP_ENV}
