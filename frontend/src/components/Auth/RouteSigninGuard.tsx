import React, { memo, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PageLoading } from "../atoms/shared/PageLoading";

type Props = {
  component: React.ReactNode;
  redirect: string;
};

export const RouteSigninGuard: React.VFC<Props> = memo((props) => {
  // 認証用hooks
  const { state, actions } = useAuth();
  // 現在のURLを取得
  const location = useLocation();

  // 初期レンダリング時ユーザー認証を行う
  useEffect(() => {
    actions.userAuth();
  }, []);

  if (state.userData) {
    return state.isLoading ? (
      <PageLoading />
    ) : (
      <Navigate to={props.redirect} state={{ from: location }} replace={true} />
    );
  } else {
    return state.isLoading ? <PageLoading /> : <>{props.component}</>;
  }
});
