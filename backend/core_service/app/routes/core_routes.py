from fastapi import APIRouter
from app.utils.discovery_utils import get_service_url
from fastapi.responses import JSONResponse
import httpx

router = APIRouter()

@router.get("/discover/{service_name}")
def discover_service(service_name: str):
    """
    Discover a registered service's URL.
    """
    try:
        service_url = get_service_url(service_name)
        return JSONResponse(content={"service_url": service_url}, status_code=200)
    except ValueError as e:
        return JSONResponse(content={"error": str(e)}, status_code=404)

@router.get("/services")
def list_services():
    """
    List all registered services.
    """
    services = {
        "auth_service": get_service_url("auth_service"),
        "carbon_tracking_service": get_service_url("carbon_tracking_service"),
        "game_service": get_service_url("game_service")
    }
    return JSONResponse(content=services, status_code=200)

@router.get("/health/{service_name}")
async def check_service_health(service_name: str):
    """
    Check the health of a specific service.
    """
    try:
        service_url = get_service_url(service_name)
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{service_url}/health")
        if response.status_code == 200:
            return JSONResponse(content={"status": "OK"}, status_code=200)
        else:
            return JSONResponse(content={"status": "Service Unhealthy"}, status_code=503)
    except ValueError as e:
        return JSONResponse(content={"error": str(e)}, status_code=404)
    except httpx.RequestError:
        return JSONResponse(content={"status": "Service Unreachable"}, status_code=503)
