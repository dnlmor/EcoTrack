from fastapi import FastAPI
from app.routes.core_routes import router as core_router

app = FastAPI()

app.include_router(core_router)
