import React, { useEffect } from "react";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import Bottom from "./components/Bottom";
import {
  getStorage,
  setStorage,
  clearStorage,
  batchSetStorage,
} from "./utils/localstorage";
import {
  saveUserInfo,
  loginExpiration,
  changeRegisterPupup,
  saveDetailInfo,
} from "./redux/modules/userSlice";
import Register from "./components/Register";
import Login from "./components/Login";
import Station from "./pages/Station";
import Store from "./pages/Store";
import Activity from "./components/Activity";
import ActivityPage from "./pages/Activity";
import Support from "./pages/Support";
import Logs from "./pages/Logs";
import { useAppSelector, useAppDispatch } from "./redux/hooks";

import { message, ConfigProvider, theme } from "antd";
import { fecther } from "./utils/fecther";
import { BrowserRouter, Route, Routes } from "react-router-dom";

type Props = {};

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
  const [isActivity, setIsActivity] = React.useState(false);
  const getUserInfo = async (token: string) => {
    dispatch(saveUserInfo(["", "", ""]));
    let result = await fecther(`login/`, {}, "get");
    if (result.code !== 200) {
      dispatch(loginExpiration());
    } else if (result.code === 409) {
      clearStorage();
      dispatch(changeRegisterPupup());
    } else {
      dispatch(
        saveUserInfo([
          result.username,
          result.access_token,
          result.avator_color,
        ])
      );
      dispatch(
        saveDetailInfo([
          result.username,
          result.create_time,
          result.email,
          result.admin,
          result.premium,
          result.avator_color,
        ])
      );
      batchSetStorage({
        access_token: result.access_token,
        avator_color: result.avator_color,
      });
    }
  };

  const closeAcitvity = () => {
    setIsActivity(false);
    setStorage("activityNetTs", new Date().getTime() / 1000 + 60 * 60 * 8);
  };

  useEffect(() => {
    if (notifyAdditive === 0) return;
    message[notifyflag ? "success" : "warning"](notifyMessage);
  }, [notifyAdditive, notifyflag, notifyMessage]);

  useEffect(() => {
    if (!getStorage("activityNetTs")) {
      setIsActivity(true);
    } else if (
      getStorage("activityNetTs") &&
      getStorage("activityNetTs") < new Date().getTime() / 1000
    )
      setIsActivity(true);
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
          <Routes>
            <Route path="/" element={<Station />} />
            <Route path="/home/*" element={<Station />} />
            <Route path="/store" element={<Store />} />
            <Route path="/discount" element={<ActivityPage />} />
            <Route path="/support" element={<Support />} />
            <Route path="/logs" element={<Logs />} />
          </Routes>
          <Bottom />
        </Wrap>
        {isregisterPupup ? <Register /> : null}
        {isLoginPupup ? <Login /> : null}
        {isActivity ? <Activity close={closeAcitvity} /> : null}
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
