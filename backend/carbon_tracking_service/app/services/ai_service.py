from app.config import settings
from openai import OpenAI
from app.services.carbon_service import calculate_carbon_footprint

# Initialize the OpenAI client
client = OpenAI(api_key=settings.openai_api_key)


def chat_with_sustainability_consultant(prompt: str) -> str:
    """
    Interact with the AI model to simulate a professional sustainability consultant.
    """
    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a professional sustainability consultant."},
                {"role": "user", "content": prompt},
            ],
            model="gpt-4",
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise Exception(f"Error communicating with OpenAI API: {str(e)}")


def generate_tailored_carbon_footprint_questions() -> list:
    """
    Generate specific and concise questions for assessing the user's carbon footprint.
    """
    prompt = """
    Create tailored questions to gather information about a user's carbon footprint. 
    Group questions into categories: Home Energy, Transportation, Diet, and Waste. Ensure conciseness and clarity.
    """
    response = chat_with_sustainability_consultant(prompt)
    return response.split("\n")  # Return questions as a list of strings


def process_user_answers_and_generate_result(user_answers: dict) -> dict:
    """
    Process the user's answers, calculate their carbon footprint, and return the results.

    Args:
        user_answers (dict): User-provided answers to carbon footprint questions.

    Returns:
        dict: A dictionary containing the carbon footprint breakdown and total.
    """
    emissions = calculate_carbon_footprint(user_answers)
    if emissions.get("total", 0) < 0:
        raise ValueError("Invalid carbon footprint calculation. Total emissions cannot be negative.")
    return emissions


def generate_critique_and_tips(carbon_footprint: float) -> dict:
    """
    Provide concise critique and actionable tips based on the user's carbon footprint.
    """
    critique = (
        "Your carbon footprint is below average. Great job!" if carbon_footprint < 1000
        else "Your carbon footprint is above average. Focus on reducing high-impact areas."
    )
    tips = {
        "home_energy": "Use energy-efficient appliances and consider renewable energy.",
        "transportation": "Carpool, use public transport, or switch to electric vehicles.",
        "diet": "Reduce meat consumption and embrace plant-based meals.",
        "waste": "Recycle more and reduce single-use plastics."
    }
    return {"critique": critique, "tips": tips}
