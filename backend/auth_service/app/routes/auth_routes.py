from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas import UserCreate, UserLogin, Token, UserResponse, UserUpdate
from app.models import User
from app.config import get_db
from app.services.auth_service import (
    register_user,
    authenticate_user,
    generate_user_token,
    logout_user,
    update_user_profile
)
from app.utils.token_utils import verify_access_token

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user.
    Expected data:
        - username: str
        - email: EmailStr
        - password: str
    """
    return register_user(user, db)

@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    """
    Log in an existing user.
    Expected data:
        - email: EmailStr
        - password: str
    """
    authenticated_user = authenticate_user(user.email, user.password, db)
    return generate_user_token(authenticated_user)

@router.post("/logout", status_code=status.HTTP_200_OK)
def logout(token: str, db: Session = Depends(get_db)):
    """
    Log out a user by invalidating the token.
    """
    logout_user(token, db)
    return {"detail": "Logout successful"}

@router.get("/me", response_model=UserResponse)
def get_current_user(token: str, db: Session = Depends(get_db)):
    """
    Get the current authenticated user's profile.
    """
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    user = db.query(User).filter(User.email == payload["sub"]).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

@router.put("/me", response_model=UserResponse)
def update_profile(
    user_update: UserUpdate,
    token: str,
    db: Session = Depends(get_db)
):
    """
    Update the current user's profile.
    """
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    return update_user_profile(payload["sub"], user_update, db)
