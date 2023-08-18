import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface roomState {
  flag: number;
  heightLinePk: number;
  newCreate: {
    create_time: number;
    creator: string;
    description: string;
    name: string;
    pk: number;
    surplus: number;
    take_seat_quorum: number;
    type: string;
    users: { user: string; avator_color: string }[];
    uuid: string;
  } | null;
  orderBy: string | null;
}

const initialState: roomState = {
  flag: 0,
  newCreate: null,
  heightLinePk: 0,
  orderBy: null,
};

export const roomSlice = createSlice({
  name: "romm",
  initialState,
  reducers: {
    saveNewCreateRoom: (state, payload) => {
      state.newCreate = { ...payload.payload[0] };
      state.heightLinePk = payload.payload[0].pk;
      state.flag += 1;
    },
    changeRoomOrderBy: (state, payload) => {
      state.orderBy = payload.payload;
    },
  },
});

export const { saveNewCreateRoom, changeRoomOrderBy } = roomSlice.actions;

export const selectMessage = (state: RootState) => state.chat.message;

export default roomSlice.reducer;
