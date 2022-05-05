from sqlalchemy.orm import Session
from sql_app.models import models
from sql_app.schemas import memo_schema


def create_memo(memo: memo_schema.CreateMemo, db: Session):
    input_db = models.Memo(
        user_id=memo.user_id,
        memo_txt=memo.memo_txt,
        written_date=memo.written_date,
        is_deleted=False,
    )
    db.add(input_db)
    db.commit()
    db.close

    return "created memo"


def delete_memo(memo_id: int, db: Session):
    db.query(models.Memo).filter(models.Memo.memo_id == memo_id).delete()
    db.commit()
    db.close
    return "delete memo"


def get_user_memo(request_date, user_id, db: Session):
    response_memo = (
        db.query(models.Memo)
        .filter(
            models.Memo.user_id == user_id, models.Memo.written_date == request_date
        )
        .first()
    )

    return response_memo


def put_memo(memo: memo_schema.PutMemo, db: Session):
    response_db = (
        db.query(models.Memo)
        .filter(
            models.Memo.memo_id == memo.memo_id, models.Memo.user_id == memo.user_id
        )
        .first()
    )
    response_db.memo_txt = memo.memo_txt
    db.commit()
    return response_db
