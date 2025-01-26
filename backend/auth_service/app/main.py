from fastapi import FastAPI
from app.routes.auth_routes import router as auth_router
from app.config import Base, engine

# Initialize Database Tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI Application
app = FastAPI(
    title="Authentication Service",
    description="A microservice for user authentication using FastAPI and JWT.",
    version="1.0.0",
)

# Include Routes
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
