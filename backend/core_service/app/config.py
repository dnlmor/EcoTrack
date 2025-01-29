from pydantic_settings import BaseSettings
from typing import Dict

class Settings(BaseSettings):
    SERVICE_URLS: Dict[str, str] = {
        "auth": "http://localhost:8001",
        "carbon": "http://localhost:8002",
        "game": "http://localhost:8003"
    }

    SERVICE_COMMANDS: Dict[str, str] = {
        "auth": "uvicorn auth_service.main:app --host 0.0.0.0 --port 8001 --reload",
        "carbon": "uvicorn carbon_tracking_service.main:app --host 0.0.0.0 --port 8002 --reload",
        "game": "uvicorn game_service.main:app --host 0.0.0.0 --port 8003 --reload"
    }

    # JWT settings
    JWT_SECRET_KEY: str = "secret"
    ALGORITHM: str = "HS256"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
