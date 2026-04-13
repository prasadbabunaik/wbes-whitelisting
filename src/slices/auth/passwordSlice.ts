// src/slices/auth/passwordSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { resetPasswordForUser } from './password/thunk'; // Import the resetPassword action

interface PasswordState {
  error: string | null;
}

const initialState: PasswordState = {
  error: null,
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordForUser.fulfilled, (state, action) => {
        // Handle success (you can store data if needed)
        console.log('Password reset successful', action.payload);
      })
      .addCase(resetPasswordForUser.rejected, (state, action) => {
        // Handle failure
        state.error = action.payload as string;
        console.error('Password reset failed:', action.payload);
      });
  },
});

export default passwordSlice.reducer;