import { createSlice } from "@reduxjs/toolkit";
import {
  getBalanceChartsData,
  getDialChartsData,
  getSalesChartsData,
} from "./thunk";
export const initialState: any = {
  balanceOverviewData: [],
  dialTypeData: [],
  salesForecastData: [],
  error: {},
};

const DashboardCRMSlice = createSlice({
  name: "DashboardCRM",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBalanceChartsData.fulfilled, (state, action: any) => {
      state.balanceOverviewData = action.payload;
    });
    builder.addCase(getBalanceChartsData.rejected, (state, action) => {
      state.error = (action.payload as { error: string })?.error || null;
    });

    builder.addCase(getDialChartsData.fulfilled, (state, action: any) => {
      state.dialTypeData = action.payload;
    });
    builder.addCase(getDialChartsData.rejected, (state, action) => {
      state.error = (action.payload as { error: string })?.error || null;
    });

    builder.addCase(getSalesChartsData.fulfilled, (state, action: any) => {
      state.salesForecastData = action.payload;
    });
    builder.addCase(getSalesChartsData.rejected, (state, action) => {
      state.error = (action.payload as { error: string })?.error || null;
    });
  },
});

export default DashboardCRMSlice.reducer;
