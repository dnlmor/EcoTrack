from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .middleware.auth_middleware import auth_middleware
from .services.proxy_service import proxy_service

app = FastAPI(title="Core Service API Gateway")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add authentication middleware
app.middleware("http")(auth_middleware)

# Route handlers for each service
@app.api_route("/auth/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def auth_routes(request: Request, path: str):
    return await proxy_service.forward_request(
        request=request,
        service="auth",
        path=f"/{path}",
        strip_path="/auth"
    )

@app.api_route("/api/v1/carbon/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def carbon_routes(request: Request, path: str):
    return await proxy_service.forward_request(
        request=request,
        service="carbon",
        path=f"/{path}",
        strip_path="/api/v1/carbon"
    )

@app.api_route("/game/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def game_routes(request: Request, path: str):
    return await proxy_service.forward_request(
        request=request,
        service="game",
        path=f"/{path}",
        strip_path="/game"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)