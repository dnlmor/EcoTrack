import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# Load from .env file
load_dotenv()

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in .env file")

# JWT Secret Key and Algorithm
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not JWT_SECRET_KEY:
    raise ValueError("JWT_SECRET_KEY is not set in .env file")

ALGORITHM = os.getenv("ALGORITHM", "HS256")  # Default to HS256 if not set in .env

# SQLAlchemy Engine and Session
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base Class for Models
Base = declarative_base()

# Dependency to Get Database Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
