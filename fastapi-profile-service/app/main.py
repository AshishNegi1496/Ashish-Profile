from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.profile_routes import router as profile_router
from app.chat_routes import router as chat_router
app = FastAPI()

# CORS 
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["*"], 
     allow_origins=[
         	"https://ashishnegi.up.railway.app",
          "https://ashishnegi.vercel.app",
          	"https://ashishnegi.up.railway.app/",
          "https://ashishnegi.vercel.app/",
          "http://10.208.10.157:8000/api/profiles",
          "http://localhost:3001",
          "http://10.208.10.157:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routes
app.include_router(profile_router)
app.include_router(chat_router) 

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
