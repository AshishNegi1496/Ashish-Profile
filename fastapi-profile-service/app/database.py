# app/database.py
import os
from pymongo import MongoClient
from dotenv import load_dotenv
from pymongo.errors import ConnectionFailure

load_dotenv()

MONGO_URI = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME","profile_db")

if not MONGO_URI:
    raise ValueError("MONGO_URI environment variable not set")

try:
    client = MongoClient(MONGO_URI)
    # Test the connection
    client.admin.command('ping')
    print("✅ Connected to MongoDB")
    db = client[DB_NAME]
except ConnectionFailure as e:
    print("❌ MongoDB connection failed:", str(e))
    raise

profile_collection = db.get_collection("profiles")

chat_history_collection = db.get_collection("chat_history")
