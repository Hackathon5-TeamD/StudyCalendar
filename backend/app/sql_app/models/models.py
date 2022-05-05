from sqlalchemy import Column, Integer, String, DATETIME, Boolean, Time, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

# modelで使用する
Base = declarative_base()


# Create
class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    user_name = Column(String(255))
    email = Column(String(255))
    password = Column(String(255))
    joined_date = Column(DATETIME)
    is_deleted = Column(Boolean)


class Todo(Base):
    __tablename__ = "todos"
    todo_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey(User.user_id))
    todo_task = Column(String(30))
    execution_date = Column(DATETIME)
    is_done = Column(Boolean)
    learning_time = Column(Time)


# Create_memo
class Memo(Base):
    __tablename__ = "memos"
    user_id = Column(Integer, ForeignKey(User.user_id))
    memo_id = Column(Integer, primary_key=True, autoincrement=True)
    memo_txt = Column(String(2000))
    written_date = Column(DATETIME)
    is_deleted = Column(Boolean)
