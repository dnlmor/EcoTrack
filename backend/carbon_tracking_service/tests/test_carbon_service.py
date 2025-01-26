import pytest
from app.services.carbon_service import calculate_carbon_footprint

# Example data for testing
@pytest.fixture
def sample_data():
    return {
        "energy_usage": 500,
        "travel_usage": 200,
        "diet_usage": 100,
        "waste_usage": 50,
    }

def test_calculate_carbon_footprint(sample_data):
    result = calculate_carbon_footprint(sample_data)
    assert isinstance(result, float)
    assert result > 0  # Assuming carbon footprint is always a positive value

def test_calculate_carbon_footprint_no_data():
    result = calculate_carbon_footprint({})
    assert result == 0  # No data should return 0 carbon footprint

def test_calculate_carbon_footprint_edge_case():
    result = calculate_carbon_footprint({"energy_usage": 0, "travel_usage": 0, "diet_usage": 0, "waste_usage": 0})
    assert result == 0  # No usage data should return 0 carbon footprint
