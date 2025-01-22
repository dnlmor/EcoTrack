import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.models import User, CarbonRecord
from app.database import SessionLocal
from app.services.carbon_service import calculate_carbon_footprint

# Dependency override to get a test database session
@pytest.fixture
def client():
    # Create a TestClient
    client = TestClient(app)
    yield client

@pytest.fixture
def create_user():
    db = SessionLocal()
    user = User(email="testuser@example.com", hashed_password="hashedpassword")
    db.add(user)
    db.commit()
    db.refresh(user)
    db.close()
    return user

def test_carbon_footprint_post(client, create_user):
    # Simulate login to get JWT token
    login_data = {"username": "testuser@example.com", "password": "password"}
    response = client.post("/auth/login", json=login_data)
    token = response.json().get("access_token")
    
    # Sample request to the carbon tracking route
    data = {
        "energy_usage": 500,
        "travel_usage": 200,
        "diet_usage": 100,
        "waste_usage": 50,
    }
    
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post("/carbon/track", json=data, headers=headers)
    
    assert response.status_code == 200
    assert "carbon_footprint" in response.json()

def test_carbon_record_creation(create_user):
    db = SessionLocal()
    user = create_user
    # Simulate storing carbon footprint data
    details = '{"energy_usage": 500, "travel_usage": 200}'
    carbon_footprint = 123.45
    new_record = CarbonRecord(user_id=user.id, details=details, carbon_footprint=carbon_footprint)
    
    db.add(new_record)
    db.commit()
    
    record = db.query(CarbonRecord).filter(CarbonRecord.user_id == user.id).first()
    assert record is not None
    assert record.carbon_footprint == 123.45
