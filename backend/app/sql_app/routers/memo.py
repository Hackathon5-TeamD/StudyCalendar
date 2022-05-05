import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


from sql_app.schemas import memo_schema
from sql_app.cruds import memo_crud
from sql_app.database import get_db


router = APIRouter()


@router.get("/memo/", response_model=memo_schema.ResponseMemo)
async def memo(
    year: int, month: int, date: int, user_id: int, db: Session = Depends(get_db)
):
    request_date = datetime.date(year, month, date)
    return memo_crud.get_user_memo(request_date, user_id, db)


@router.post("/memo")
async def create_memo(memo: memo_schema.CreateMemo, db: Session = Depends(get_db)):
    return memo_crud.create_memo(memo, db)


@router.put("/memo", response_model=memo_schema.ResponseMemo)
async def update_memo(memo: memo_schema.PutMemo, db: Session = Depends(get_db)):
    return memo_crud.put_memo(memo, db)


@router.delete("/memo/{memo_id}")
async def delete_memo(memo_id: int, db: Session = Depends(get_db)):
    return memo_crud.delete_memo(memo_id, db)

