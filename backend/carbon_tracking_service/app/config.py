import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = os.getenv("DATABASE_URL")
    openai_api_key: str = os.getenv("OPENAI_API_KEY")
    jwt_secret_key: str = os.getenv("JWT_SECRET_KEY")
    algorithm: str = os.getenv("ALGORITHM", "HS256")

    class Config:
        env_file = ".env"

settings = Settings()
