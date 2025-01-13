import os
import sys
from fastapi.testclient import TestClient
from app.main import app
from app.models import User
from app.config import get_db
from app.utils.token_utils import JWT_SECRET_KEY, ALGORITHM, blacklisted_tokens
import jwt

# Add the root directory to sys.path to ensure imports work
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

client = TestClient(app)

def test_register_user():
    db = next(get_db())

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

def test_logout_user():
    # Register and login to get a token
    client.post("/auth/register", json={
        "username": "logouttestuser",
        "email": "logouttest@example.com",
        "password": "password123"
    })
    login_response = client.post("/auth/login", json={
        "email": "logouttest@example.com",
        "password": "password123"
    })
    token = login_response.json()["access_token"]

    # Logout
    response = client.post("/auth/logout", json={"token": token})
    assert response.status_code == 200
    assert response.json()["detail"] == "Logout successful"

    # Verify the token is invalid after logout
    decoded_token = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM], options={"verify_exp": False})
    assert token in blacklisted_tokens
