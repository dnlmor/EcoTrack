from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.utils.token_utils import get_user_from_token
from app.database import get_db
from app.models import CarbonRecord, User  # Assuming there's a User model to fetch user_id
from app.services.ai_service import generate_tailored_carbon_footprint_questions, generate_critique_and_tips
from app.services.carbon_service import calculate_carbon_footprint

router = APIRouter()

@router.post("/carbon-footprint/start")
def start_carbon_footprint_assessment(token: str, db: Session = Depends(get_db)):
    """
    Generate tailored questions grouped into categories for better user input organization.
    """
    try:
        # Validate token and retrieve the user_email
        user_email = get_user_from_token(token)
        
        # Check if user exists in the database
        user = db.query(User).filter(User.email == user_email).first()
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found. Please ensure your token is valid."
            )
        
        # Generate the tailored set of questions for carbon footprint assessment
        questions = generate_tailored_carbon_footprint_questions()
        
        return {"questions": questions}
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating questions: {str(e)}"
        )


@router.post("/carbon-footprint/submit")
def submit_carbon_footprint(
    token: str,
    user_input: dict,
    db: Session = Depends(get_db)
):
    """
    Submit the user's responses, calculate their carbon footprint, and provide critique/tips.
    """
    try:
        # Validate token and retrieve the user_email
        user_email = get_user_from_token(token)
        
        # Fetch user_id (integer) from users table based on email
        user = db.query(User).filter(User.email == user_email).first()
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found. Please ensure your token is valid."
            )
        
        # Extract user_id from the User object
        user_id = user.id

        # Validate user_input
        if not user_input or not isinstance(user_input, dict):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid input. Please provide data in the correct structure."
            )

        # Calculate the carbon footprint based on user input
        carbon_footprint = calculate_carbon_footprint(user_input)

        # Save the carbon footprint record to the database
        record = CarbonRecord(user_id=user_id, details=str(user_input), carbon_footprint=carbon_footprint)
        db.add(record)
        db.commit()

        # Generate critique and sustainability tips based on the calculated carbon footprint
        critique_and_tips = generate_critique_and_tips(carbon_footprint)

        return {
            "carbon_footprint": carbon_footprint,
            "critique_and_tips": critique_and_tips
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error during submission or critique generation: {str(e)}"
        )
