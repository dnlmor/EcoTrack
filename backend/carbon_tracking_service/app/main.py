from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.routes import carbon_routes
from app.database import Base, engine
from app.services.ai_service import chat_with_sustainability_consultant

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Set up CORS
origins = [
    "http://localhost",
    "http://localhost:8002",
     "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the Carbon Tracking routes
app.include_router(carbon_routes.router, prefix="/api/v1/carbon", tags=["Carbon Tracking"])

@app.post("/test/openai", tags=["Testing"])
def test_openai(prompt: str):
    """
    Test the OpenAI API by providing a custom prompt.
    """
    try:
        response = chat_with_sustainability_consultant(prompt)
        return {"status": "success", "response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error communicating with OpenAI API: {str(e)}")

