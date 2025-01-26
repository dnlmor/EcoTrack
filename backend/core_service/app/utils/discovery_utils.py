from app.config import AUTH_SERVICE_URL, CARBON_TRACKING_SERVICE_URL

def get_service_url(service_name: str) -> str:
    """
    Get the URL of a registered service.
    """
    if service_name == "auth_service":
        return AUTH_SERVICE_URL
    elif service_name == "carbon_tracking_service":
        return CARBON_TRACKING_SERVICE_URL
    else:
        raise ValueError(f"Service '{service_name}' not registered.")
