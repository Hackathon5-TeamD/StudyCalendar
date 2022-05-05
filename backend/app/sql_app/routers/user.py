from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
import os
from sql_app.models.models import User


from sql_app.cruds import user_crud
from sql_app.schemas import user_schema
from sql_app.database import get_db


router = APIRouter()


ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES"))
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/signin")


@router.post("/users/register", response_model=user_schema.User)
async def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    """ユーザーの新規登録
    [args] user_name,password,email,joined_date
    [return] UserCreate Class
    """
    return user_crud.create_user(db=db, user=user)


@router.post("/users/signin", response_model=user_schema.SigninUser)
async def signin(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    """サインイン認証 dbのパスワードと入力されたパスワードを比較,jwtを生成する
    [args] from_data.username (実態はemail),from_data.password
    [return] DBのユーザー情報
    """
    user = user_crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    user_data = {
        "user_id": user.user_id,
        "user_name": user.user_name,
        "email": user.email,
        "joined_date": str(user.joined_date),
    }
    access_token = user_crud.create_access_token(
        user_data, expires_delta=access_token_expires,
    )

    token = {"token": access_token}
    response_data = user_data | token
    return response_data


@router.get("/users/me")
async def read_user_me(current_user: User = Depends(user_crud.get_current_user)):
    """jwt認証
    [args] Authorization jwt
    [return] User Class
    """
    return current_user
