import React, { useState } from "react";
import styled from "styled-components";
import NavBarItem from "./components/NavBarItem";
import User from "./components/User";
import Search from "./components/Search";
import FleetItem from "./components/FleetItem";
import { nanoid } from "nanoid";
type Props = {};

const Wrap = styled.div`
  display: flex;
`;

const NavBar = styled.div`
  width: calc(5vw);
  background-color: #0d0d14;
  height: calc(100vh);
`;

const List = styled.div`
  width: calc(15vw);
  background-color: #1a1a1d;
  height: calc(100vh);
`;

const Chat = styled.div`
  flex: 1;
  background-color: #0e0e10;
  height: calc(100vh);
`;

const Other = styled.div`
  width: calc(20vw);
  background-color: #1a1a1d;
  height: calc(100vh);
`;

const Logo = styled.div`
  margin: 2vh 0px;
  text-align: center;
`;

const App = (props: Props) => {
  const [NavBarList, _] = useState([
    { name: nanoid(), key: nanoid() },
    { name: nanoid(), key: nanoid() },
    { name: nanoid(), key: nanoid() },
    { name: nanoid(), key: nanoid() },
  ]);

  const [Fleet, setFleet] = useState([
    {
      title: "bezos1的车队",
      type: "Spotify 30天",
      sum: 15,
      key: nanoid(),
      user: [
        { avator: "green", key: nanoid(), itemKey: nanoid() },
        { avator: "red", key: nanoid(), itemKey: nanoid() },
        { avator: "blue", key: nanoid(), itemKey: nanoid() },
        { avator: "#e989f2", key: nanoid(), itemKey: nanoid() },
      ],
    },
    {
      title: "jack的车队",
      type: "Spotify 30天",
      sum: 15,
      key: nanoid(),
      user: [
        { avator: "green", key: nanoid(), itemKey: nanoid() },
        { avator: "red", key: nanoid(), itemKey: nanoid() },
        { avator: "blue", key: nanoid(), itemKey: nanoid() },
        { avator: "#e989f2", key: nanoid(), itemKey: nanoid() },
      ],
    },
    {
      title: "tom的车队",
      type: "Spotify 30天",
      sum: 15,
      key: nanoid(),
      user: [
        { avator: "green", key: nanoid(), itemKey: nanoid() },
        { avator: "red", key: nanoid(), itemKey: nanoid() },
        { avator: "blue", key: nanoid(), itemKey: nanoid() },
        { avator: "#e989f2", key: nanoid(), itemKey: nanoid() },
      ],
    },
    {
      title: "lucy的车队",
      type: "Spotify 30天",
      sum: 15,
      key: nanoid(),
      user: [
        { avator: "green", key: nanoid(), itemKey: nanoid() },
        { avator: "red", key: nanoid(), itemKey: nanoid() },
        { avator: "blue", key: nanoid(), itemKey: nanoid() },
        { avator: "#e989f2", key: nanoid(), itemKey: nanoid() },
      ],
    },
    {
      title: "jnro的车队",
      type: "Spotify 30天",
      sum: 15,
      key: nanoid(),
      user: [
        { avator: "green", key: nanoid(), itemKey: nanoid() },
        { avator: "red", key: nanoid(), itemKey: nanoid() },
        { avator: "blue", key: nanoid(), itemKey: nanoid() },
        { avator: "#e989f2", key: nanoid(), itemKey: nanoid() },
      ],
    },
  ]);

  return (
    <Wrap>
      <NavBar>
        <Logo>TEAMUP</Logo>
        {NavBarList.map((item) => {
          return <NavBarItem />;
        })}
      </NavBar>
      <List>
        <User />
        <Search />
        <div style={{ height: "20px" }}></div>
        {Fleet.map((item) => {
          return <FleetItem fleet={[{ ...item }]} />;
        })}
      </List>
      <Chat></Chat>
      <Other></Other>
    </Wrap>
  );
};

export default App;
