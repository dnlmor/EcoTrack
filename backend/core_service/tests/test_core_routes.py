from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_service_discovery():
    response = client.get("/discover/auth_service")
    assert response.status_code == 200
    assert "service_url" in response.json()

    response = client.get("/discover/non_existent_service")
    assert response.status_code == 404
    assert "error" in response.json()
