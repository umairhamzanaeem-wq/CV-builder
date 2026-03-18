from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel


class ResumeContent(BaseModel):
    personalInfo: Optional[dict] = None
    education: list = []
    experience: list = []
    skills: list = []
    projects: list = []
    sectionOrder: list = [
        "personalInfo",
        "education",
        "experience",
        "skills",
        "projects",
    ]


class ResumeCreate(BaseModel):
    title: str = "Untitled Resume"
    template_id: str = "modern"
    content: Optional[ResumeContent] = None


class ResumeUpdate(BaseModel):
    title: Optional[str] = None
    template_id: Optional[str] = None
    content: Optional[ResumeContent] = None


class ResumeResponse(BaseModel):
    id: int
    title: str
    template_id: str
    content: Optional[dict] = None
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
