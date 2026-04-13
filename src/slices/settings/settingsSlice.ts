import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Settings {
  theme: "light" | "dark";
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
  timezone: string;
}

interface SettingsState {
  settings: Settings;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  settings: {
    theme: "light",
    language: "en",
    notifications: {
      email: true,
      push: true,
    },
    timezone: "UTC",
  },
  loading: false,
  error: null,
};

// Async thunks
export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}/settings`);

      if (!response.ok) {
        throw new Error("Failed to fetch settings");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async (
    { userId, settings }: { userId: string; settings: Partial<Settings> },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`/api/users/${userId}/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("Failed to update settings");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.settings.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.settings.language = action.payload;
    },
    toggleEmailNotifications: state => {
      state.settings.notifications.email = !state.settings.notifications.email;
    },
    togglePushNotifications: state => {
      state.settings.notifications.push = !state.settings.notifications.push;
    },
    setTimezone: (state, action) => {
      state.settings.timezone = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch Settings
      .addCase(fetchSettings.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Settings
      .addCase(updateSettings.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = { ...state.settings, ...action.payload };
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setTheme,
  setLanguage,
  toggleEmailNotifications,
  togglePushNotifications,
  setTimezone,
} = settingsSlice.actions;

export default settingsSlice.reducer;
