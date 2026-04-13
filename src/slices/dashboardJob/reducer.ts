import { createSlice } from "@reduxjs/toolkit";
import { getApplicationsStatistic } from "./thunk";
export const initialState = {
  applicationsStatistic: [],
  error: {},
};
const DashboardJobSlice = createSlice({
  name: "DashboardJob",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      getApplicationsStatistic.fulfilled,
      (state: any, action: any) => {
        state.applicationsStatistic = action.payload;
      }
    );
    builder.addCase(
      getApplicationsStatistic.rejected,
      (state: any, action: any) => {
        state.error = action.error.message;
      }
    );
  },
});
export default DashboardJobSlice.reducer;
