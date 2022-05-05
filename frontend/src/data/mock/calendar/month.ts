import { MockMethods, MockResponse } from "axios-mock-server";
import { StudyRecord } from "../../../types/Calendar";

const MonthlyStudyRecord: MockMethods = {
  get: async (): Promise<MockResponse> => {
    const data: StudyRecord[] = [
      {
        todo_id: 1,
        user_id: 1,
        todo_task: " 寿司打",
        doing_date: 15,
        doing_time: 2,
        is_done: false,
      },
      {
        todo_id: 2,
        user_id: 1,
        todo_task: " envader",
        doing_date: 15,
        doing_time: 2,
        is_done: false,
      },
      {
        todo_id: 3,
        user_id: 1,
        todo_task: "Linux標準教科書",
        doing_date: 15,
        doing_time: 2,
        is_done: false,
      },
      {
        todo_id: 4,
        user_id: 1,
        todo_task: "過去授業",
        doing_date: 15,
        doing_time: 2,
        is_done: false,
      },
      {
        todo_id: 5,
        user_id: 2,
        todo_task: "過去授業",
        doing_date: 20,
        doing_time: 2,
        is_done: false,
      },
    ];
    return [200, data];
  },
};

export default MonthlyStudyRecord;
