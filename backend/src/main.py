from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.db.session import engine, Base
import src.models
from src.router.api.v1 import api


app = FastAPI(
    title="Travel Journal",
    description="旅遊行程管理與日誌",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # 允許你的前端存取
    allow_credentials=True,
    allow_methods=["*"], # 允許所有方法 (GET, POST, etc.)
    allow_headers=["*"], # 允許所有 Header
)

app.include_router(api.api_router, prefix="/api/v1")

@app.get("/")
def home():
    return {
        "message": "TraveLog-AI Backend is running!",
        "database": "Connected",
        "tables": ["users", "trips", "itinerary_items", "places", "photos"]
    }