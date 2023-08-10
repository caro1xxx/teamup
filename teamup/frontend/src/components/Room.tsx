import { nanoid } from "nanoid";
import React, { useState } from "react";
import styled from "styled-components";
import PeopleItem from "./PeopleItem";
import ShareIcon from "../assets/images/share.png";
import WarningIcon from "../assets/images/warning.png";
import FavoriteIcon from "../assets/images/favorite.png";
type Props = {};

const Wrap = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

const Room = (props: Props) => {
  const [RoomList] = useState([
    {
      roomName: "bezos的车队",
      key: nanoid(),
      roomId: "92NKVB",
      online: 28,
      teammate: [
        { username: "bezos", key: nanoid(), avatorColor: "pink" },
        { username: "bezos", key: nanoid(), avatorColor: "green" },
        { username: "bezos", key: nanoid(), avatorColor: "blue" },
        { username: "bezos", key: nanoid(), avatorColor: "pink" },
        { username: "bezos", key: nanoid(), avatorColor: "pink" },
      ],
      surplus: 0,
      description:
        "欢迎来到我们的网站！我们为您带来了全新的组队拼团体验，让您轻松畅享 Netflix、YouTube、爱奇艺、迪士尼等众多流媒体平台的会员特权。无论您钟爱国际大片",
    },
  ]);
  return (
    <Wrap>
      {RoomList.map((item) => {
        return <Item room={item} key={item.key} />;
      })}
    </Wrap>
  );
};

export default Room;

type ItemProps = {
  room: {
    roomName: string;
    key: string;
    roomId: string;
    online: number;
    teammate: {
      username: string;
      key: string;
      avatorColor: string;
    }[];
    surplus: number;
    description: string;
  };
};

const ItemWrap = styled.div`
  cursor: pointer;
  user-select: none;
  background-color: #232323;
  border-radius: 5px;
  position: relative;
  height: 320px;
  .options {
    position: absolute;
    bottom: 30px;
    left: 30px;
    display: flex;
    img {
      width: 15px;
      height: 15px;
      margin-right: 10px;
    }
    div {
      font-size: 12px;
      flex: 1;
      color: #d5d5d5;
    }
  }
  .title {
    font-size: 15px;
    margin: 40px 30px 10px 30px;
    font-weight: bolder;
    display: flex;
    .roomid {
      color: #05b665;
      font-weight: lighter;
      font-size: 10px;
      flex: 1;
      display: inline-flex;
      justify-content: end;
      align-items: center;
    }
  }
  .description {
    font-size: 12px;
    line-height: 20px;
    margin: 20px 30px;
    font-weight: lighter;
    text-indent: 2em;
    color: #d5d5d5d1;
  }
  .people_list {
    display: flex;
    margin: 0px 30px;
    position: relative;
  }
`;

const Item = (props: ItemProps) => {
  return (
    <ItemWrap>
      <div className="title">
        <div>{props.room.roomName}</div>
        <div className="roomid">#{props.room.roomId}</div>
      </div>
      <div className="options">
        <img src={ShareIcon} alt="share" />
        <img src={WarningIcon} alt="warning" />
        <img src={FavoriteIcon} alt="favorite" />
        <div>{props.room.online}人在线</div>
      </div>
      <div className="description">{props.room.description}</div>
      <div className="people_list">
        {props.room.teammate.map((item, index) => {
          return (
            <PeopleItem
              key={item.key}
              people={item}
              index={index}
              surplus={props.room.surplus}
            />
          );
        })}
      </div>
    </ItemWrap>
  );
};
