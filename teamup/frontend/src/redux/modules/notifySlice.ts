import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface notifyState {
  message: string;
  additive: number;
}

const initialState: notifyState = {
  message: "",
  additive: 0,
};

export const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    changeMessage: (state, payload) => {
      state.message = payload.payload;
      state.additive += 1;
    },
  },
});

export const { changeMessage } = notifySlice.actions;

export const selectMessage = (state: RootState) => state.notify.message;
export const selectCount = (state: RootState) => state.notify.additive;

export default notifySlice.reducer;
