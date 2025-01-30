from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.utils.token_utils import get_user_from_token
from app.database import get_db
from app.models import CarbonRecord, User
from app.services.ai_service import (
    generate_tailored_carbon_footprint_questions,
    process_user_answers_and_generate_result,
    generate_critique_and_tips,
)
router = APIRouter()
@router.post("/carbon-footprint/start")
def start_carbon_footprint_assessment(token: str, db: Session = Depends(get_db)):
    """
    Generate tailored questions for the user's carbon footprint assessment.
    """
    try:
        user_email = get_user_from_token(token)
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found.")
        questions = generate_tailored_carbon_footprint_questions()
        return {"questions": questions}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating questions: {str(e)}"
        )
@router.post("/carbon-footprint/submit")
def submit_carbon_footprint(token: str, user_answers: dict, db: Session = Depends(get_db)):
    """
    Submit the user's responses, calculate their carbon footprint, and provide critique/tips.
    """
    try:
        user_email = get_user_from_token(token)
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found.")
        if not user_answers or not isinstance(user_answers, dict):
            raise HTTPException(status_code=400, detail="Invalid user answers.")
        emissions = process_user_answers_and_generate_result(user_answers)
        record = CarbonRecord(user_id=user.id, details=str(user_answers), carbon_footprint=emissions["total"])
        db.add(record)
        db.commit()
        critique_and_tips = generate_critique_and_tips(emissions["total"])
        return {"carbon_footprint": emissions, "critique_and_tips": critique_and_tips}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing submission: {str(e)}"
        )
        
@router.get("/carbon-footprint/results")
def get_carbon_footprint_results(token: str, db: Session = Depends(get_db)):
    """Fetch the carbon footprint results for the authenticated user."""
    try:
        # Extract the user email from the token
        user_email = get_user_from_token(token)
        
        # Fetch the user from the database using email
        user = db.query(User).filter(User.email == user_email).first()
        
        # Handle case when user is not found
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Call the AI service function to get results
        return get_carbon_footprint_results(user.id, db)
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving results: {str(e)}"
        )