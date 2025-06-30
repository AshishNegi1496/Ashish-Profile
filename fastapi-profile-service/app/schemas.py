# app/schemas.py
from bson import ObjectId

def profile_helper(profile) -> dict:
    return {
        "id": str(profile["_id"]),
        "name": profile["name"],
        "position": profile["position"],
        "summary": profile["summary"],
        "location": profile["location"],
        "email": profile.get("email"),
        "phone": profile.get("phone"),
        "linkedin": profile.get("linkedin"),
        "github": profile.get("github"),
         "profileImage": profile.get("profileImage"),
    }
