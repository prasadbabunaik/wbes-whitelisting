"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../../slices/thunks";
import { createSelector } from "reselect";

const Logout = () => {
  const dispatch: any = useDispatch();
  const router = useRouter();

  const logoutData = createSelector(
    (state: any) => state.Login,
    loginState => loginState.isUserLogout
  );

  const isUserLogout = useSelector(logoutData);

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    if (isUserLogout) {
      router.push("/login");
    }
  }, [isUserLogout, router]);

  return <></>;
};

export default Logout;
