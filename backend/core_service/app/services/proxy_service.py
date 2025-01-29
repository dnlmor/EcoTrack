from typing import Optional, Dict, Any
from fastapi import Request, Response
from app.utils.http_client import service_client
from app.config import settings

class ProxyService:
    @staticmethod
    def get_service_url(service: str) -> str:
        service_urls = {
            "auth": settings.AUTH_SERVICE_URL,
            "carbon": settings.CARBON_SERVICE_URL,
            "game": settings.GAME_SERVICE_URL
        }
        return service_urls.get(service, "")

    @staticmethod
    async def forward_request(
        request: Request,
        service: str,
        path: str,
        strip_path: Optional[str] = None
    ) -> Response:
        # Get base URL for the service
        service_url = ProxyService.get_service_url(service)
        if not service_url:
            raise ValueError(f"Invalid service: {service}")

        # Strip the prefix if provided
        if strip_path and path.startswith(strip_path):
            path = path[len(strip_path):]
        
        # Build target URL
        target_url = f"{service_url}{path}"
        
        # Get request body if present
        body = None
        if request.method in ["POST", "PUT", "PATCH"]:
            body = await request.json()
        
        # Forward the request
        response = await service_client.forward_request(
            method=request.method,
            url=target_url,
            headers=dict(request.headers),
            params=dict(request.query_params),
            json=body
        )
        
        return Response(
            content=response.content,
            status_code=response.status_code,
            headers=dict(response.headers)
        )

proxy_service = ProxyService()