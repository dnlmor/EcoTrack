# File Structure

    /auth_service/
    ├── app/                                  # Core application logic
    │   ├── __init__.py                       # Package initialization
    │   ├── main.py                           # Entry point for FastAPI app
    │   ├── models.py                         # Database models (SQLAlchemy)
    │   ├── schemas.py                        # Pydantic models for validation
    │   ├── routes/                           # API endpoints
    │   │   ├── __init__.py                   # Package initialization
    │   │   ├── auth_routes.py                # Authentication-specific endpoints
    │   ├── services/                         # Business logic
    │   │   ├── __init__.py                   # Package initialization
    │   │   ├── auth_service.py               # Authentication service (login, registration)
    │   ├── utils/                            # Utility functions
    │   │   ├── __init__.py                   # Package initialization
    │   │   ├── token_utils.py                # JWT handling and validation
    │   └── config.py                         # Configuration settings (database, secrets, etc.)
    ├── tests/                                # Unit and integration tests
    │   ├── __init__.py                       # Package initialization
    │   ├── test_auth_routes.py               # Tests for auth routes
    │   └── test_auth_service.py              # Tests for auth service logic
    ├── Dockerfile                            # Dockerfile for containerization
    ├── requirements.txt                      # Python dependencies
    ├── .env                                  # Environment variables (secrets, DB URL)
    └── README.md                             # Documentation for this service


# Overview

## Setup FastAPI app and routes:

We created a FastAPI app and organized the application into routes, services, and utilities.
The core routes for authentication (/auth/register and /auth/login) are implemented in auth_routes.py.

## SQLAlchemy Database Models:

In models.py, we defined a User model that stores user data, including email, username, and hashed passwords. The table was created using SQLAlchemy ORM.

## Pydantic Schemas for Validation:

We created Pydantic models (e.g., UserCreate, UserLogin, UserResponse) in schemas.py for validating input data and formatting output responses.

## Password Hashing and Token Generation:

Passwords are securely hashed using passlib (bcrypt) in the auth_service.py service file.
We implemented JWT token handling in the token_utils.py file, which handles creating and verifying JWT tokens.

## Unit Tests:

Tests were written to validate the functionality of user registration, login, and token generation in test_auth_routes.py and test_auth_service.py.
The tests check for successful responses and proper functionality for authentication endpoints.

## Dockerizing the Application:

A Dockerfile was created to containerize the FastAPI application.
We configured the container to expose port 8000 and run the app using Uvicorn.
We added an environment variable to ensure Python imports work correctly (export PYTHONPATH=$(pwd)).

## Configuration File (config.py):

Configuration settings like the database URL and JWT secret key are stored in config.py.
The settings are referenced by the services and utilities.

# Running the Docker Container:

## To build and run the container:

- Build the Docker image:

    docker build -t auth-service .

- Run the Docker container:

    docker run -p 8000:8000 auth-service


This will start the service inside the Docker container, and you can access it on http://localhost:8000.

Accessing the FastAPI Docs: Once the server is running, FastAPI provides interactive API documentation automatically. Visit:

    http://localhost:8000/docs
