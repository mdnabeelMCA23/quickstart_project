# db.py
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

# ✅ CHANGE DATABASE NAME HERE
db = client["quickstart"]   # <-- IMPORTANT FIX

tasks_collection = db["tasks"]
