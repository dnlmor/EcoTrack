from jose import jwt, JWTError
from fastapi import HTTPException, status
from app.config import settings

def get_user_from_token(token: str) -> str:
    """
    Decodes the JWT token to retrieve the user ID (either an email or user ID)
    and raises an exception if the token is invalid or expired.
    """
    try:
        # Decode the JWT token using the secret key and algorithm
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.algorithm])
        
        # Extract the user_id (which can be an email or an integer)
        user_id = payload.get("sub")
        
        # If the 'sub' field is missing, it means the token is invalid
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: 'sub' field is missing"
            )
        
        # Return the user_id as a string (it can be an email or an integer)
        return str(user_id)
    
    except JWTError as e:
        # Add detailed error message to improve troubleshooting
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token validation failed: {str(e)}"
        )
