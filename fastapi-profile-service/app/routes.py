from fastapi import APIRouter, HTTPException, status
from app.models import Profile
from app.database import profile_collection
from app.schemas import profile_helper
from bson import ObjectId
from fastapi.encoders import jsonable_encoder

router = APIRouter(prefix="/api/profiles", tags=["Profiles"])

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_profile(profile: Profile):
    encoded_profile = jsonable_encoder(profile) 
    result = profile_collection.insert_one(encoded_profile)
    return {"id": str(result.inserted_id)}
@router.get("/{id}")
def get_profile(id: str):
    profile = profile_collection.find_one({"_id": ObjectId(id)})
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile_helper(profile)

@router.get("/")
def list_profiles():
    return [profile_helper(p) for p in profile_collection.find()]

@router.put("/{id}")
def update_profile(id: str, updated: Profile):
    result = profile_collection.update_one(
        {"_id": ObjectId(id)}, {"$set": updated.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {"message": "Profile updated"}

@router.delete("/{id}")
def delete_profile(id: str):
    result = profile_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {"message": "Profile deleted"}
