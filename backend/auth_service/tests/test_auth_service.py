import os
import sys
import pytest
from app.services.auth_service import hash_password, verify_password, generate_user_token
from jose import jwt
from app.config import JWT_SECRET_KEY, ALGORITHM

# Add the root directory to sys.path to ensure imports work
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))  # Ensure correct path

# Fixture for user data (used for generating JWT token)
@pytest.fixture
def user_data():
    return {"sub": "test@example.com"}

# Test the password hashing and verification process
def test_hash_and_verify_password():
    password = "securepassword123"
    hashed = hash_password(password)
    assert verify_password(password, hashed) is True
    assert verify_password("wrongpassword", hashed) is False

# Test that the user token is generated correctly and the payload is decoded correctly
def test_generate_user_token(user_data):
    # Generate the token with the user data
    token = generate_user_token(user_data)

    # Decode the token using the JWT_SECRET_KEY
    decoded_token = jwt.decode(token["access_token"], JWT_SECRET_KEY, algorithms=[ALGORITHM])

    # Assert the 'sub' (email) field in the decoded token matches the user data
    assert decoded_token["sub"] == user_data["sub"]
