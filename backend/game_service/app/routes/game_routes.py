from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.utils.token_utils import get_user_from_token
from app.services import ai_service, quiz_service
from app.database import get_db
from app.models.quiz_models import Quiz, User
from typing import List
import json

router = APIRouter()

# Temporary storage for quiz questions
quiz_cache = {}

@router.post("/play")
def play_quiz(token: str, db: Session = Depends(get_db)):
    try:
        user_email = get_user_from_token(token)
    except HTTPException as e:
        raise e

    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    # Generate quiz questions with IDs
    quiz_data = ai_service.generate_quiz_with_ids()
    
    # Store quiz data in temporary storage
    quiz_cache[user.id] = quiz_data['full_quiz']
    
    return {
        "user_id": user.id,
        "questions": quiz_data['user_quiz']['questions']
    }

@router.post("/results")
def see_results(
    user_answers: List[str],
    token: str,
    db: Session = Depends(get_db)
):
    try:
        user_email = get_user_from_token(token)
    except HTTPException as e:
        raise e

    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    # Retrieve quiz data from temporary storage
    quiz_data = quiz_cache.get(user.id)
    if not quiz_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quiz not found")
    
    # Calculate results
    results = quiz_service.calculate_results(quiz_data, user_answers)
    
    # Get analysis from AI
    analysis = ai_service.get_result_analysis(results)
    
    # Combine results and analysis
    full_results = {**results, **analysis}
    
    # Store quiz results in the database
    db_quiz = Quiz(
        user_id=user.id,
        username=user.username,
        score=full_results['score'],
        correct_answers=full_results['correct_answers'],
        wrong_answers=full_results['wrong_answers'],
        questions=json.dumps(quiz_data),
        answers=json.dumps(user_answers)
    )
    db.add(db_quiz)
    db.commit()
    db.refresh(db_quiz)
    
    # Remove quiz data from temporary storage
    quiz_cache.pop(user.id, None)
    
    return {
        "quiz_id": db_quiz.id,
        "results": full_results
    }
