import os
import sys
from fastapi.testclient import TestClient
from app.main import app
from app.models import User  # Import User model to query the database
from app.config import get_db  # Import the get_db function

# Add the root directory to sys.path to ensure imports work
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))  # Ensure correct path

client = TestClient(app)

def test_register_user():
    # Get the db session using get_db function
    db = next(get_db())  # Use get_db to get the session

    # Clear any existing user with the same email or username
    existing_user = db.query(User).filter((User.email == "test@example.com") | (User.username == "testuser")).first()
    if existing_user:
        db.delete(existing_user)
        db.commit()

    # Now run the registration test
    response = client.post("/auth/register", json={
        "username": "testuser",
        "email": "test@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert response.json()["username"] == "testuser"

def test_login_user():
    client.post("/auth/register", json={
        "username": "testuser2",
        "email": "test2@example.com",
        "password": "password123"
    })
    response = client.post("/auth/login", json={
        "email": "test2@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
