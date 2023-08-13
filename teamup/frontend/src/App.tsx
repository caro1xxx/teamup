import React, { useEffect } from "react";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import Introduce from "./components/Introduce";
import TabBar from "./components/TabBar";
import Room from "./components/Room";
import Category from "./components/Category";
import { getStorage, setStorage, clearStorage } from "./utils/localstorage";
import {
  saveUserInfo,
  loginExpiration,
  changeRegisterPupup,
  saveDetailInfo,
} from "./redux/modules/userSlice";
import Register from "./components/Register";
import Login from "./components/Login";

import { useAppSelector, useAppDispatch } from "./redux/hooks";

import { message, ConfigProvider, theme } from "antd";
import { fecther } from "./utils/fecther";
import { BrowserRouter, Route, Routes } from "react-router-dom";

type Props = {};

const MemoizedRoom = React.memo(Room);

const Wrap = styled.div`
  width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const App = (props: Props) => {
  const dispatch = useAppDispatch();
  const notifyMessage = useAppSelector(
    (state) => state.notify.message
  ) as string;
  const notifyAdditive = useAppSelector(
    (state) => state.notify.additive
  ) as number;
  const notifyflag = useAppSelector((state) => state.notify.flag) as boolean;
  const isregisterPupup = useAppSelector(
    (state) => state.user.registerPupup
  ) as boolean;
  const isLoginPupup = useAppSelector(
    (state) => state.user.loginPupup
  ) as boolean;

  const getUserInfo = async (token: string) => {
    dispatch(saveUserInfo(["", ""]));
    let result = await fecther(`login/?access_token=${token}`, {}, "get");
    if (result.code !== 200) {
      dispatch(loginExpiration());
    } else if (result.code === 409) {
      clearStorage();
      dispatch(changeRegisterPupup());
    } else {
      dispatch(saveUserInfo([result.username, result.access_token]));
      dispatch(
        saveDetailInfo([
          result.username,
          result.create_time,
          result.email,
          result.admin,
          result.premium,
        ])
      );
      setStorage("access_token", result.access_token);
    }
  };

  useEffect(() => {
    if (notifyAdditive === 0) return;
    message[notifyflag ? "success" : "warning"](notifyMessage);
  }, [notifyAdditive, notifyflag, notifyMessage]);

  useEffect(() => {
    if (!getStorage("db_version")) setStorage("db_version", 1);
    if (!getStorage("access_token")) return;
    getUserInfo(getStorage("access_token")); // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Wrap>
          <NavBar />
          <Introduce />
          <Routes>
            <Route path="/" element={<TabBar />} />
            <Route path="/netflix" element={<TabBar />} />
            <Route path="/disney" element={<TabBar />} />
            <Route path="/hulu" element={<TabBar />} />
            <Route path="/spotify" element={<TabBar />} />
            <Route path="/nintendo" element={<TabBar />} />
            <Route path="/youtube" element={<TabBar />} />
            <Route path="/pornhub" element={<TabBar />} />
          </Routes>
          <Category />
          <MemoizedRoom />
        </Wrap>
        {isregisterPupup ? <Register /> : null}
        {isLoginPupup ? <Login /> : null}
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
