from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import or_
from sqlalchemy.orm import Session

from src.db.session import get_db
from src.models.user import User
from src.schemas.user import UserRegister, UserOut, Token, UserPasswordUpdate
from src.core.security import get_password_hash, verify_password, create_access_token
from src.router.api.deps import get_current_user


router = APIRouter()


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user_in: UserRegister, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="This E-mail has been registered. Please use other E-mail to register."
        ) 
    
    new_user = User(
        username=user_in.username,
        email=user_in.email,
        password=get_password_hash(user_in.password)
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(or_(User.email == form_data.username, User.username == form_data.username)).first()
    if not user:
        raise HTTPException(
            status_code=400,
            detail="Wrong email or username"
        )
    
    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=400,
            detail="Wrong password."
        )
    
    access_token = create_access_token(data={"sub": user.email})
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.post("/change-password")
def change_password(
    password_data: UserPasswordUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not verify_password(password_data.old_password, current_user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect old password"
        )
    
    if password_data.old_password == password_data.new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password must be different from the old password"
        )
    
    current_user.password = get_password_hash(password_data.new_password)
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    
    return {"msg": "Updated Successfully"}


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db.delete(current_user)
    db.commit()
    
    return None


@router.get("/me", response_model=UserOut)
def read_user_me(current_user: User = Depends(get_current_user)):
    return current_user