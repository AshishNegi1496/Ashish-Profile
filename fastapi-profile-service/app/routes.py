# app/routes.py
from fastapi import APIRouter, HTTPException, status
from app.models import Profile
from app.database import profile_collection
from app.schemas import profile_helper
from bson import ObjectId

# Change this line
router = APIRouter(prefix="/profiles", tags=["Profiles"])


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_profile(profile: Profile):
    result = profile_collection.insert_one(profile.dict())
    return {"id": str(result.inserted_id)}

@router.get("/{id}")
def get_profile(id: str):
    profile = profile_collection.find_one({"_id": ObjectId(id)})
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile_helper(profile)

@router.get("/")
def list_profiles():
    profiles = profile_collection.find()
    return [profile_helper(p) for p in profiles]

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