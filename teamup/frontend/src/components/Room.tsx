import React, { useEffect } from "react";
import { Wrap, ItemWrap } from "../style/room";
import PeopleItem from "./PeopleItem";
import ChatDrawerTitle from "./Chat/ChatDrawerTitle";
import ChatDrawerTeam from "./Chat/ChatDrawerTeam";
import ChatHint from "./Chat/ChatHint";
import ChatDrawerBody from "./Chat/ChatDrawerBody";
import ChatMessageInput from "./Chat/ChatMessageInput";

// assets
import ShareIcon from "../assets/images/share.png";
import WarningIcon from "../assets/images/warning.png";
import FavoriteIcon from "../assets/images/favorite.png";

// tools
import { nanoid } from "nanoid";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useLocation } from "react-router-dom";
import { fecther } from "../utils/fecther";
import { changeMessage } from "../redux/modules/notifySlice";
import {
  randomNumber,
  generatorEmtryArray,
  textPhase,
  checkVaildate,
} from "../utils/tools";
import { Skeleton, Drawer } from "antd";
import { getStorage, setStorage } from "../utils/localstorage";
import { messageReducer } from "../utils/reducers";
import { createOrOpenDB, addItem, getAllItems } from "../utils/chatDB";

// types
import { RoomInfo } from "../types/paramsTypes";
import {
  RoomItemProps,
  TeamInfoProps,
  UserToRoomInfoProps,
} from "../types/componentsPropsTypes";

const loadingEmtryArray = generatorEmtryArray(randomNumber());

