from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, and_
from app.utils.token_utils import get_user_from_token
from app.services.ai_service import QuizService
from app.database import get_db
from app.models.quiz_models import Quiz, User
from typing import List
import json

router = APIRouter()
quiz_service = QuizService()

# Store active quizzes
active_quizzes = {}

# Change POST to GET for starting a quiz
@router.get("/quiz/start")
def start_quiz(token: str, db: Session = Depends(get_db)):
    """Start a new quiz session"""
    try:
        user_email = get_user_from_token(token)
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Get random questions
        quiz_data = quiz_service.get_random_questions()
        
        # Store full questions for later
        active_quizzes[user.id] = quiz_data["full_questions"]
        
        return {
            "user_id": user.id,
            "questions": quiz_data["user_questions"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/quiz/submit")
def submit_quiz(
    user_answers: List[str],
    token: str,
    db: Session = Depends(get_db)
):
    """Submit quiz answers and get results"""
    try:
        user_email = get_user_from_token(token)
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Get stored questions
        questions = active_quizzes.get(user.id)
        if not questions:
            raise HTTPException(status_code=404, detail="No active quiz found")
        
        # Calculate results
        results = quiz_service.calculate_results(questions, user_answers)
        
        # Get AI analysis
        analysis = quiz_service.get_result_analysis(results)
        
        # Combine results
        full_results = {
            "quiz_details": results,
            "analysis": analysis
        }
        
        # Save to database
        db_quiz = Quiz(
            user_id=user.id,
            username=user.username,
            score=results["score"],
            correct_answers=results["correct_answers"],
            wrong_answers=results["wrong_answers"],
            questions=json.dumps(questions),
            answers=json.dumps(user_answers)
        )
        db.add(db_quiz)
        db.commit()
        
        # Clean up
        active_quizzes.pop(user.id, None)
        
        return full_results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/quiz/results")
def get_user_highest_scores(token: str, db: Session = Depends(get_db)):
    """Get the top 5 highest quiz scores"""
    try:
        user_email = get_user_from_token(token)
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Get top 5 users based on their highest scores using QuizService
        leaderboard = quiz_service.get_top_5_users(db)

        return leaderboard
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))