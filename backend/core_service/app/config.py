from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    AUTH_SERVICE_URL: str = "http://localhost:8001"
    CARBON_SERVICE_URL: str = "http://localhost:8002"
    GAME_SERVICE_URL: str = "http://localhost:8003"
    
    # JWT settings
    JWT_SECRET_KEY: str = "secret"
    ALGORITHM: str = "HS256"
    
    class Config:
        env_file = ".env"

settings = Settings()