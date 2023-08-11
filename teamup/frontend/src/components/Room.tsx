import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PeopleItem from "./PeopleItem";
import { useAppDispatch } from "../redux/hooks";
import ShareIcon from "../assets/images/share.png";
import WarningIcon from "../assets/images/warning.png";
import FavoriteIcon from "../assets/images/favorite.png";
import { Skeleton } from "antd";
import {
  randomNumber,
  generatorEmtryArray,
  randomHexColor,
} from "../utils/tools";
import { useLocation } from "react-router-dom";
import { fecther } from "../utils/fecther";
import { changeMessage } from "../redux/modules/notifySlice";
type Props = {};

const Wrap = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

const loadingEmtryArray = generatorEmtryArray(randomNumber());

const Room = (props: Props) => {
  const [RoomList, setRoomList] = useState([
    {
      roomName: "",
      key: nanoid(),
      roomId: "",
      online: 0,
      teammate: [{ username: "", key: nanoid(), avatorColor: "pink" }],
      surplus: 0,
      description: "",
      pk: "",
    },
  ]);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const getTypeOfRooms = async (type: string) => {
    let result = await fecther(`room/?type=${type.split("/")[1]}`, {}, "get");
    if (result.code !== 200) dispatch(changeMessage([result.message, false]));
    else {
      let roomList: any = [];
      result.data.map((item: any, index: number) => {
        roomList.push({
          pk: item.pk,
          roomName: item.name,
          key: nanoid(),
          roomId: item.uuid,
          online: 28,
          teammate: [],
          surplus: item.surplus,
          description: textPhase(item.description),
        });
        item.users.map((item: any) => {
          roomList[index].teammate.push({
            username: item,
            key: nanoid(),
            avatorColor: randomHexColor(),
          });
        });
      });
      setRoomList(roomList);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const textPhase = (text: string) => {
    return text.substring(0, 100) + "...";
  };

  useEffect(() => {
    getTypeOfRooms(location.pathname);
  }, [location.pathname]);

  return (
    <Wrap>
      {isLoading ? (
        <>
          {loadingEmtryArray?.map((item) => {
            return <LoadingItem key={item.key} />;
          })}
        </>
      ) : (
        <>
          {RoomList.map((item) => {
            return <Item room={item} key={item.key} />;
          })}
        </>
      )}
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
    height: 120px;
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
    .loading_avator {
      margin-right: 10px;
    }
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

      <div className="description">
        <div>{props.room.description}</div>
      </div>
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

const LoadingItem = () => {
  return (
    <ItemWrap>
      <div className="title">
        <Skeleton.Input active block />
      </div>
      <div className="description">
        <Skeleton active />
      </div>
      <div className="people_list">
        <Skeleton.Avatar active className="loading_avator" />
        <Skeleton.Avatar active className="loading_avator" />
        <Skeleton.Avatar active className="loading_avator" />
        <Skeleton.Avatar active className="loading_avator" />
        <Skeleton.Avatar active className="loading_avator" />
      </div>
    </ItemWrap>
  );
};
