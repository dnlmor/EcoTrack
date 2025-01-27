from openai import OpenAI
from app.config import settings
import json
import uuid

client = OpenAI(api_key=settings.openai_api_key)

def chat_with_sustainability_consultant(prompt: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a professional sustainability consultant with extensive knowledge in environmental issues, renewable energy, and sustainable practices. Provide expert advice and insights."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content.strip()

def generate_quiz_with_ids() -> dict:
    prompt = """Generate a sustainability quiz with 12 to 15 multiple-choice questions. 
    Each question should have 4 options labeled as a, b, c, d. 
    Format the response as a JSON object with 'questions' as the key and a list of question objects as the value. 
    Each question object should have: 'question', 'options' (an object with keys a, b, c, d and their corresponding option texts as values), and 'correct_answer' (a, b, c, or d)."""

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a professional sustainability consultant creating an educational quiz."},
            {"role": "user", "content": prompt}
        ]
    )
    full_quiz = json.loads(response.choices[0].message.content)
    
    # Add question IDs
    for i, question in enumerate(full_quiz['questions']):
        question['id'] = str(uuid.uuid4())
    
    # Create a version of the quiz without correct answers for the user
    user_quiz = {
        'questions': [{k: v for k, v in q.items() if k != 'correct_answer'} for q in full_quiz['questions']]
    }
    
    quiz_id = str(uuid.uuid4())
    
    return {'quiz_id': quiz_id, 'full_quiz': full_quiz, 'user_quiz': user_quiz}

def get_result_analysis(results: dict) -> dict:
    analysis_prompt = f"""Analyze the following quiz results and provide insights:
    Total Questions: {results['total_questions']}
    Correct Answers: {results['correct_answers']}
    Wrong Answers: {results['wrong_answers']}
    Score: {results['score']}%

    Provide:
    1. An overall assessment of the performance
    2. Key areas of strength
    3. Areas for improvement
    4. Recommendations for further learning

    Format the response as a JSON object with keys: 'overall_assessment', 'strengths', 'improvements', 'recommendations'."""

    analysis_response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a professional sustainability consultant examiner who is analyzing quiz results."},
            {"role": "user", "content": analysis_prompt}
        ]
    )
    
    return json.loads(analysis_response.choices[0].message.content)
