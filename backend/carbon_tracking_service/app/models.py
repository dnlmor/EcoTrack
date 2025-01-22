from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

class CarbonRecord(Base):
    __tablename__ = "carbon_records"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    details = Column(String, nullable=False)  # JSON string of user input
    carbon_footprint = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
