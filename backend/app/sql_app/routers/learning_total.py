from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List


from sql_app.database import get_db
from sql_app.cruds import learning_total_crud
from sql_app.schemas import learning_total_schema


router = APIRouter()


@router.get("/total/all/{user_id}", response_model=learning_total_schema.TotalSec)
async def total_time(user_id: int, db: Session = Depends(get_db)):
    return learning_total_crud.total_time(user_id, db)


@router.get(
    "/total/items/{user_id}", response_model=List[learning_total_schema.TotalSec]
)
async def items_time(user_id: int, db: Session = Depends(get_db)):
    return learning_total_crud.items_time(user_id, db)


@router.get("/total/monthly/{user_id}", response_model=learning_total_schema.TotalSec)
async def monthly_total_time(user_id: int, db: Session = Depends(get_db)):
    return learning_total_crud.monthly_total_time(user_id, db)
