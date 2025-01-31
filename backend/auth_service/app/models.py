from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text
from sqlalchemy.sql import func
from app.config import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    email_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    
    # Profile fields
    full_name = Column(String(255))
    bio = Column(Text)
    avatar_url = Column(String(255))
    phone_number = Column(String(50))