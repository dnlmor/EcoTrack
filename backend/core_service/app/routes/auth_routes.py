from fastapi import APIRouter, Request, Response
from app.services.proxy_service import ProxyService

router = APIRouter()
proxy_service = ProxyService()

@router.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def auth_proxy(request: Request, path: str):
    method = request.method
    headers = dict(request.headers)
    body = await request.json() if method in ["POST", "PUT", "PATCH"] else None

    response = await proxy_service.forward_request(
        service="auth",
        path=f"/auth/{path}",
        method=method,
        headers=headers,
        data=body
    )
    
    return Response(
        content=response.content,
        status_code=response.status_code,
        headers=dict(response.headers)
    )