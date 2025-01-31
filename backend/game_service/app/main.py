from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.routes import game_routes
from app.database import engine, Base
from app.services import ai_service

# Create the database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="EcoTrack Game Service")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the game routes
app.include_router(game_routes.router, prefix="/game", tags=["game"])

@app.post("/chat-sustainability")
async def chat_sustainability(prompt: str):
    try:
        response = ai_service.chat_with_sustainability_consultant(prompt)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error communicating with AI service: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003)
