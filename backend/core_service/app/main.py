from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from app.middleware.auth_middleware import auth_middleware
from app.services.proxy_service import proxy_service
from app.services.service_manager import service_manager
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI(title="Core Service API Gateway")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Authorization"],
)

@app.middleware("http")
async def debug_middleware(request: Request, call_next):
    logger.debug(f"Request path: {request.url.path}")
    logger.debug(f"Request method: {request.method}")
    logger.debug(f"Request headers: {request.headers}")
    
    response = await call_next(request)
    
    logger.debug(f"Response status: {response.status_code}")
    logger.debug(f"Response headers: {response.headers}")
    return response

app.middleware("http")(auth_middleware)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.api_route("/auth/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
async def auth_routes(request: Request, path: str):
    logger.debug(f"Handling auth route: {path}")
    try:
        response = await proxy_service.forward_request(
            request=request,
            service="auth",
            path=f"/{path}",
            strip_path="/auth"
        )
        return response
    except Exception as e:
        logger.error(f"Error in auth_routes: {str(e)}", exc_info=True)
        return Response(
            content=str(e).encode(),
            status_code=500,
            headers={
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true"
            }
        )

@app.api_route("/api/v1/carbon/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
async def carbon_routes(request: Request, path: str):
    return await proxy_service.forward_request(
        request=request,
        service="carbon",
        path=f"/{path}",
        strip_path="/api/v1/carbon"
    )

@app.api_route("/game/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
async def game_routes(request: Request, path: str):
    return await proxy_service.forward_request(
        request=request,
        service="game",
        path=f"/{path}",
        strip_path="/game"
    )

if __name__ == "__main__":
    import uvicorn
    try:
        # Start all backend services
        service_manager.start_all_services()
        # Run the core service (API Gateway)
        uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
    except KeyboardInterrupt:
        print("Shutting down all services...")
        service_manager.stop_all_services()