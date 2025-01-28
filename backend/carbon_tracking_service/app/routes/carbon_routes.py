import json
from pathlib import Path
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.token_utils import get_user_from_token
from app.database import get_db
from app.models import CarbonRecord, User
from app.services.ai_service import SustainabilityAI

router = APIRouter()
sustainability_ai = SustainabilityAI()

def load_questions():
    """Load questions from JSON file."""
    json_path = Path(__file__).parent.parent / "data" / "data.json"
    try:
        with open(json_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        raise Exception(f"Error loading questions: {str(e)}")

@router.get("/carbon-footprint/questions")
def get_carbon_footprint_questions(token: str, db: Session = Depends(get_db)):
    """Return the pre-defined carbon footprint assessment questions."""
    try:
        user_email = get_user_from_token(token)
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        questions = load_questions()
        return {"questions": questions["categories"]}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving questions: {str(e)}"
        )

@router.post("/carbon-footprint/submit")
def submit_carbon_footprint(token: str, user_answers: dict, db: Session = Depends(get_db)):
    """Process user's answers and return carbon footprint analysis."""
    try:
        user_email = get_user_from_token(token)
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Process data using AI service
        result = sustainability_ai.process_user_data(user_answers)

        # Save record
        record = CarbonRecord(
            user_id=user.id,
            details=json.dumps(user_answers),
            carbon_footprint=result["emissions"]["total"]
        )
        db.add(record)
        db.commit()

        return result
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing submission: {str(e)}"
        )