from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from ..database import get_db
from ..services.profile_service import ProfileService
from ..schemas import UserProfile, UserProfileUpdate, UserResponse
from ..utils.token_utils import get_current_user

router = APIRouter(prefix="/profile", tags=["profile"])

@router.get("", response_model=UserResponse)
async def get_profile(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    """Get the current user's profile."""
    return UserResponse(
        message="Profile retrieved successfully",
        user=current_user
    )

@router.put("", response_model=UserResponse)
async def update_profile(
    profile_update: UserProfileUpdate,
    current_user: Annotated[UserProfile, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    """Update the current user's profile."""
    profile_service = ProfileService(db)
    updated_user = profile_service.update_profile(
        user_id=current_user.id,
        profile_data=profile_update
    )
    
    return UserResponse(
        message="Profile updated successfully",
        user=updated_user
    )
