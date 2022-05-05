import datetime
from pydantic import BaseModel
from typing import Optional


class Memo(BaseModel):
    memo_id: int
    memo_txt: Optional[str] = None


class ResponseMemo(Memo):
    written_date: datetime.datetime
    user_id: int
    is_deleted: bool
    memo_txt: str

    class Config:
        orm_mode = True


class CreateMemo(BaseModel):
    user_id: int
    memo_txt: str
    written_date: datetime.date


class PutMemo(BaseModel):
    user_id: int
    memo_id: int
    memo_txt: str
