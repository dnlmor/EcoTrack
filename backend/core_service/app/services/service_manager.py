import requests
from fastapi import HTTPException
from app.config import USER_SERVICE_URL, GAME_SERVICE_URL, CARBON_TRACKING_SERVICE_URL

class ServiceManager:
    @staticmethod
    def check_service_health(service_url: str):
        try:
            response = requests.get(f"{service_url}/health")
            if response.status_code != 200:
                raise HTTPException(status_code=500, detail="Service is down")
            return {"status": "healthy"}
        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=500, detail=f"Error checking service health: {str(e)}")
