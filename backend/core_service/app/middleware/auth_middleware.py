from fastapi import Request
import logging
from fastapi import Response

logger = logging.getLogger(__name__)

async def auth_middleware(request: Request, call_next):
    logger.debug(f"Auth middleware processing request: {request.url.path}")
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        logger.error(f"Error in auth middleware: {str(e)}", exc_info=True)
        return Response(
            content=str(e).encode(),
            status_code=500,
            headers={
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true"
            }
        )