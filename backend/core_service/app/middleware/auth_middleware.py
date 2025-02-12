from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from .utils.token_utils import decode_token
import logging

logger = logging.getLogger(__name__)

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        token = request.headers.get("Authorization")
        
        if token is None:
            logger.warning("Authorization header missing")
            raise HTTPException(status_code=401, detail="Authorization header missing")

        token = token.split(" ")[1]  # Extract token from "Bearer <token>"
        
        try:
            decode_token(token)
        except Exception as e:
            logger.error(f"Invalid token: {str(e)}")
            return JSONResponse(status_code=401, content={"detail": "Invalid token"})

        response = await call_next(request)
        return response
