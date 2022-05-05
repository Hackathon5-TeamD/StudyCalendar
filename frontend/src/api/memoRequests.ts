import axios from "axios";
import { Memo } from "../types/Memo";

const URL = "study-calendar-alb-886063940.ap-northeast-1.elb.amazonaws.com:8000";
export const getDailyMemo = async (date: Date, user_id: number) => {
  try {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const getDate = date.getDate();
    const result = await axios.get<Memo>(
      `${URL}/memo/?year=${year}&month=${month}&date=${getDate}&user_id=${user_id}`
    );
    return result.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const postMemo = async (
  userID: number,
  memoText: string,
  dateStr: string
) => {
  try {
    axios.post(`${URL}/memo`, {
      user_id: userID,
      memo_txt: memoText,
      written_date: dateStr,
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const putMemo = async (userID: number, memo: Memo) => {
  try {
    axios.put(`${URL}/memo`, {
      user_id: userID,
      memo_id: memo.memo_id,
      memo_txt: memo.memo_txt,
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const deleteMemo = async (memoID: number) => {
  try {
    axios.delete(`${URL}/memo/${memoID}`);
  } catch (err: any) {
    throw new Error(err);
  }
};
