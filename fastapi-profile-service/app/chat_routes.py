from fastapi import APIRouter, UploadFile, File, HTTPException
from app.chat import generate_reply
from app.caption import generate_caption

router = APIRouter(prefix="/api/ai", tags=["AI Tools"])

@router.post("/chat")
def chat_with_llama(prompt: str):
    try:
        reply = generate_reply(prompt)
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/caption")
async def caption_image(file: UploadFile = File(...)):
    try:
        content = await file.read()
        caption = generate_caption(content)
        return {"caption": caption}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
