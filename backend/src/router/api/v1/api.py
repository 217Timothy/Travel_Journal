from fastapi import APIRouter
from src.router.api.v1.endpoints import auth, trips

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(trips.router, prefix="/trips", tags=["Trips"])