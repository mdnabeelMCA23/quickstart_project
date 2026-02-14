from fastapi import APIRouter
from services.analytics_service import get_user_stats

router = APIRouter()

@router.get("/stats/{user_id}")
def stats(user_id: str):
    return get_user_stats(user_id)
