import { useContext, useState } from "react";
import { getMyUserData } from "../api/userRequest";
import { UserContext } from "../providers/UserProvider";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  //  グローバルstate
  const { userData, setUserData } = useContext(UserContext);

  /**
   * loacal storageのtokenを確認
   * tokenがあるとバックエンドにユーザー認証を行う
   * 成功 homeへ
   * 失敗 signinへ
   */
  const userAuth = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    getMyUserData(token)
      .then((result) => {
        setUserData(result);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    actions: {
      userAuth,
    },
    state: {
      userData,
      isLoading,
    },
  };
};
