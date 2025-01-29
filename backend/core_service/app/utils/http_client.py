import httpx
from fastapi import HTTPException
from typing import Any, Dict, Optional

class ServiceClient:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=30.0)
    
    async def forward_request(
        self,
        method: str,
        url: str,
        headers: Optional[Dict] = None,
        data: Any = None,
        params: Optional[Dict] = None,
        json: Any = None
    ) -> httpx.Response:
        try:
            # Remove content-length if present as it will be recalculated
            if headers and "content-length" in headers:
                del headers["content-length"]
            
            response = await self.client.request(
                method=method,
                url=url,
                headers=headers,
                data=data,
                params=params,
                json=json,
                follow_redirects=True
            )
            
            # Raise error for bad responses
            response.raise_for_status()
            return response
            
        except httpx.HTTPError as e:
            if isinstance(e, httpx.HTTPStatusError):
                # Forward the error status code and detail from the service
                raise HTTPException(
                    status_code=e.response.status_code,
                    detail=e.response.json() if e.response.content else str(e)
                )
            raise HTTPException(status_code=500, detail=str(e))
            
    async def close(self):
        await self.client.aclose()

service_client = ServiceClient()