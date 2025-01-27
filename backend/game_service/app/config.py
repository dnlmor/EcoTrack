import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = os.getenv("DATABASE_URL")
    openai_api_key: str = os.getenv("OPENAI_API_KEY")
    jwt_secret_key: str = os.getenv("JWT_SECRET_KEY")
    algorithm: str = os.getenv("ALGORITHM", "HS256")
    access_token_expire_minutes: int = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60)

    class Config:
        env_file = ".env"

settings = Settings()
