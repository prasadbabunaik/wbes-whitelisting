import { createAsyncThunk } from "@reduxjs/toolkit";

//Include Both Helper File with needed methods
import {
  getEvents as getEventsApi,
  addNewEvent as addNewEventApi,
  updateEvent as updateEventApi,
  deleteEvent as deleteEventApi,
  getCategories as getCategoriesApi,
  getUpCommingEvent as getUpCommingEventApi,
} from "../../helpers/fakebackend_helper";

export const getEvents = createAsyncThunk("calendar/getEvents", async () => {
  // Fetch calendar events (fake or real API)
  const response = await getEventsApi();
  return response;
});

export const addNewEvent = createAsyncThunk(
  "calendar/addNewEvent",
  async (event: any) => {
    try {
      const response = addNewEventApi(event);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const updateEvent = createAsyncThunk(
  "calendar/updateEvent",
  async (event: any) => {
    try {
      const response = updateEventApi(event);
      const modifiedevent = await response;
      return modifiedevent;
    } catch (error) {
      return error;
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "calendar/deleteEvent",
  async (event: any) => {
    try {
      const response = deleteEventApi(event);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getCategories = createAsyncThunk(
  "calendar/getCategories",
  async () => {
    const response = await getCategoriesApi();
    return response;
  }
);

export const getUpCommingEvent = createAsyncThunk(
  "calendar/getUpCommingEvent",
  async () => {
    const response = await getUpCommingEventApi();
    return response;
  }
);

export const resetCalendar = createAsyncThunk(
  "calendar/resetCalendar",
  async () => {
    try {
      const response = "";
      return response;
    } catch (error) {
      return error;
    }
  }
);
