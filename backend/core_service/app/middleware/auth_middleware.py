from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from ..utils.token_utils import verify_token

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Public paths that don't require authentication
        public_paths = [
            "/auth/login",
            "/auth/register",
            "/docs",
            "/openapi.json"
        ]

        if any(request.url.path.startswith(path) for path in public_paths):
            return await call_next(request)

        token = request.headers.get("Authorization")
        
        if not token or not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid token format")
            
        token = token.split(" ")[1]
        payload = verify_token(token)
        
        if not payload:
            raise HTTPException(status_code=401, detail="Invalid or expired token")
            
        request.state.user = payload
        return await call_next(request)