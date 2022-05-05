import datetime
from typing import List
from pydantic import BaseModel


class TodoCreate(BaseModel):
    user_id: int
    todo_task: str
    start_date: datetime.date
    end_date: datetime.date
    learning_weekday: List[str]
    learning_time: datetime.time


class TodoSaveToDb(BaseModel):
    user_id: int
    todo_task: str
    learning_time: datetime.time
    is_done: bool
    todo_id: int

    class Config:
        orm_mode = True


class ResponseTodo(TodoSaveToDb):
    execution_date: datetime.datetime


class PutTodo(BaseModel):
    user_id: int
    todo_id: int
    learning_time: datetime.time
    is_done: bool


class Todo(TodoCreate):
    todo_id: int

    class Config:
        orm_mode = True
