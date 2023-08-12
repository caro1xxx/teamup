import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PeopleItem from "./PeopleItem";
import { useAppDispatch } from "../redux/hooks";
import ShareIcon from "../assets/images/share.png";
import WarningIcon from "../assets/images/warning.png";
import FavoriteIcon from "../assets/images/favorite.png";
import { Skeleton, Drawer } from "antd";
import {
  randomNumber,
  generatorEmtryArray,
  randomHexColor,
} from "../utils/tools";
import { useLocation } from "react-router-dom";
import { fecther } from "../utils/fecther";
import { changeMessage } from "../redux/modules/notifySlice";
import { RoomInfo } from "../types/paramsTypes";
import { RoomItemProps } from "../types/componentsPropsTypes";
import { ChatDrawerTitle, ChatDrawerTeam, ChatDrawerBody } from "./Chat";

const Wrap = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

const loadingEmtryArray = generatorEmtryArray(randomNumber());

const Room = () => {
  const [RoomList, setRoomList] = useState([
    {
      roomName: "",
      key: nanoid(),
      roomId: "",
      online: 0,
      teammate: [{ username: "", key: nanoid(), avatorColor: "pink" }],
      surplus: 0,
      description: "",
      pk: 0,
    },
  ]);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [userToRoomInfo, setUserToRoomInfo] = useState({
    isDrawer: false,
    roomName: "",
    roomId: "",
    pk: 0,
    key: "",
  });

  const getTypeOfRooms = async (type: string) => {
    let result = await fecther(`room/?type=${type.split("/")[1]}`, {}, "get");
    if (result.code !== 200) dispatch(changeMessage([result.message, false]));
    else {
      setIsLoading(true);
      let roomList: any = [];
      result.data.forEach((item: any, index: number) => {
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
        item.users.forEach((item: any) => {
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

  // 打开房间
  const openRoom = (roomInfo: RoomInfo) => {
    const data = { ...roomInfo, isDrawer: !userToRoomInfo.isDrawer };
    setUserToRoomInfo(data);
  };

  // 关闭房间
  const closeRoom = () =>
    setUserToRoomInfo({ ...userToRoomInfo, isDrawer: false });

  useEffect(() => {
    getTypeOfRooms(location.pathname); // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <Wrap>
      <Drawer
        title={
          <ChatDrawerTitle
            roomName={userToRoomInfo.roomName}
            roomId={userToRoomInfo.roomId}
          />
        }
        placement="right"
        open={userToRoomInfo.isDrawer}
        onClose={closeRoom}
        width="500px"
      >
        <ChatDrawerTeam pk={userToRoomInfo.pk} />
        <ChatDrawerBody />
      </Drawer>
      {isLoading ? (
        <>
          {loadingEmtryArray?.map((item) => {
            return <LoadingItem key={item.key} />;
          })}
        </>
      ) : (
        <>
          {RoomList.map((item, index) => {
            return <Item room={item} key={item.key} open={openRoom} />;
          })}
        </>
      )}
    </Wrap>
  );
};

export default Room;

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

const Item = (props: RoomItemProps) => {
  return (
    <ItemWrap
      onClick={() =>
        props.open({
          roomName: props.room.roomName,
          key: props.room.key,
          roomId: props.room.roomId,
          pk: props.room.pk,
        })
      }
    >
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
