from sqlalchemy import Column, Integer, String, Text, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from src.db.session import Base
from datetime import datetime, timezone


class Trip(Base):
    __tablename__ = "trips"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    location = Column(String, nullable=False)
    description = Column(String, nullable=True)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    
    owner = relationship("User", back_populates="trips")
    photos = relationship("Photo", back_populates="trip", cascade="all, delete-orphan")
    itinerary_items = relationship("ItineraryItem", back_populates="trip", cascade="all, delete-orphan")


class ItineraryItem(Base):
    __tablename__ = "itinerary_items"
    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id", ondelete="CASCADE"))
    place_id = Column(Integer, ForeignKey("places.id", ondelete="SET NULL"), nullable=True)
    
    day_number = Column(Integer, default=1, index=True)
    start_time = Column(String, nullable=True)
    note = Column(Text, nullable=True)
    link_url = Column(String, nullable=True)
    
    trip = relationship("Trip", back_populates="itinerary_items")
    place = relationship("Place")
    photos = relationship("Photo", back_populates="itinerary_item", cascade="all, delete-orphan")