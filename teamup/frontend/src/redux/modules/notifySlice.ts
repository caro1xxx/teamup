import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface notifyState {
  message: string;
  additive: number;
  flag: boolean;
}

const initialState: notifyState = {
  message: "",
  additive: 0,
  flag: false,
};

export const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    changeMessage: (state, payload) => {
      state.message = payload.payload[0];
      state.additive += 1;
      if (payload.payload[1] === state.flag) return;
      state.flag = payload.payload[1];
    },
  },
});

export const { changeMessage } = notifySlice.actions;

export const selectMessage = (state: RootState) => state.notify.message;
export const selectCount = (state: RootState) => state.notify.additive;
export const selectFlag = (state: RootState) => state.notify.flag;

export default notifySlice.reducer;
