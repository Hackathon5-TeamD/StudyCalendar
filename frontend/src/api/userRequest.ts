/**
 * ユーザー処理のリクエスト
 */

import axios from "axios";
import { User } from "../types/User";

const URL = "study-calendar-alb-886063940.ap-northeast-1.elb.amazonaws.com:8000";

// ログインのリクエスト
export const postLoginUser = async (
  inputEmail: string,
  inputPassword: string
) => {
  try {
    const formData = new FormData();
    // emailをusernameとしている（FastAPIの仕様）
    formData.append("username", inputEmail);
    formData.append("password", inputPassword);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const result = await axios.post<User>(
      `${URL}/users/signin`,
      formData,
      config
    );
    return result.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

// 新規登録リクエスト
export const postRegisterUser = async (
  inputUserName: string,
  inputEmail: string,
  inputPassword: string
) => {
  try {
    const result = await axios.post<User>(`${URL}/users/register`, {
      user_name: inputUserName,
      email: inputEmail,
      password: inputPassword,
      joined_date: "2022-03-07",
      is_deleted: false,
    });
    return result.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

// ユーザー情報取得リクエスト
export const getMyUserData = async (token: string) => {
  try {
    const result = await axios.get<User>(`${URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (err: any) {
    throw new Error(err);
  }
};
