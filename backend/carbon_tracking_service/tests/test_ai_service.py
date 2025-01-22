import pytest
from unittest.mock import patch
from app.services.ai_service import get_sustainability_advice

@pytest.fixture
def sample_user_data():
    return {
        "energy_usage": 500,
        "travel_usage": 200,
        "diet_usage": 100,
        "waste_usage": 50,
    }

@patch("app.services.ai_service.openai.Completion.create")
def test_get_sustainability_advice(mock_openai, sample_user_data):
    # Mock the OpenAI response
    mock_openai.return_value = {
        "choices": [{"text": "To reduce your carbon footprint, consider using less energy and more public transport."}]
    }
    
    advice = get_sustainability_advice(sample_user_data)
    
    # Check that the AI returned the expected advice
    assert advice == "To reduce your carbon footprint, consider using less energy and more public transport."

@patch("app.services.ai_service.openai.Completion.create")
def test_get_sustainability_advice_edge_case(mock_openai):
    # Mock the OpenAI response
    mock_openai.return_value = {
        "choices": [{"text": "You're doing great! Keep it up!"}]
    }
    
    advice = get_sustainability_advice({})
    
    # Edge case, no data should result in general advice
    assert advice == "You're doing great! Keep it up!"
