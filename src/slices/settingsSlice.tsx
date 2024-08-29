// src/slices/settingsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  clientId: string;
  body: string;
}

const initialState: SettingsState = {
  clientId: "",
  body: "",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<SettingsState>) => {
      state.clientId = action.payload.clientId;
      state.body = action.payload.body;
    },
  },
});

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
