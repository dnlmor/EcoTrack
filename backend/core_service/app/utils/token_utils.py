import jwt
from fastapi import HTTPException
from app.config import JWT_SECRET_KEY, ALGORITHM
from datetime import datetime, timedelta

def decode_token(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_user_from_token(token: str):
    payload = decode_token(token)
    return payload.get("email")
