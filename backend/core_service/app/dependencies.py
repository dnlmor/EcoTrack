from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.config import JWT_SECRET_KEY, ALGORITHM
import requests

# OAuth2PasswordBearer instance for extracting the token from Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_token(token: str):
    """
    Verifies the JWT token and returns the decoded data if valid.
    """
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Dependency to verify JWT token and get user info
def get_current_user(token: str = Depends(oauth2_scheme)):
    return verify_token(token)
