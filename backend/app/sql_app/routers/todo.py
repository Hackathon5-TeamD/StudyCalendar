from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import datetime


from sql_app.cruds import todo_crud
from sql_app.schemas import todo_schema
from sql_app.database import get_db


router = APIRouter()


@router.get("/todos/list", response_model=List[todo_schema.ResponseTodo])
async def read_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    todos = todo_crud.get_todos_list(db, skip=skip, limit=limit)
    return todos


@router.post("/todos")
async def create_todo(todo: todo_schema.TodoCreate, db: Session = Depends(get_db)):
    return todo_crud.create_todo(db=db, todo=todo)


@router.get("/todos/", response_model=List[todo_schema.ResponseTodo])
async def get_todo(
    year: int, month: int, date: int, user_id: int, db: Session = Depends(get_db)
):
    request_date = datetime.date(year, month, date)
    return todo_crud.get_daily_todos(request_date, user_id, db)


@router.put("/todos", response_model=todo_schema.ResponseTodo)
async def put_todo(req_todo: todo_schema.PutTodo, db: Session = Depends(get_db)):
    return todo_crud.todo_update_db(req_todo, db)


@router.get("/todos/user/list/{user_id}", response_model=List[todo_schema.ResponseTodo])
async def get_user_isdone_todolist(user_id: int, db: Session = Depends(get_db)):
    return todo_crud.get_user_isdone_todolist(user_id, db)


@router.delete("/todos/")
async def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    return todo_crud.delete_todo(todo_id, db)
