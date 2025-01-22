import os
from openai import OpenAI
from app.config import settings

# Initialize the OpenAI client
client = OpenAI(api_key=settings.openai_api_key)


def chat_with_sustainability_consultant(prompt: str) -> str:
    """
    Interact with the ChatGPT model to simulate a sustainability consultant.
    """
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a professional sustainability consultant."},
                {"role": "user", "content": prompt}
            ],
            model="gpt-4o",
        )
        # Extract response content properly
        if chat_completion.choices and len(chat_completion.choices) > 0:
            return chat_completion.choices[0].message.content.strip()
        else:
            raise Exception("No choices found in the response.")
    except Exception as e:
        raise Exception(f"Error communicating with OpenAI API: {str(e)}")


def generate_tailored_carbon_footprint_questions() -> list:
    """
    Generate detailed, tailored carbon footprint questions for the user.
    Returns questions grouped by categories for better structure.
    """
    prompt = """
    Generate specific and concise questions for assessing the user's carbon footprint.
    Group the questions under these categories: Home Energy, Travel, Diet, Waste, and Additional Information.
    Each question should be on a new line. Do not add additional descriptions or explanations.
    """
    response = chat_with_sustainability_consultant(prompt)

    # Split the response into structured categories
    questions = {
        "home_energy": [],
        "travel": [],
        "diet": [],
        "waste": [],
        "additional_information": [],
    }
    category_map = {
        "home_energy": "Home Energy",
        "travel": "Travel",
        "diet": "Diet",
        "waste": "Waste",
        "additional_information": "Additional Information",
    }

    current_category = None  # Track the current category

    for line in response.splitlines():
        for category, header in category_map.items():
            if line.startswith(header):
                current_category = category
            elif line.strip() and current_category:
                # Avoid duplicates in each category
                if line.strip() not in questions[current_category]:
                    questions[current_category].append(line.strip())

    return questions


def generate_critique_and_tips(carbon_footprint: float) -> str:
    """
    Provide professional critique and sustainability tips based on the calculated footprint.
    """
    prompt = f"""
    A user has a carbon footprint of {carbon_footprint:.2f} kg CO2. As a professional sustainability consultant:
    1. Critique the result, explaining which areas contribute the most.
    2. Provide actionable tips for reducing emissions, addressing each key area: Home Energy, Travel, Diet, Waste, and Lifestyle.
    Be concise and clear in your response.
    """
    return chat_with_sustainability_consultant(prompt)
