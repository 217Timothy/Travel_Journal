from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from src.db.session import get_db
from src.models.trip import Trip
from src.schemas.trip import TripRead, TripCreate, TripUpdate
from src.router.api.deps import get_current_user


router = APIRouter()


@router.post("/", response_model=TripRead)
def create_trip(
    trip_in: TripCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    if trip_in.start_date and trip_in.end_date:
        if trip_in.start_date > trip_in.end_date:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Start date cannot be later then end date"
            )
    
    new_trip = Trip(
        **trip_in.model_dump(),
        owner_id=current_user.id
    )
    db.add(new_trip)
    db.commit()
    db.refresh(new_trip)
    
    return new_trip


@router.get("/", response_model=List[TripRead])
def get_trips(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    trips = (
        db.query(Trip)
        .filter(Trip.owner_id == current_user.id)
        .order_by(Trip.created_at.desc())
        .all()
    )
    return trips


@router.get("/{trip_id}", response_model=TripRead)
def get_trip(
    trip_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    trip = (
        db.query(Trip)
        .filter(
            Trip.id == trip_id,
            Trip.owner_id == current_user.id
        )
        .first()
    )
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trip not found"
        )
    
    return trip


@router.patch("/{trip_id}", response_model=TripRead)
def update_trip(
    trip_id: int,
    trip_in: TripUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    trip_to_update = (
        db.query(Trip)
        .filter(
            Trip.id == trip_id,
            Trip.owner_id == current_user.id
        )
        .first()
    )
    if not trip_to_update:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trip not found"
        )
    
    update_date = trip_in.model_dump(exclude_unset=True)
    
    new_start_date = update_date.get("start_date", trip_to_update.start_date)
    new_end_date = update_date.get("end_date", trip_to_update.end_date)
    if new_start_date and new_end_date and new_start_date > new_end_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Start date cannot be later then end date"
        )
    
    for field, value in update_date.items():
        setattr(trip_to_update, field, value)
    
    db.commit()
    db.refresh(trip_to_update)
    
    return trip_to_update


@router.delete("/{trip_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_trip(
    trip_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    trip_to_delete = (
        db.query(Trip)
        .filter(
            Trip.id == trip_id,
            Trip.owner_id == current_user.id
        )
        .first()
    )
    if not trip_to_delete:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trip not found"
        )
    
    db.delete(trip_to_delete)
    db.commit()