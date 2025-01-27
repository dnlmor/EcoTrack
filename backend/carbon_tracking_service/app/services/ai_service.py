from app.config import settings
from openai import OpenAI
from openai import APIError, APIConnectionError, RateLimitError, InvalidRequestError
from app.services.carbon_service import calculate_carbon_footprint
from app.utils.input_mapper import map_user_answers_to_structure

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
    except APIError as e:
        raise Exception(f"OpenAI API returned an API Error: {str(e)}")
    except APIConnectionError as e:
        raise Exception(f"Failed to connect to OpenAI API: {str(e)}")
    except RateLimitError as e:
        raise Exception(f"OpenAI API request exceeded rate limit: {str(e)}")
    except InvalidRequestError as e:
        raise Exception(f"Invalid request to OpenAI API: {str(e)}")
    except Exception as e:
        raise Exception(f"Error communicating with OpenAI API: {str(e)}")

def generate_tailored_carbon_footprint_questions() -> list:
    """
    Generate specific and concise questions for assessing the user's carbon footprint.
    """
    prompt = """
    Create tailored questions to gather information about a user's carbon footprint. 
    Group questions into categories: Home Energy, Transportation, Diet, and Waste. Ensure conciseness and clarity.
    Include sub-categories where relevant, and use a clear format for the questions.
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
    # Map user-friendly answers to structured format
    structured_input = map_user_answers_to_structure(user_answers)

    # Calculate emissions using the structured input
    emissions = calculate_carbon_footprint(structured_input)

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
