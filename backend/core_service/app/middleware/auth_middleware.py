from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from app.config import settings

security = HTTPBearer()

async def verify_token(credentials: HTTPAuthorizationCredentials = security):
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        return payload
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials"
        )

async def auth_middleware(request: Request, call_next):
    # List of paths that don't require authentication
    public_paths = [
        "/api/auth/login",
        "/api/auth/register",
        "/docs",
        "/redoc",
        "/openapi.json"
    ]
    
    if request.url.path in public_paths:
        return await call_next(request)
    
    if not request.headers.get("Authorization"):
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )
    
    try:
        credentials = HTTPAuthorizationCredentials(
            scheme="Bearer",
            credentials=request.headers["Authorization"].split(" ")[1]
        )
        await verify_token(credentials)
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
    
    return await call_next(request)