# app/database.py
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

profile_collection = db.get_collection("profiles")

chat_history_collection = db.get_collection("chat_history")
