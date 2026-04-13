"use client";

import fakeBackend from "../helpers/AuthType/fakeBackend";

let isInitialized = false;

export const initFakeBackend = () => {
  if (typeof window !== "undefined" && !isInitialized) {
    fakeBackend();
    isInitialized = true;
  }
};
