from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class QuizBase(BaseModel):
    question: str
    choices: List[str]
    correct_answer: str

class QuizCreate(QuizBase):
    pass

class Quiz(QuizBase):
    id: int
    owner_id: int
    owner_username: str

    class Config:
        orm_mode = True

class ScoreBase(BaseModel):
    score: int
    quiz_id: int

class ScoreCreate(ScoreBase):
    pass

class Score(ScoreBase):
    id: int
    timestamp: int
    user_id: int
    username: str

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: str
    email: str

class User(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
