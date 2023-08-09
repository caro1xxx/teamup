import React, { useEffect } from "react";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import Introduce from "./components/Introduce";
import TabBar from "./components/TabBar";
import Room from "./components/Room";
import AccountHandle from "./components/AccountHandle";

import { useAppSelector, useAppDispatch } from "./redux/hooks";

import { message } from "antd";
type Props = {};

const Wrap = styled.div`
  width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const App = (props: Props) => {
  const notifyMessage = useAppSelector(
    (state) => state.notify.message
  ) as string;
  const notifyAdditive = useAppSelector(
    (state) => state.notify.additive
  ) as number;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notifyAdditive === 0) return;
    message.warning(notifyMessage);
  }, [notifyAdditive]);

  return (
    <>
      <Wrap>
        <NavBar />
        <Introduce />
        <TabBar />
        <Room />
      </Wrap>

      <AccountHandle />
    </>
  );
};

export default App;
