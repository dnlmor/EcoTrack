from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth_routes import router
from app.config import Base, engine

# Initialize Database Tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI Application
app = FastAPI(
    title="Authentication Service",
    description="A microservice for user authentication using FastAPI and JWT.",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(router, prefix="/auth", tags=["Authentication"])
