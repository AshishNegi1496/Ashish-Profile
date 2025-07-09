import requests

OLLAMA_URL = "http://10.208.10.157:11434/api/generate"
MODEL_NAME = "llama3:8b"

def generate_reply(message: str) -> str:
    response = requests.post(OLLAMA_URL, json={
        "model": MODEL_NAME,
        "prompt": message,
        "stream": False
    })
    response.raise_for_status()
    return response.json()["response"]
