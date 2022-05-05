import { MockMethods, MockResponse } from "axios-mock-server";
import { User } from "../../../types/User";

const list: MockMethods = {
  get: async (): Promise<MockResponse> => {
    const data: User[] = [
      {
        user_id: 1,
        user_name: "Mike",
        email: " mike@email.com",
        joined_date: new Date(),
        token: "aaaaaaaaaaaaaa",
      },
      {
        user_id: 2,
        user_name: "Taro",
        email: " taro@email.com",
        joined_date: new Date(),
        token: "bbbbbbbbbbb",
      },
    ];
    return [200, data];
  },
};

export default list;
