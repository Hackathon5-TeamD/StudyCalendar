from operator import and_
from sqlalchemy.orm import Session
from sql_app.schemas import todo_schema
from sql_app.models import models
import datetime
import locale


# 時間を日本語設定にする
locale.setlocale(locale.LC_ALL, "ja_JP.UTF-8")


def get_todos_list(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Todo).offset(skip).limit(limit).all()


def create_todo(db: Session, todo: todo_schema.TodoCreate):
    """受け取った開始日,終了日から学習する期間を算出、そこから曜日を見て実際に学習する日だけをDBに保存
    [args] db , todo : TodoCreate
    [return] string
    """
    period = todo.end_date - todo.start_date
    repeat_times = period.days + 1

    for length in range(repeat_times):
        excution_date = todo.start_date + datetime.timedelta(days=length)
        if excution_date.strftime("%a") in todo.learning_weekday:
            input_db = models.Todo(
                user_id=todo.user_id,
                todo_task=todo.todo_task,
                execution_date=excution_date,
                learning_time=todo.learning_time,
                is_done=False,
            )
            db.add(input_db)

    db.commit()
    db.close
    return "ok! input todo data"


def get_daily_todos(request_date: datetime.date, user_id: int, db: Session):
    """指定された日時,user_idから学習記録を返却
    [args] request_date,user_id,db
    [return] todo_schema.Response_Todo
    """

    response_data = (
        db.query(models.Todo)
        .filter(
            and_(
                models.Todo.user_id == user_id,
                models.Todo.execution_date == request_date,
            )
        )
        .all()
    )
    return response_data


def todo_update_db(req_todo: todo_schema.PutTodo, db: Session):
    """user_id,todo_idで更新する記録を検索,リクエストで飛んできた内容に書き換える
    [args] req_tod : PutTodo , db
    [return] string
    """
    fetch_from_db = (
        db.query(models.Todo).filter(
            and_(
                models.Todo.user_id == req_todo.user_id,
                models.Todo.todo_id == req_todo.todo_id,
            )
        )
    ).first()
    fetch_from_db.is_done = req_todo.is_done
    fetch_from_db.learning_time = req_todo.learning_time
    db.commit()
    # もう一度取得
    response_data = (
        db.query(models.Todo).filter(
            and_(
                models.Todo.user_id == req_todo.user_id,
                models.Todo.todo_id == req_todo.todo_id,
            )
        )
    ).first()
    return response_data


def get_user_isdone_todolist(user_id: int, db: Session):
    response_data = (
        db.query(models.Todo)
        .filter(and_(models.Todo.user_id == user_id, models.Todo.is_done == 1))
        .all()
    )
    return response_data


def delete_todo(todo_id: int, db: Session):
    db.query(models.Todo).filter(models.Todo.todo_id == todo_id).delete()
    db.commit()
    db.close
    return "ok! delete todo data"
