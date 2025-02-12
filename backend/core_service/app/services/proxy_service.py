import requests
from fastapi import HTTPException
from app.config import USER_SERVICE_URL, GAME_SERVICE_URL, CARBON_TRACKING_SERVICE_URL

class ProxyService:
    @staticmethod
    def proxy_to_user_service(endpoint: str, method: str, data: dict = None):
        url = f"{USER_SERVICE_URL}/{endpoint}"
        try:
            if method == "GET":
                response = requests.get(url, params=data)
            elif method == "POST":
                response = requests.post(url, json=data)
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=response.json())
            return response.json()
        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=500, detail=f"Error contacting user service: {str(e)}")
    
    @staticmethod
    def proxy_to_game_service(endpoint: str, method: str, data: dict = None):
        url = f"{GAME_SERVICE_URL}/{endpoint}"
        try:
            if method == "GET":
                response = requests.get(url, params=data)
            elif method == "POST":
                response = requests.post(url, json=data)
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=response.json())
            return response.json()
        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=500, detail=f"Error contacting game service: {str(e)}")
    
    @staticmethod
    def proxy_to_carbon_tracking_service(endpoint: str, method: str, data: dict = None):
        url = f"{CARBON_TRACKING_SERVICE_URL}/{endpoint}"
        try:
            if method == "GET":
                response = requests.get(url, params=data)
            elif method == "POST":
                response = requests.post(url, json=data)
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=response.json())
            return response.json()
        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=500, detail=f"Error contacting carbon tracking service: {str(e)}")
