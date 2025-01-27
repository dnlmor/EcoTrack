from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import DATABASE_URL

# Create SQLAlchemy engine using the DATABASE_URL from config
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})  # SQLite doesn't require this argument, but for PostgreSQL we do

# SessionLocal will be used for creating database session instances
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all our database models
Base = declarative_base()

# Dependency for obtaining a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
