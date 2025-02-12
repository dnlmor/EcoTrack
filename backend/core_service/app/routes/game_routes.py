from fastapi import APIRouter, Depends, HTTPException
from typing import List
import requests
from app.dependencies import get_current_user
from app.utils.token_utils import decode_token
from app.config import GAME_SERVICE_URL

router = APIRouter()

# Route to start a quiz
@router.get("/quiz/start")
async def start_quiz(token: str = Depends(get_current_user)):
    user = decode_token(token)
    
    # Proxy the request to game_service
    try:
        response = requests.get(f"{GAME_SERVICE_URL}/quiz/start", params={"token": token})
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())
        
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error contacting game service: {str(e)}")

# Route to submit quiz answers
@router.post("/quiz/submit")
async def submit_quiz_answers(user_answers: List[str], token: str = Depends(get_current_user)):
    user = decode_token(token)
    
    # Proxy the request to game_service
    try:
        response = requests.post(
            f"{GAME_SERVICE_URL}/quiz/submit", 
            json={"user_answers": user_answers, "token": token}
        )
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())
        
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error contacting game service: {str(e)}")

# Route to get the leaderboard
@router.get("/quiz/results")
async def get_quiz_results(token: str = Depends(get_current_user)):
    user = decode_token(token)
    
    # Proxy the request to game_service
    try:
        response = requests.get(f"{GAME_SERVICE_URL}/quiz/results", params={"token": token})
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())
        
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error contacting game service: {str(e)}")