const Room = () => {
  /*tools */
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isLogin = useAppSelector((state) => state.user.isLogin) as boolean;
  const username = useAppSelector((state) => state.user.username) as string;
  const msg = useAppSelector((state) => state.chat.message) as string;
  const flag = useAppSelector((state) => state.chat.flag) as number;
  const access_token = useAppSelector(
    (state) => state.user.access_token
  ) as string;

  /*state */
  const [RoomList, setRoomList] = React.useState([
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
  const [TeamInfo, setTeamInfo] = React.useState<TeamInfoProps>({
    max_quorum: 0,
    surplus: 0,
    surplusEmtryArray: [{ key: "" }],
    join_users: [{ key: "", name: "", avatorColor: "" }],
    isJoin: false,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToRoomInfo, setUserToRoomInfo] =
    React.useState<UserToRoomInfoProps>({
      isDrawer: false,
      roomName: "",
      roomId: "",
      pk: 0,
      key: "",
    });
  const [message, dispatchMessage] = React.useReducer(messageReducer, []);
  const websocketRef = React.useRef<WebSocket | null>(null);
  const dbIdx = React.useRef(1);

  /*request */
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
            username: item.user,
            key: nanoid(),
            avatorColor: item.avator_color,
          });
        });
      });
      setRoomList(roomList);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  // 获取车队信息
  const getTeamInfo = async (pk: number) => {
    let result = await fecther(`team/?pk=${pk}`, {}, "get");
    if (result.code !== 200) return;
    let oldValue: TeamInfoProps = {
      max_quorum: 0,
      surplus: 0,
      surplusEmtryArray: [{ key: "" }],
      join_users: [{ key: "", name: "", avatorColor: "" }],
      isJoin: false,
    };
    oldValue.max_quorum = result.data.max_quorum;
    oldValue.surplus = result.data.surplus;
    oldValue.surplusEmtryArray = generatorEmtryArray(result.data.surplus);
    oldValue.join_users = [];
    result.data.users.forEach((item: any) => {
      oldValue.join_users.push({
        key: nanoid(),
        name: item.username,
        avatorColor: item.avator_color,
      });
      if (item.username === username) oldValue.isJoin = true;
    });
    setTeamInfo(oldValue);
  };

  /**methods */
  // 打开房间
  const openRoom = (roomInfo: RoomInfo) => {
    const data = { ...roomInfo, isDrawer: true };
    getTeamInfo(roomInfo.pk);
    setUserToRoomInfo(data);
  };

  // 关闭房间
  const closeRoom = () => {
    if (websocketRef.current !== null) {
      websocketRef.current.close();
      websocketRef.current = null;
    }
    setUserToRoomInfo({ ...userToRoomInfo!, isDrawer: false });
  };

  // join team
  const joinTeam = async () => {
    if (!checkIslogin) {
      dispatch(changeMessage([`请先登录或注册`, false]));
      return;
    }
    let result = await fecther(
      "team/",
      { room_id: userToRoomInfo.pk, username },
      TeamInfo.isJoin ? "delete" : "post"
    );
    if (result.code === 200) {
      let oldValue = { ...TeamInfo };
      if (oldValue.isJoin) {
        for (let i = 0; i < oldValue.join_users.length; i++) {
          if (oldValue.join_users[i].name === username) {
            oldValue.join_users.splice(i, 1);
            break;
          }
        }
        TeamInfo.surplusEmtryArray.push({ key: nanoid() });
        oldValue.surplus = oldValue.surplus - 1;
      } else {
        oldValue.surplus = oldValue.surplus + 1;
        TeamInfo.surplusEmtryArray.shift();
        oldValue.join_users.push({
          key: nanoid(),
          name: username,
          avatorColor: getStorage("avator_color"),
        });
      }
      setTeamInfo({ ...oldValue, isJoin: TeamInfo.isJoin ? false : true });
    }
    dispatch(
      changeMessage([result.message, result.code === 200 ? true : false])
    );
  };

  const checkIslogin = () => {
    if (!isLogin) return false;
    return true;
  };

  // 读取历史消息
  const initMessageRecord = React.useCallback(async () => {
    if (getStorage(userToRoomInfo.roomId)) {
      let result = await getAllItems(
        "teamup_chat_record_db",
        userToRoomInfo.roomId,
        getStorage("db_version")
      );
      result.map((item) => dispatchMessage({ type: "push", payload: item }));
      if (result.length === 0) return;
      dbIdx.current = result[result.length - 1].id + 4;
      dispatchMessage({
        type: "ADD_MESSAGE",
        payload: {
          create_time: new Date().getTime() / 1000,
          id: dbIdx.current - 2,
          key: nanoid(),
          message: "以上为历史消息",
          user: "system",
          who: 0,
        },
      });
      // moveChatBottom();
    }
  }, [userToRoomInfo.pk]);

  // 接收消息处理程序 + 存入indexedb
  const receptionMessage = async (msg: any) => {
    const jsonMessage = JSON.parse(msg);
    if (jsonMessage.message === "连接成功") return;

    // 构建
    const newItem = {
      user: jsonMessage.username,
      key: nanoid(),
      message: jsonMessage.message,
      create_time: jsonMessage.create_time,
      who:
        jsonMessage.username === "system"
          ? 0
          : jsonMessage.username === username
          ? 1
          : 2,
    };
    // 判断对应存储空间和localstorage内是否标记
    if (!getStorage(userToRoomInfo.roomId)) {
      setStorage(userToRoomInfo.roomId, 1);
      const newDBVersion = parseInt(getStorage("db_version")) + 3;
      setStorage("db_version", newDBVersion);
      await createOrOpenDB(userToRoomInfo.roomId, newDBVersion);
    } else {
      await createOrOpenDB(
        userToRoomInfo.roomId,
        parseInt(getStorage("db_version"))
      );
    }

    dispatchMessage({ type: "push", payload: newItem });

    // 不保存system发送的消息
    if (jsonMessage.username === "system") return;
    // 添加到数据库
    addItem(
      "teamup_chat_record_db",
      userToRoomInfo.roomId,
      getStorage("db_version"),
      {
        ...newItem,
        id: dbIdx.current++,
      }
    );
    // moveChatBottom();
  };

  const connectRoom = React.useCallback(() => {
    if (!websocketRef.current) {
      dispatchMessage({ type: "clear" });
      websocketRef.current = new WebSocket(
        `ws://192.168.31.69/ws/room/${userToRoomInfo.pk}/${access_token}/`
      );
      websocketRef.current.onopen = function () {
        initMessageRecord();
        if (!websocketRef.current) return;
        websocketRef.current.onmessage = (event) => {
          receptionMessage(event.data);
        };
      };
    }
  }, [userToRoomInfo.pk]);

  const sendMessage = (value: string) => {
    if (!checkVaildate(value)) {
      dispatch(changeMessage([`请有效字符`, false]));
      return;
    }
    if (!websocketRef.current) return;
    websocketRef.current.send(JSON.stringify({ message: value, username }));
  };

  // listen router
  useEffect(() => {
    getTypeOfRooms(location.pathname); // eslint-disable-next-line
  }, [location.pathname]);

  // ws
  useEffect(() => {
    if (websocketRef.current === null && userToRoomInfo.pk !== 0) {
      connectRoom();
    }
    return () => {};
  }, [userToRoomInfo.pk]);

  return (
    <Wrap>
      <Drawer
        style={{ position: "relative" }}
        title={
          userToRoomInfo && (
            <ChatDrawerTitle
              roomName={userToRoomInfo.roomName}
              roomId={userToRoomInfo.roomId}
            />
          )
        }
        placement="right"
        open={userToRoomInfo && userToRoomInfo.isDrawer}
        onClose={closeRoom}
        width="500px"
      >
        <ChatDrawerTeam data={TeamInfo} join={joinTeam} />
        <ChatHint />
        <ChatDrawerBody message={message} />
        <ChatMessageInput send={sendMessage} />
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
