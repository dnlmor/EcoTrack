from fastapi import APIRouter
from app.utils.discovery_utils import get_service_url
from fastapi.responses import JSONResponse

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
