import httpx
from fastapi import HTTPException
from ..config import settings
from typing import Dict, Any

class ProxyService:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=30.0)
        self.service_urls = {
            "auth": settings.auth_service_url,
            "carbon": settings.carbon_service_url,
            "game": settings.game_service_url
        }

    async def forward_request(
        self,
        service: str,
        path: str,
        method: str,
        headers: Dict[str, str] = None,
        data: Any = None,
        params: Dict[str, str] = None
    ):
        if service not in self.service_urls:
            raise HTTPException(status_code=404, detail="Service not found")

        base_url = self.service_urls[service]
        url = f"{base_url}{path}"
        
        # Extract token from Authorization header if present
        token = None
        if headers and "Authorization" in headers:
            auth_header = headers["Authorization"]
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]
                # Add token as query parameter for services that expect it
                if params is None:
                    params = {}
                params["token"] = token

        try:
            response = await self.client.request(
                method=method,
                url=url,
                headers=headers,
                params=params,
                json=data if method in ["POST", "PUT", "PATCH"] else None
            )
            return response
        except httpx.RequestError as e:
            raise HTTPException(status_code=503, detail=f"Service unavailable: {str(e)}")

    async def close(self):
        await self.client.aclose()

# Create and export the instance
proxy_service = ProxyService()
