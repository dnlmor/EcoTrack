from openai import OpenAI
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from app.models.quiz_models import Quiz, User
from app.config import settings
import json
import random
from pathlib import Path
from typing import List, Dict, Any

client = OpenAI(api_key=settings.openai_api_key)

class QuizService:
    def __init__(self):
        self.questions = self._load_questions()
    
    def _load_questions(self) -> List[Dict[str, Any]]:
        """Load questions from data.json"""
        json_path = Path(__file__).parent.parent / "data" / "data.json"
        with open(json_path, 'r') as f:
            data = json.load(f)
        return data["quiz_questions"]

    def get_random_questions(self, count: int = 12) -> Dict[str, Any]:
        """Get random questions from the pool"""
        selected_questions = random.sample(self.questions, count)
        
        # Create user version (without correct answers)
        user_questions = [{
            "id": q["id"],
            "category": q["category"],
            "question": q["question"],
            "options": q["options"],
            "difficulty": q["difficulty"]
        } for q in selected_questions]
        
        return {
            "full_questions": selected_questions,
            "user_questions": user_questions
        }

    def calculate_results(self, questions: List[Dict], user_answers: List[str]) -> Dict[str, Any]:
        """Calculate quiz results"""
        total_questions = len(questions)
        correct = 0
        results = []
        
        for q, answer in zip(questions, user_answers):
            is_correct = answer == q["correct_answer"]
            if is_correct:
                correct += 1
            
            results.append({
                "question": q["question"],
                "user_answer": answer,
                "correct_answer": q["correct_answer"],
                "is_correct": is_correct,
                "category": q["category"]
            })
        
        return {
            "total_questions": total_questions,
            "correct_answers": correct,
            "wrong_answers": total_questions - correct,
            "score": round((correct / total_questions) * 100, 2),
            "question_results": results
        }

    def get_result_analysis(self, results: Dict[str, Any]) -> Dict[str, Any]:
        """Get AI analysis of quiz results"""
        # Create category performance breakdown
        category_performance = {}
        for result in results["question_results"]:
            category = result["category"]
            if category not in category_performance:
                category_performance[category] = {"correct": 0, "total": 0}
            category_performance[category]["total"] += 1
            if result["is_correct"]:
                category_performance[category]["correct"] += 1

        analysis_prompt = f"""
        Analyze these sustainability quiz results:
        Overall Score: {results['score']}%
        Correct Answers: {results['correct_answers']}/{results['total_questions']}
        
        Category Performance:
        {json.dumps(category_performance, indent=2)}
        
        Provide a constructive analysis in JSON format with these fields:
        1. overall_assessment: Brief evaluation of performance
        2. strengths: List of categories where the user performed well
        3. improvement_areas: List of categories needing work
        4. learning_resources: Specific topics to study further
        5. encouragement: A motivational message focused on sustainability learning
        """
        
        try:
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a sustainability education expert providing constructive quiz feedback."},
                    {"role": "user", "content": analysis_prompt}
                ]
            )
            
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            return {
                "overall_assessment": "Analysis unavailable",
                "strengths": [],
                "improvement_areas": [],
                "learning_resources": ["General sustainability resources"],
                "encouragement": "Keep learning about sustainability!"
            }
    
    def get_top_5_users(self, db: Session) -> List[Dict[str, Any]]:
        """Get the top 5 users based on their highest scores"""
        try:
            top_users = (
                db.query(
                    Quiz.user_id,
                    func.max(Quiz.score).label("max_score")  # Get the highest score for each user
                )
                .group_by(Quiz.user_id)
                .order_by(func.max(Quiz.score).desc())  # Order by score descending
                .limit(5)  # Limit to top 5 users
                .all()
            )

            # Format the result into the required structure
            leaderboard = [{
                "user_id": user_id,
                "username": db.query(User.username).filter(User.id == user_id).first().username,
                "total_score": max_score
            } for user_id, max_score in top_users]
            
            return leaderboard
        except Exception as e:
            return {"error": str(e)}