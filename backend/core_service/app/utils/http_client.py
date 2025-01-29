import httpx
from typing import Optional, Dict, Any

class ServiceClient:
    async def forward_request(
        self,
        method: str,
        url: str,
        headers: Dict[str, str] = None,
        params: Dict[str, str] = None,
        json: Optional[Dict[str, Any]] = None
    ):
        async with httpx.AsyncClient() as client:
            response = await client.request(
                method=method,
                url=url,
                headers=headers,
                params=params,
                json=json,
                timeout=30.0
            )
            return response

service_client = ServiceClient()
