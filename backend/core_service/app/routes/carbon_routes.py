from fastapi import APIRouter, Request, Response
from app.services.proxy_service import ProxyService

router = APIRouter()
proxy_service = ProxyService()

@router.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def carbon_proxy(request: Request, path: str):
    method = request.method
    headers = dict(request.headers)
    params = dict(request.query_params)
    body = await request.json() if method in ["POST", "PUT", "PATCH"] else None

    response = await proxy_service.forward_request(
        service="carbon",
        path=f"/api/v1/carbon/{path}",
        method=method,
        headers=headers,
        params=params,
        data=body
    )
    
    return Response(
        content=response.content,
        status_code=response.status_code,
        headers=dict(response.headers)
    )