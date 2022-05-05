import axios from "axios";
import { Todo } from "../types/Todo";

const URL = "study-calendar-alb-886063940.ap-northeast-1.elb.amazonaws.com:8000";
export const getIsDoneDailyTodos = async (selectDate: Date, userID: number) => {
  try {
    const year = selectDate.getFullYear();
    const month = selectDate.getMonth() + 1;
    const date = selectDate.getDate();

    const result = await axios.get<Todo[]>(
      `${URL}/todos/?year=${year}&month=${month}&date=${date}&user_id=${userID}`
    );
    return result.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const postLearningPlan = async (
  userID: number,
  todo: string,
  startDate: string,
  endDate: string,
  weekDay: string[],
  learningTime: string
) => {
  try {
    axios.post(`${URL}/todos`, {
      user_id: userID,
      todo_task: todo,
      start_date: startDate,
      end_date: endDate,
      learning_weekday: weekDay,
      learning_time: learningTime,
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const putLearningPlan = async (todoData: Todo, isDone: boolean) => {
  try {
    const result = await axios.put<Todo>(`${URL}/todos`, {
      user_id: todoData.user_id,
      todo_id: todoData.todo_id,
      learning_time: todoData.learning_time,
      is_done: isDone,
    });
    return result.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getUserTodoList = async (userID: number) => {
  try {
    const result = await axios.get<Todo[]>(`${URL}/todos/user/list/${userID}`);
    return result.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const deleteTodo = async (todoId: number) => {
  try {
    axios.delete(`${URL}/todos/?todo_id=${todoId}`);
  } catch (err: any) {
    throw new Error(err);
  }
};
