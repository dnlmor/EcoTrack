from fastapi import APIRouter, Depends, HTTPException
import requests
from app.dependencies import get_current_user
from app.utils.token_utils import decode_token
from app.config import CARBON_TRACKING_SERVICE_URL

router = APIRouter()

# Route to get carbon footprint data for a user
@router.get("/carbon/footprint")
async def get_carbon_footprint(token: str = Depends(get_current_user)):
    user = decode_token(token)
    
    try:
        response = requests.get(f"{CARBON_TRACKING_SERVICE_URL}/carbon/footprint", params={"user_id": user["id"]})
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error contacting carbon tracking service: {str(e)}")

# Route to log carbon offset actions
@router.post("/carbon/offset")
async def log_carbon_offset(action_data: dict, token: str = Depends(get_current_user)):
    user = decode_token(token)
    
    try:
        response = requests.post(
            f"{CARBON_TRACKING_SERVICE_URL}/carbon/offset", 
            json={"action_data": action_data, "user_id": user["id"]}
        )
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error contacting carbon tracking service: {str(e)}")
