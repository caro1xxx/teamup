import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface chatState {
  message: string;
  flag: number;
}

const initialState: chatState = {
  message: "",
  flag: 0,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage: (state, payload) => {
      state.message = payload.payload;
      state.flag += 1;
    },
  },
});

export const { sendMessage } = chatSlice.actions;

export const selectMessage = (state: RootState) => state.chat.message;

export default chatSlice.reducer;
