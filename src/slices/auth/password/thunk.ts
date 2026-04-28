import { createAsyncThunk } from "@reduxjs/toolkit";

export const resetPasswordForUser = createAsyncThunk(
  "auth/resetPasswordForUser",
  async ({ userId, password }: any, { rejectWithValue }) => {
    try {
      const csrfToken = typeof window !== "undefined" ? sessionStorage.getItem("csrfToken") || "" : "";
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || "Failed to reset password");
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);