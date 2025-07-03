from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
app = FastAPI()

# CORS 
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["*"], 
     allow_origins=[
        "http://localhost:3001",
        "http://10.208.10.157:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routes
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
