from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


# Schema for user registration
class UserRegister(BaseModel):
    username: str = Field(..., max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)


# Schema for user login
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Schema for user response (API Output)
class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime
    
    class Config:
        from_attributes = True


# Schema for JWT token response
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# Schema for JWT payload after parsing
class TokenData(BaseModel):
    email: Optional[EmailStr] = None


class UserPasswordUpdate(BaseModel):
    old_password: str
    new_password: str = Field(..., min_length=8)