from pydantic import BaseModel, EmailStr, constr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    username: constr

class UserProfile(UserBase):
    email_verified: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class UserProfileUpdate(BaseModel):
    username: Optional[constr] = None
    email: Optional[EmailStr] = None

class UserResponse(BaseModel):
    message: str
    user: UserProfile

class ErrorResponse(BaseModel):
    detail: str