from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_user():
    response = client.get("/api/auth/user", headers={"Authorization": "Bearer test-token"})
    assert response.status_code == 200
    assert "user" in response.json()

def test_get_carbon_data():
    response = client.get("/api/carbon", headers={"Authorization": "Bearer test-token"})
    assert response.status_code == 200
    assert "carbon_data" in response.json()

def test_get_game_data():
    response = client.get("/api/game", headers={"Authorization": "Bearer test-token"})
    assert response.status_code == 200
    assert "game_data" in response.json()

def test_get_profile():
    response = client.get("/api/profile", headers={"Authorization": "Bearer test-token"})
    assert response.status_code == 200
    assert "profile" in response.json()
