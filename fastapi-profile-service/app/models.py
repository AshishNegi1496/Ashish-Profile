from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
from datetime import datetime
class Education(BaseModel):
    degree: str
    institution: str
    start_year: int
    end_year: Optional[int]
    grade: Optional[str]

class Experience(BaseModel):
    title: str
    company: str
    start_date: str
    end_date: Optional[str]
    description: Optional[str]

class Certification(BaseModel):
    name: str
    issuer: str
    issue_date: str
    credential_url: Optional[HttpUrl]

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
    resumeUrl: Optional[HttpUrl]

    # New fields
    education: Optional[List[Education]] = []
    experience: Optional[List[Experience]] = []
    skills: Optional[List[str]] = []
    certifications: Optional[List[Certification]] = []
    languages: Optional[List[str]] = []




class ChatHistory(BaseModel):
    user_id: Optional[str]  # If login system exists
    question: str
    response: str
    timestamp: datetime = datetime.now()