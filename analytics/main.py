from fastapi import FastAPI
from datetime import datetime, timedelta
from routes.analytics import router as analytics_router
from db import tasks_collection

app = FastAPI(title="QuickTask Analytics Service")

app.include_router(analytics_router, prefix="/analytics")


@app.get("/analytics/productivity/{user_id}")
def productivity(user_id: str, days: int = 7):

    start_date = datetime.utcnow() - timedelta(days=days)

    pipeline = [
        {
            "$match": {
                "$and": [
                    {
                        "$or": [
                            {"userId": user_id},
                            {"userId": ObjectId(user_id)}
                        ]
                    },
                    {"status": {"$regex": "^completed$", "$options": "i"}},
                    {"updatedAt": {"$gte": start_date}}
                ]
            }
        },
        {
            "$group": {
                "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$updatedAt"}},
                "completed": {"$sum": 1}
            }
        },
        {"$sort": {"_id": 1}}
    ]

    data = list(tasks_collection.aggregate(pipeline))
    return [{"date": d["_id"], "completed": d["completed"]} for d in data]
@app.get("/debug/tasks")
def debug_tasks():
    data = list(tasks_collection.find({}, {"_id": 0}))
    return data
