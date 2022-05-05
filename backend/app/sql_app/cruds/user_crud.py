from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import datetime
from typing import Optional
from jose import jwt, JWTError
from datetime import timedelta
import os
from sql_app.database import get_db


from sql_app.schemas import user_schema
from sql_app.models import models

# from fastapi import HTTPException
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def create_user(db: Session, user: user_schema.User):
    db_user = models.User(
        user_name=user.user_name,
        email=user.email,
        password=get_password_hash(user.password),
        joined_date=user.joined_date,
        is_deleted=False,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user(db, username: str) -> user_schema.User:
    # dbからユーザーのデータを取得
    return db.query(models.User).filter(models.User.email == username).first()


def verify_password(plain_password, hashed_password):
    # dbのパスワードとハッシュ化しているパスワードを検証
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(db, username: str, password: str):
    """ユーザーの認証
    [args] db,fromdata.username(中身はuser_email),fromdata.password
    [return] dbのuserデータ
    """
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """jwtを作成、返却
    [args] ユーザーデータ,jwtの有効期限
    [return] jwt
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encode_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encode_jwt


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/signin")


async def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    """トークンをデコード,DBのユーザー情報を取得
    [args] token,db
    [return] userデータ
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        user_email: str = payload.get("email")
        if user_email is None:
            raise credentials_exception
        # emailをusernameとして扱っている
        token_data = user_schema.TokenData(username=user_email)
    except JWTError:
        raise credentials_exception
    user = get_user(db, token_data.username)
    if user is None:
        raise credentials_exception
    return user
