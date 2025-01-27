from pydantic import BaseModel, EmailStr, Field

# User Registration Schema
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)
    
# User Response Schema
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    
    # Update to use ConfigDict instead of Config
    class ConfigDict:
        from_attributes = True
        
# User Login Schema
class UserLogin(BaseModel):
    email: EmailStr
    password: str
    
# Token Response Schema
class Token(BaseModel):
    access_token: str
    token_type: str