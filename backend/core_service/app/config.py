import os

# Service URLs
USER_SERVICE_URL = os.getenv("USER_SERVICE_URL", "http://localhost:8001")
GAME_SERVICE_URL = os.getenv("GAME_SERVICE_URL", "http://localhost:8003")
CARBON_TRACKING_SERVICE_URL = os.getenv("CARBON_TRACKING_SERVICE_URL", "http://localhost:8004")

# API Key for third-party services (if applicable)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

# JWT Configurations
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "secret")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
