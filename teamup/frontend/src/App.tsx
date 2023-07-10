import React, { useState } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";
import OptionsNavBarItem from "./components/OptionsNavBarItem";
import Logo from "./components/Logo";
import UserBaseInfo from "./components/UserBaseInfo";
import Fleet from "./components/Fleet";
const AppWrap = styled.div`
  display: flex;
`;

const OptionsWrap = styled.div`
  width: 90px;
  height: calc(100vh);
`;

const FleetStyle = styled.div`
  background-color: #1b1a1d;
  height: calc(100vh);
`;

const ChatStyle = styled.div`
  width: 60%;
  height: calc(100vh);
  background-color: #0e0e10;
`;

type Props = {};

const App = (props: Props) => {
  const [optionsList, setOptionsList] = useState({
    options: [
      {
        name: "hulu",
        key: nanoid(),
        img: require("./assets/images/hulu.png"),
        background: "#fff",
      },
      {
        name: "netfilx",
        key: nanoid(),
        img: require("./assets/images/netflix.png"),
        background: "#000",
      },
      {
        name: "spotify",
        key: nanoid(),
        img: require("./assets/images/spotify.png"),
        background: "#1dd75f",
      },
      {
        name: "youtube",
        key: nanoid(),
        img: require("./assets/images/youtube.png"),
        background: "#fff",
      },
      {
        name: "Disney",
        key: nanoid(),
        img: require("./assets/images/Disney.png"),
        background: "#ff8dd9",
      },
      {
        name: "nintendo",
        key: nanoid(),
        img: require("./assets/images/nintendo.png"),
        background: "#ffffff",
      },
      {
        name: "Pornhub",
        key: nanoid(),
        img: require("./assets/images/Pornhub.png"),
        background: "#fff",
      },
    ],
  });

  const [fleetList, setFleetsList] = useState({
    data: [
      {
        id: "1",
        key: nanoid(),
        name: "Jack的Netflix车队",
        status: [
          {
            number: 1,
            id: nanoid(),
            avator: require("./assets/avator/guest.png"),
          },
          "unknow",
          "unknow",
          "unknow",
          "unknow",
        ],
      },
      {
        id: "1",
        key: nanoid(),
        name: "Jack的Netflix车队",
        status: [
          {
            number: 1,
            id: nanoid(),
            avator: require("./assets/avator/guest.png"),
          },
          {
            number: 1,
            id: nanoid(),
            avator: require("./assets/avator/guest.png"),
          },
          "unknow",
          "unknow",
          "unknow",
        ],
      },
    ],
  });

  return (
    <AppWrap>
      <OptionsWrap>
        <Logo />
        {optionsList.options.map((item) => {
          return <OptionsNavBarItem key={item.key} data={item} />;
        })}
      </OptionsWrap>

      <FleetStyle>
        <UserBaseInfo />
        {fleetList.data.map((item) => {
          return <Fleet key={item.key} data={item} />;
        })}
      </FleetStyle>
      <ChatStyle>1</ChatStyle>
    </AppWrap>
  );
};

export default App;
