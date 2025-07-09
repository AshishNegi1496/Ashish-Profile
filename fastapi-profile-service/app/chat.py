from datetime import datetime
import requests
from app.database import chat_history_collection, profile_collection

OLLAMA_URL = "http://10.208.10.157:11434/api/generate"
MODEL_NAME = "llama3:8b"

def generate_reply(prompt: str, user_id: str = "default_user") -> str:
    print("✅ generate_reply called")

    # Fetch stored chat
    history_cursor = chat_history_collection.find({"user_id": user_id}).sort("timestamp", -1).limit(5)
    history = list(history_cursor)

    context = ""
    for h in reversed(history):  # Oldest to newest
        context += f"User: {h['question']}\nAssistant: {h['response']}\n"

    # Fetch profile
    profile = profile_collection.find_one()
    profile_str = ""
    if profile:
        profile_str += (
            f"My name is {profile.get('name')}, I work as a {profile.get('position')}, "
            f"based in {profile.get('location')}.\n"
        )

    full_prompt = f"{profile_str}\nConversation:\n{context}\nUser: {prompt}\nAssistant:"

    # Call model
    response = requests.post(
        OLLAMA_URL,
        json={"model": MODEL_NAME, "prompt": full_prompt, "stream": False}
    )

    print("📨 Response status code:", response.status_code)
    print("📨 Response body:", response.text)

    if response.status_code != 200:
        raise Exception("❌ Failed to generate response from LLaMA")

    result = response.json()
    reply = result.get("response")

    # Save to DB
    chat_history = {
        "user_id": user_id,
        "question": prompt,
        "response": reply,
        "timestamp": datetime.utcnow()
    }
    chat_history_collection.insert_one(chat_history)

    return reply
