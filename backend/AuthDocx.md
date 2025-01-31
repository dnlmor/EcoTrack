# BACKEND ARCHITECTURE

## Consist of these services:
- core service (PORT 8000) 
- *auth service* (PORT 8001)
- carbon tracking service (PORT 8002)
- game service (PORT 8003)


***Core Service*** works as the API Gateway, therefore, the rest of the service are able to use the PORT 8000. 


### auth service routes: localhost:8000/auth

1. GET - /register

        {
        "username": "string",
        "email": "user@example.com",
        "password": "stringst",
        }


2. POST - /login

        {
        "email": "user@example.com",
        "password": "string"
        }

3. GET - /logout

    uses token

4. GET - /me

use token and get this:

        {
        "id": 0,
        "username": "string",
        "email": "user@example.com",
        "full_name": "string",
        "bio": "string",
        "avatar_url": "string",
        "phone_number": "string",
        "email_verified": true,
        "is_active": true
        }

5. PUT - /me
use token and input this:

        {
        "full_name": "string",
        "bio": "string",
        "avatar_url": "string",
        "phone_number": "string",
        "username": "string",
        "email": "user@example.com",
        "password": "stringst"
        }


### THE END ###