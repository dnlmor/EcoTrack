from sqlalchemy.orm import Session
from app.models import User
from app.schemas import UserCreate
from app.utils.token_utils import (
    hash_password,
    verify_password,
    create_access_token,
    verify_access_token,
    blacklist_token,
)
from fastapi import HTTPException, status

# Register a New User
def register_user(user: UserCreate, db: Session):
    existing_user = db.query(User).filter((User.email == user.email) | (User.username == user.username)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already exists."
        )

    hashed_password = hash_password(user.password)
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Authenticate User for Login
def authenticate_user(email: str, password: str, db: Session):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials."
        )
    return user

# Generate Token for User
def generate_user_token(user):
    # Check if user is a dict or User object and extract email accordingly
    if isinstance(user, dict):
        token_data = {"sub": user["sub"]}
    else:
        token_data = {"sub": user.email}
    
    token = create_access_token(token_data)
    return {"access_token": token, "token_type": "bearer"}

# Logout User
def logout_user(token: str, db: Session):
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    # Blacklist the token
    blacklist_token(token)
