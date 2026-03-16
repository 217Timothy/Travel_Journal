from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from src.db.session import Base


class Place(Base):
    __tablename__ = "places"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    place_type = Column(String, default="attraction")
    address = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    map_url = Column(String, nullable=True)
    website_url = Column(String, nullable=True)
    
    # Google Maps API 的唯一識別碼 (預留功能)
    # 未來如果你想串 Google API 自動抓評價或照片，這會用到
    google_place_id = Column(String, unique=True, nullable=True)