import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouteAuthGuard } from "../components/Auth/RouteAuthGuard";
import { RouteSigninGuard } from "../components/Auth/RouteSigninGuard";
import { Home } from "../components/pages/Home/Home";
import { NotFound } from "../components/pages/NotFound";
import { SignIn } from "../components/pages/SignIn/SignIn";
import { SignUp } from "../components/pages/SignUp/SignUp";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<RouteAuthGuard component={<Home />} redirect="/signin" />}
        />
        <Route
          path="/signin"
          element={<RouteSigninGuard component={<SignIn />} redirect="/" />}
        />
        <Route
          path="/signup"
          element={<RouteSigninGuard component={<SignUp />} redirect="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
