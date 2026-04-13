import { createAsyncThunk } from "@reduxjs/toolkit";
//Include Both Helper File with needed methods
import { getApplicationsStatistic as getApplicationsStatisticApi } from "../../helpers/fakebackend_helper";

export const getApplicationsStatistic = createAsyncThunk(
  "dashboardJob/getApplicationsStatistic",
  async (roomId: any) => {
    try {
      const response = getApplicationsStatisticApi(roomId);
      const data = await response;
      return data;
    } catch (error) {
      return error;
    }
  }
);
