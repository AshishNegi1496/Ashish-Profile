import requests
import base64

OLLAMA_URL = "http://10.208.10.157:11434/api/generate"
MODEL_NAME = "llava:13b"

def generate_caption(image_bytes: bytes) -> str:
    base64_image = base64.b64encode(image_bytes).decode()
    response = requests.post(OLLAMA_URL, json={
        "model": MODEL_NAME,
        "prompt": "Describe this image.",
        "images": [base64_image],
        "stream": False
    })
    response.raise_for_status()
    return response.json()["response"]
