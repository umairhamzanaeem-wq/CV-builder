import json
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.core.security import get_current_user
from app.schemas.resume import ResumeCreate, ResumeUpdate, ResumeResponse, ResumeContent
from app.crud.resume import get_resumes, get_resume, create_resume, update_resume, delete_resume

router = APIRouter(prefix="/resumes", tags=["resumes"])


def serialize_content(content: Optional[str]) -> Optional[dict]:
    if content is None:
        return None
    try:
        return json.loads(content)
    except (json.JSONDecodeError, TypeError):
        return None


@router.get("", response_model=list[ResumeResponse])
def list_resumes(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db),
):
    resumes = get_resumes(db, current_user.id)
    return [
        ResumeResponse(
            id=r.id,
            title=r.title,
            template_id=r.template_id,
            content=serialize_content(r.content),
            user_id=r.user_id,
            created_at=r.created_at,
            updated_at=r.updated_at,
        )
        for r in resumes
    ]


@router.get("/{resume_id}", response_model=ResumeResponse)
def read_resume(
    resume_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db),
):
    r = get_resume(db, resume_id, current_user.id)
    if not r:
        raise HTTPException(status_code=404, detail="Resume not found")
    return ResumeResponse(
        id=r.id,
        title=r.title,
        template_id=r.template_id,
        content=serialize_content(r.content),
        user_id=r.user_id,
        created_at=r.created_at,
        updated_at=r.updated_at,
    )


@router.post("", response_model=ResumeResponse, status_code=status.HTTP_201_CREATED)
def create_resume_endpoint(
    resume: ResumeCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db),
):
    r = create_resume(db, current_user.id, resume)
    return ResumeResponse(
        id=r.id,
        title=r.title,
        template_id=r.template_id,
        content=serialize_content(r.content),
        user_id=r.user_id,
        created_at=r.created_at,
        updated_at=r.updated_at,
    )


@router.patch("/{resume_id}", response_model=ResumeResponse)
def update_resume_endpoint(
    resume_id: int,
    resume: ResumeUpdate,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db),
):
    r = update_resume(db, resume_id, current_user.id, resume)
    if not r:
        raise HTTPException(status_code=404, detail="Resume not found")
    return ResumeResponse(
        id=r.id,
        title=r.title,
        template_id=r.template_id,
        content=serialize_content(r.content),
        user_id=r.user_id,
        created_at=r.created_at,
        updated_at=r.updated_at,
    )


@router.delete("/{resume_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_resume_endpoint(
    resume_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db),
):
    if not delete_resume(db, resume_id, current_user.id):
        raise HTTPException(status_code=404, detail="Resume not found")
