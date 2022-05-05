from typing import Optional
from pydantic import BaseModel

class Create_memo(BaseModel):
    memo_text: str
    #ritten_date : datetime.date
