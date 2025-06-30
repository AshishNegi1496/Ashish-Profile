# app/models.py
from pydantic import BaseModel, Field
from typing import Optional

class Profile(BaseModel):
    name: str
    position: str
    summary: str
    location: str
    email: Optional[str]
    phone: Optional[str]
    linkedin: Optional[str]
    github: Optional[str]
    profileImage: Optional[str]