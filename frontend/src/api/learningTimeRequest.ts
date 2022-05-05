import axios from "axios";
import { TotalTimeType } from "../types/Time";

const URL = "study-calendar-alb-886063940.ap-northeast-1.elb.amazonaws.com:8000";
export const getAllTatalTime = async (userID: number) => {
  try {
    const result = await axios.get<TotalTimeType>(`${URL}/total/all/${userID}`);
    return result.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getItemsTatalTime = async (userID: number) => {
  try {
    const result = await axios.get<TotalTimeType[]>(
      `${URL}/total/items/${userID}`
    );
    return result.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getMonthlyTotalTime = async (userID: number) => {
  try {
    const result = await axios.get<TotalTimeType>(
      `${URL}/total/monthly/${userID}`
    );
    return result.data;
  } catch (err: any) {
    throw new Error(err);
  }
};
