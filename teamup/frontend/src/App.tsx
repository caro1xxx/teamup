import React, { useEffect } from "react";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import Bottom from "./components/Bottom";
import CookieAsk from "./components/CookieAsk";
import CheckTemporaryOrder from "./components/CheckTemporaryOrder";
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
import Manage from "./pages/Manage";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import BackNetIcon from "./assets/images/undraw_netflix_q00o.webp";
import BackNetIcon2 from "./assets/images/back_maks2.webp";
import { message, ConfigProvider, theme } from "antd";
import { fecther } from "./utils/fecther";
import { BrowserRouter, Route, Routes } from "react-router-dom";

type Props = {};

const Wrap = styled.div`
  width: 1200px;
  margin: 0 auto;
  position: relative;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-color: #1b1c1e68;
    backdrop-filter: blur(1px);
  }
  .backwarp {
    position: relative;
  }
  .back {
    bottom: -50px;
    left: 150px;
    right: 150px;
    z-index: 0;
    position: fixed;
  }
  .back2 {
    bottom: -200px;
    right: 200px;
    z-index: 0;
    position: fixed;
  }
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
  const [showAgreeCookie, setshowAgreeCookie] = React.useState(false);
  const [isTemporaryOrder, setisTemporaryOrder] = React.useState(false);
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
    ) {
      setIsActivity(true);
    }
    if (!getStorage("db_version")) setStorage("db_version", 1);
    if (!getStorage("agreeCookiePotoce")) setshowAgreeCookie(true);
    if (!getStorage("access_token")) {
      getStorage("temporary_order_record_account") && setisTemporaryOrder(true);
      return;
    } else {
      getUserInfo(getStorage("access_token")); // eslint-disable-next-line
    }
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
            <Route path="/manage" element={<Manage />} />
          </Routes>
          <Bottom />
          <div className="back">
            <div className="backwarp">
              <img src={BackNetIcon} alt="image" />
              <img className="back2" src={BackNetIcon2} alt="image" />
              <div className="mask"></div>
            </div>
          </div>
          {showAgreeCookie ? <CookieAsk close={setshowAgreeCookie} /> : null}
          {isTemporaryOrder ? <CheckTemporaryOrder /> : null}
        </Wrap>
        {isregisterPupup ? <Register /> : null}
        {isLoginPupup ? <Login /> : null}
        {isActivity ? <Activity close={closeAcitvity} /> : null}
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
