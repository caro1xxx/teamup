import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface userState {
  username: string;
  isLogin: boolean;
  access_token: string;
  registerPupup: boolean;
  loginPupup: boolean;
}

const initialState: userState = {
  username: "",
  access_token: "",
  isLogin: false,
  registerPupup: false,
  loginPupup: false,
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
  },
});

export const {
  saveUserInfo,
  changeRegisterPupup,
  loginExpiration,
  changeLoginPupup,
} = userSlice.actions;

export const selectUsername = (state: RootState) => state.user.username;
export const selectIsLogin = (state: RootState) => state.user.isLogin;
export const selectAccess_token = (state: RootState) => state.user.access_token;

export default userSlice.reducer;
