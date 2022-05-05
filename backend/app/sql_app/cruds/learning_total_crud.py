import datetime
import calendar
from sqlalchemy import distinct
from sqlalchemy.orm import Session
from operator import and_


from sql_app.schemas import todo_schema
from sql_app.models import models


def total_time(user_id: int, db: Session):
    """ユーザーの学習総累計時間を返却
    [args] user_id,db
    [return] {todo_task : 'total' , total_sec : int}
    """
    fetch_from_db = (
        db.query(models.Todo)
        .filter(and_(models.Todo.user_id == user_id, models.Todo.is_done == 1))
        .all()
    )
    return total_time_counter(fetch_from_db, "total")


def items_time(user_id: int, db: Session):
    """項目ごとの累計時間を計算して配列にして返却
    [args] user_id , db
    [return] List={todo_task : str , total_sec : int}
    """
    response_data = []
    items_distinct = (
        db.query(distinct(models.Todo.todo_task))
        .filter(models.Todo.user_id == user_id)
        .all()
    )
    for todo in items_distinct:
        item_data = (
            db.query(models.Todo)
            .filter(
                models.Todo.user_id == user_id,
                models.Todo.todo_task == todo[0],
                models.Todo.is_done == 1,
            )
            .all()
        )
        response_data.append(total_time_counter(item_data, todo[0]))
    return response_data


def monthly_total_time(user_id: int, db: Session):
    """今日の日付からその月の最初の日と最後の日を出して、その範囲内でDBを中身を取り出す。
        取り出したDBの値から総学習時間を計算して、秒数で返却する。
    [args] user_id,db
    [return] {todo_task : 'monthly_total' , total_sec : int}
    """
    today = datetime.date.today()
    first_day = today.replace(day=1)
    calculating_last_day = last_day = calendar.monthrange(today.year, today.month)[1]
    last_day = today.replace(day=calculating_last_day)
    fetch_from_db = (
        db.query(models.Todo)
        .filter(
            and_(
                models.Todo.execution_date >= first_day,
                models.Todo.execution_date <= last_day,
            ),
            models.Todo.user_id == user_id,
            models.Todo.is_done == 1,
        )
        .all()
    )
    return total_time_counter(fetch_from_db, "monthly_total")


def total_time_counter(todo_data: todo_schema.Todo, task_name: str):
    """引数で入れた項目のトータル時間を計算して秒数にして返却する。
    [args] todo_data : (dbの情報) , task_name
    [return] {todo_task : str , total_sec : int}
    """
    total_time = 0
    for i, time in enumerate(todo_data):
        time_str = str(time.learning_time)
        hour = int(time_str[0:2]) * 60 * 60
        min = int(time_str[3:5]) * 60
        sec = int(time_str[6:8])
        total_time = total_time + hour + min + sec
        if i == len(todo_data) - 1:
            return {"todo_task": task_name, "total_sec": total_time}
