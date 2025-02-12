from fastapi import Depends, HTTPException
from .utils.token_utils import decode_token, get_user_from_token
from sqlalchemy.orm import Session
from .database import get_db
import logging

logger = logging.getLogger(__name__)

# Dependency for token validation
def get_current_user(token: str = Depends(get_user_from_token)):
    try:
        user = decode_token(token)
        return user
    except Exception as e:
        logger.error(f"Token validation error: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid token")

# Dependency for shared database connection
def get_db_connection(db: Session = Depends(get_db)):
    return db
