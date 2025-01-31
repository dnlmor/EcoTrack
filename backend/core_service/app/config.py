from pydantic_settings import BaseSettings
from typing import List
import json

class Settings(BaseSettings):
    api_gateway_port: int
    auth_service_url: str
    carbon_service_url: str
    game_service_url: str
    jwt_secret_key: str
    cors_origins: List[str]
    env: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if isinstance(self.cors_origins, str):
            self.cors_origins = json.loads(self.cors_origins)

settings = Settings()