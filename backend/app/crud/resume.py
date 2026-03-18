import json
from typing import Optional

from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.schemas.resume import ResumeCreate, ResumeUpdate, ResumeContent


def get_resumes(db: Session, user_id: int):
    return db.query(Resume).filter(Resume.user_id == user_id).order_by(Resume.updated_at.desc()).all()


def get_resume(db: Session, resume_id: int, user_id: int) -> Optional[Resume]:
    return db.query(Resume).filter(Resume.id == resume_id, Resume.user_id == user_id).first()


def create_resume(db: Session, user_id: int, resume: ResumeCreate) -> Resume:
    content_str = None
    if resume.content is not None:
        content_str = resume.content.model_dump_json()
    db_resume = Resume(
        title=resume.title,
        template_id=resume.template_id,
        content=content_str,
        user_id=user_id,
    )
    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)
    return db_resume


def update_resume(db: Session, resume_id: int, user_id: int, resume: ResumeUpdate) -> Optional[Resume]:
    db_resume = get_resume(db, resume_id, user_id)
    if not db_resume:
        return None
    if resume.title is not None:
        db_resume.title = resume.title
    if resume.template_id is not None:
        db_resume.template_id = resume.template_id
    if resume.content is not None:
        db_resume.content = resume.content.model_dump_json()
    db.commit()
    db.refresh(db_resume)
    return db_resume


def delete_resume(db: Session, resume_id: int, user_id: int) -> bool:
    db_resume = get_resume(db, resume_id, user_id)
    if not db_resume:
        return False
    db.delete(db_resume)
    db.commit()
    return True
