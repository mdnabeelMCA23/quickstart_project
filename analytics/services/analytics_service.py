from bson.objectid import ObjectId
from datetime import datetime
from db import tasks_collection

def get_user_stats(user_id: str):
    user_obj_id = ObjectId(user_id)
    now = datetime.utcnow()

    tasks = list(tasks_collection.find({"userId": user_obj_id}))

    total = len(tasks)
    completed = len([t for t in tasks if t["status"] == "Completed"])
    pending = total - completed
    overdue = len([t for t in tasks if t.get("dueDate") and t["dueDate"] < now and t["status"] != "Completed"])

    # Priority counts
    priority_distribution = {"High": 0, "Medium": 0, "Low": 0}
    for t in tasks:
        p = t.get("priority", "Low")
        if p in priority_distribution:
            priority_distribution[p] += 1

    # Status counts
    status_distribution = {"Todo": 0, "In Progress": 0, "Completed": 0}
    for t in tasks:
        s = t.get("status", "Todo")
        if s in status_distribution:
            status_distribution[s] += 1

    # Weekly productivity (last 7 days)
    from datetime import timedelta
    start_date = now - timedelta(days=7)
    weekly_data = []
    for t in tasks:
        if t.get("status") == "Completed" and t.get("updatedAt") >= start_date:
            date_str = t["updatedAt"].strftime("%Y-%m-%d")
            weekly_data.append(date_str)
    from collections import Counter
    weekly_counter = Counter(weekly_data)
    weekly_stats = [{"date": d, "count": c} for d, c in sorted(weekly_counter.items())]

    completion_rate = (completed / total * 100) if total else 0

    return {
        "total_tasks": total,
        "completed_tasks": completed,
        "pending_tasks": pending,
        "completion_rate": round(completion_rate, 2),
        "overdue_tasks": overdue,
        "priority_distribution": priority_distribution,
        "status_distribution": status_distribution,
        "weekly_data": weekly_stats
    }
