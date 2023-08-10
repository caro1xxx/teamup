import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface userState {
  username: string;
  isLogin: boolean;
  access_token: string;
  registerPupup: boolean;
  loginPupup: boolean;
  detailInfo: {
    username: string;
    create_time: number;
    email: string;
    admin: boolean;
    premium: boolean;
  };
}

const initialState: userState = {
  username: "",
  access_token: "",
  isLogin: false,
  registerPupup: false,
  loginPupup: false,
  detailInfo: {
    username: "",
    create_time: 0,
    email: "",
    admin: false,
    premium: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserInfo: (state, payload) => {
      state.isLogin = true;
      state.username = payload.payload[0];
      state.access_token = payload.payload[1];
      return;
    },
    changeRegisterPupup: (state) => {
      state.registerPupup = !state.registerPupup;
    },
    changeLoginPupup: (state) => {
      state.loginPupup = !state.loginPupup;
    },
    loginExpiration: (state) => {
      state.isLogin = false;
      state.username = "";
      state.access_token = "";
    },
    saveDetailInfo: (state, payload) => {
      state.detailInfo.username = payload.payload[0];
      state.detailInfo.create_time = payload.payload[1];
      state.detailInfo.email = payload.payload[2];
      state.detailInfo.admin = payload.payload[3] === 1 ? true : false;
      state.detailInfo.premium = payload.payload[4] === 1 ? true : false;
    },
  },
});

export const {
  saveUserInfo,
  changeRegisterPupup,
  loginExpiration,
  changeLoginPupup,
  saveDetailInfo,
} = userSlice.actions;

export const selectUsername = (state: RootState) => state.user.username;
export const selectIsLogin = (state: RootState) => state.user.isLogin;
export const selectAccess_token = (state: RootState) => state.user.access_token;

export const selectDeatilInfo = (state: RootState) => state.user.detailInfo;

export default userSlice.reducer;
