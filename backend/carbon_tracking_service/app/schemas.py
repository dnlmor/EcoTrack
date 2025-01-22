from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas import CarbonActivityCreate, CarbonActivityOut
from app.models import CarbonActivity, User
from app.database import get_db

router = APIRouter()

@router.post("/carbon-activities/", response_model=CarbonActivityOut)
def create_carbon_activity(
    activity: CarbonActivityCreate,
    user_id: int,  # Assume extracted from JWT
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    carbon_activity = CarbonActivity(**activity.dict(), user_id=user_id)
    db.add(carbon_activity)
    db.commit()
    db.refresh(carbon_activity)

    return carbon_activity
