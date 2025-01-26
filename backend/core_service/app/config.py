import os

# Load environment variables for services
AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL", "http://auth_service:8001")
CARBON_TRACKING_SERVICE_URL = os.getenv("CARBON_TRACKING_SERVICE_URL", "http://carbon_tracking_service:8002")

CORE_SERVICE_PORT = int(os.getenv("CORE_SERVICE_PORT", 8000))
