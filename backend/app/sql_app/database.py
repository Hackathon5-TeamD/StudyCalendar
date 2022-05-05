from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

from sql_app.models.models import Base


# 接続したいDBの基本情報を設定
user_name = "user"
password = "password"
host = "db"  # docker-composeで定義したMySQLのサービス名
database_name = "db"

DATABASE = "mysql://%s:%s@%s/%s?charset=utf8" % (
    user_name,
    password,
    host,
    database_name,
)

# DBとの接続
ENGINE = create_engine(DATABASE, encoding="utf-8", echo=False)


def reset_database():
    """テーブルの作成"""
    Base.metadata.drop_all(bind=ENGINE)
    Base.metadata.create_all(bind=ENGINE)


if __name__ == "__main__":
    reset_database()


# Sessionの作成
SessionLocal = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=ENGINE)
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# DB接続用のセッションクラス、インスタンスが作成されると接続する
Base.query = SessionLocal.query_property()
