import React, { createContext, ReactNode, useState } from "react";
import { User } from "../types/User";

interface Props {
  children: ReactNode;
}
export interface UserContextType {
  userData: User | undefined;
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const UserContext = createContext({} as UserContextType);

export const UserProvider = (props: Props) => {
  const { children } = props;
  const [userData, setUserData] = useState<User | undefined>();

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
