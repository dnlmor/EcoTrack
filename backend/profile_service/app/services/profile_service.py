from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from typing import Optional
from ..models import User
from ..schemas import UserProfileUpdate

class ProfileService:
    def __init__(self, db: Session):
        self.db = db

    def get_user_by_id(self, user_id: int) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()

    def get_user_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email).first()

    def update_profile(self, user_id: int, profile_data: UserProfileUpdate) -> User:
        user = self.get_user_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Check if email is being updated and verify it's not taken
        if profile_data.email and profile_data.email != user.email:
            if self.get_user_by_email(profile_data.email):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered"
                )
            user.email = profile_data.email
            user.email_verified = False  # Reset email verification on email change

        # Update other fields if provided
        if profile_data.username:
            try:
                user.username = profile_data.username
                self.db.flush()  # Test the changes without committing
            except IntegrityError:
                self.db.rollback()
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username already taken"
                )

        try:
            self.db.commit()
            self.db.refresh(user)
            return user
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error updating profile"
            )