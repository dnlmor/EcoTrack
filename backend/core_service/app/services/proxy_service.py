# app/services/proxy_service.py
from fastapi import Request, Response
import httpx
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class ProxyService:
    def __init__(self):
        self.service_urls = {
            "auth": "http://localhost:8001",
            "carbon": "http://localhost:8002",
            "game": "http://localhost:8003"
        }

    async def forward_request(
        self,
        request: Request,
        service: str,
        path: str,
        strip_path: Optional[str] = None
    ) -> Response:
        target_url = f"{self.service_urls[service]}{path}"
        logger.debug(f"Forwarding request to: {target_url}")
        
        try:
            body = await request.body()
            headers = dict(request.headers)
            headers.pop('host', None)
            
            async with httpx.AsyncClient() as client:
                response = await client.request(
                    method=request.method,
                    url=target_url,
                    content=body,
                    headers=headers,
                    follow_redirects=True,
                    timeout=30.0
                )
                
                logger.debug(f"Received response from {service}: {response.status_code}")
                
                cors_headers = {
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Expose-Headers": "Authorization"
                }
                
                return Response(
                    content=response.content,
                    status_code=response.status_code,
                    headers={**dict(response.headers), **cors_headers}
                )
                
        except Exception as e:
            logger.error(f"Error forwarding request to {service}: {str(e)}", exc_info=True)
            return Response(
                content=str(e).encode(),
                status_code=500,
                headers={
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true"
                }
            )

# Create instance at module level
proxy_service = ProxyService()

# Add to __all__ for explicit exports
__all__ = ['proxy_service']