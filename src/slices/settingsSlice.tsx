import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface SettingsState {
  settings: any | null;
  loading: boolean;
  error: string | null;
  successMessage: string;
}

const initialState: SettingsState = {
  settings: null,
  loading: false,
  error: null,
  successMessage: "",
};

export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/settings/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch settings");
    }
    const data = await response.json();
    return data;
  }
);

export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async ({ id, settings }: { id: string; settings: any }) => {
    const response = await fetch(`http://localhost:3000/api/settings/${id}`, {
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
  }
);

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    clearSuccessMessage(state) {
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch settings";
      })
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        state.successMessage = "Settings updated successfully!";
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update settings";
      });
  },
});

export const { clearSuccessMessage } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings.settings;
export const selectLoading = (state: RootState) => state.settings.loading;
export const selectError = (state: RootState) => state.settings.error;
export const selectSuccessMessage = (state: RootState) =>
  state.settings.successMessage;

export default settingsSlice.reducer;
