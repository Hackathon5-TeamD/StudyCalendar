import { MockMethods, MockResponse } from "axios-mock-server";
import { User } from "../../../types/User";

const login: MockMethods = {
  post: async (): Promise<MockResponse> => {
    const data: User = {
      user_id: 1,
      user_name: "Mike",
      email: " mike@email.com",
      joined_date: new Date(),
      token: "aaaaaaaaaaaaaa",
    };

    return [200, data];
  },
};

export default login;
