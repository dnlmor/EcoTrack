from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth_routes, carbon_routes, game_routes
from .config import settings
from .middleware.auth_middleware import AuthMiddleware

app = FastAPI(title="EcoTrack API Gateway")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add auth middleware
app.add_middleware(AuthMiddleware)

# Include routers with their respective prefixes
app.include_router(auth_routes.router, prefix="/auth")
app.include_router(carbon_routes.router, prefix="/carbon")
app.include_router(game_routes.router, prefix="/game")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)