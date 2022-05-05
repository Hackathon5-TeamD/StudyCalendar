from pydantic import BaseModel


class TotalSec(BaseModel):
    todo_task: str
    total_sec: int

    class Config:
        orm_mode = True
