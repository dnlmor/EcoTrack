from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, JSON, Float
from sqlalchemy.orm import relationship
from app.database import Base
from sqlalchemy.sql import func

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    quizzes = relationship("Quiz", back_populates="owner")

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    username = Column(String, nullable=False)
    score = Column(Float, nullable=True)
    correct_answers = Column(Integer, nullable=True)
    wrong_answers = Column(Integer, nullable=True)
    timestamp = Column(DateTime, server_default=func.now())
    questions = Column(JSON, nullable=True)
    answers = Column(JSON, nullable=True)

    owner = relationship("User", back_populates="quizzes")
