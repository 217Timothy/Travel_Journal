from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime, date


class TripBase(BaseModel):
    title: str
    location: str
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None


# 前端傳進來（輸入進來的）
class TripCreate(TripBase):
    pass


# 前端傳進來（輸入進來的）
class TripUpdate(BaseModel):
    title: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None


# 回傳給前端（輸出出去的）
class TripRead(TripBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True