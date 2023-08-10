import React, { useEffect } from "react";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import Introduce from "./components/Introduce";
import TabBar from "./components/TabBar";
import Room from "./components/Room";
import { getStorage, setStorage } from "./utils/localstorage";
import { saveUserInfo, loginExpiration } from "./redux/modules/userSlice";
import AccountHandle from "./components/AccountHandle";
import Login from "./components/Login";

import { useAppSelector, useAppDispatch } from "./redux/hooks";

import { message } from "antd";
import { fecther } from "./utils/fecther";
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

  const getUserInfo = async (token: string) => {
    dispatch(saveUserInfo(["", ""]));
    let result = await fecther(`login/?access_token=${token}`, {}, "get");
    if (result.code !== 200) {
      dispatch(loginExpiration());
    } else {
      dispatch(saveUserInfo([result.username, result.access_token]));
      setStorage("access_token", result.access_token);
    }
  };

  useEffect(() => {
    if (notifyAdditive === 0) return;
    message[notifyflag ? "success" : "warning"](notifyMessage);
  }, [notifyAdditive, notifyflag, notifyMessage]);

  useEffect(() => {
    if (!getStorage("access_token")) return;
    getUserInfo(getStorage("access_token"));
  }, [null]);

  return (
    <>
      <Wrap>
        <NavBar />
        <Introduce />
        <TabBar />
        <Room />
      </Wrap>

      {isregisterPupup ? <AccountHandle /> : null}
      {isLoginPupup ? <Login /> : null}
    </>
  );
};

export default App;
