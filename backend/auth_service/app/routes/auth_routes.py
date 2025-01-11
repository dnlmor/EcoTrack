from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import UserCreate, UserLogin, Token, UserResponse
from app.config import get_db
from app.services.auth_service import register_user, authenticate_user, generate_user_token

router = APIRouter()

# User Registration Endpoint
@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(user, db)

# User Login Endpoint
@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    authenticated_user = authenticate_user(user.email, user.password, db)
    return generate_user_token(authenticated_user)
