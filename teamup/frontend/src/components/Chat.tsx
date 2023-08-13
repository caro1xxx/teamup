import React, { useEffect, useState, useReducer, useRef } from "react";
import styled from "styled-components";
import FleetBackIcon from "../assets/images/fleet_back.png";
import { fecther } from "../utils/fecther";
import { nanoid } from "nanoid";
import {
  generatorEmtryArray,
  randomHexColor,
  parseStampTime,
} from "../utils/tools";
import { setStorage, getStorage } from "../utils/localstorage";
import { createOrOpenDB, addItem, getAllItems } from "../utils/chatDB";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { changeMessage } from "../redux/modules/notifySlice";
import { Button } from "antd";
import "../style/custome_antd.css";

const RoomDrawerWrap = styled.div`
  display: flex;
  font-size: 20px;
  align-items: center;

  .id {
    color: #05b665;
    font-weight: lighter;
    font-size: 16px;
  }
`;

export const ChatDrawerTitle = (props: {
  roomName: string;
  roomId: string;
}) => {
  return (
    <RoomDrawerWrap>
      <div>{props.roomName}</div>
      <div style={{ flex: 1 }}></div>
      <div className="id">#{props.roomId}</div>
    </RoomDrawerWrap>
  );
};

const TeamWrap = styled.div`
  height: 50px;
  display: flex;
  .auditorium {
    height: 35px;
    width: 35px;
    margin-right: 14px;
    cursor: pointer;
    img {
      user-select: none;
      -webkit-user-drag: none;
    }
  }
  .people {
    cursor: pointer;
    height: 32px;
    width: 32px;
    border: 4px solid #05b665;
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    > div {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      font-weight: bold;
      border-radius: 20px;
    }
  }
  .join {
    height: 39px;
    border-radius: 3px;
    text-align: center;
    font-weight: bolder;
    user-select: none;
    cursor: pointer;
  }
`;

export const ChatDrawerTeam = (props: { pk: number }) => {
  const [TeamInfo, setTeamInfo] = useState({
    max_quorum: 0,
    surplus: 0,
    surplusEmtryArray: [{ key: "" }],
    join_users: [{ key: "", name: "" }],
    isJoin: false,
  });
  const isLogin = useAppSelector((state) => state.user.isLogin) as boolean;
  const username = useAppSelector((state) => state.user.username) as string;
  const [isLoading, setisLoading] = useState({ join: false });
  const dispatch = useAppDispatch();
  // 获取车队信息
  const getTeamInfo = async (pk: number) => {
    let result = await fecther(`team?pk=${pk}`, {}, "get");
    if (result.code !== 200) return;
    let oldValue = { ...TeamInfo };
    oldValue.max_quorum = result.data.max_quorum;
    oldValue.surplus = result.data.surplus;
    oldValue.surplusEmtryArray = generatorEmtryArray(result.data.surplus);
    oldValue.join_users = [];
    result.data.users.forEach((item: string) => {
      oldValue.join_users.push({ key: nanoid(), name: item });
      if (item === username) oldValue.isJoin = true;
    });
    setTeamInfo(oldValue);
    result = null;
    // @ts-ignore
    oldValue = null;
  };

  const checkIslogin = () => {
    if (!isLogin) dispatch(changeMessage([`请先登录或注册`, false]));
    else joinTeam();
  };

  const joinTeam = async () => {
    setisLoading({ ...isLoading, join: true });
    let result = await fecther(
      "team/",
      { room_id: props.pk, username },
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
        oldValue.join_users.push({ key: nanoid(), name: username });
      }
      setTeamInfo({ ...oldValue, isJoin: TeamInfo.isJoin ? false : true });
      // @ts-ignore
      oldValue = null;
    }
    dispatch(
      changeMessage([result.message, result.code === 200 ? true : false])
    );
    result = null;
    setTimeout(() => setisLoading({ ...isLoading, join: false }), 1000);
  };

  useEffect(() => {
    getTeamInfo(props.pk); // eslint-disable-next-line
  }, []);

  return (
    <TeamWrap>
      {TeamInfo.join_users.map((item) => {
        return (
          <div className="people" key={item.key}>
            <div style={{ backgroundColor: randomHexColor() }}>
              {item.name.charAt(0)}
            </div>
          </div>
        );
      })}
      {TeamInfo.surplusEmtryArray.map((item) => {
        return (
          <div className="auditorium" key={item.key}>
            <img src={FleetBackIcon} alt="fleet" />
          </div>
        );
      })}
      <div style={{ flex: 1 }}></div>
      <Button
        className={
          TeamInfo.isJoin || TeamInfo.surplus === 0
            ? "btn_error join"
            : "btn join "
        }
        loading={isLoading.join}
        onClick={checkIslogin}
      >
        {TeamInfo.surplus === 0 && TeamInfo.isJoin === false
          ? "满员"
          : TeamInfo.isJoin
          ? "退出"
          : " 加入"}
      </Button>
    </TeamWrap>
  );
};

const HintWrap = styled.div`
  margin: 20px 0px;
`;

export const ChatHint = () => {
  return <HintWrap>请文明发言，遵守法律法规</HintWrap>;
};

// @ts-ignore
const messageReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return [...state, action.payload];
    default:
      return state;
  }
};

export const ChatDrawerBody = (props: { pk: number; roomName: string }) => {
  const [message, dispatchMessage] = useReducer(messageReducer, []);
  const username = useAppSelector((state) => state.user.username) as string;
  const access_token = useAppSelector(
    (state) => state.user.access_token
  ) as string;
  const dbIdx = useRef(1);

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
    if (!getStorage(props.roomName)) {
      setStorage(props.roomName, 1);
      const newDBVersion = parseInt(getStorage("db_version")) + 3;
      setStorage("db_version", newDBVersion);
      const db = await createOrOpenDB(props.roomName, newDBVersion);
    } else {
      const db = await createOrOpenDB(
        props.roomName,
        parseInt(getStorage("db_version"))
      );
    }

    dispatchMessage({ type: "ADD_MESSAGE", payload: newItem });

    // 不保存system发送的消息
    if (jsonMessage.username === "system") return;
    // 添加到数据库
    addItem("teamup_chat_record_db", props.roomName, getStorage("db_version"), {
      ...newItem,
      id: dbIdx.current++,
    });
  };

  const initMessageRecord = async () => {
    if (getStorage(props.roomName)) {
      let result = await getAllItems(
        "teamup_chat_record_db",
        props.roomName,
        getStorage("db_version")
      );
      result.map((item) =>
        dispatchMessage({ type: "ADD_MESSAGE", payload: item })
      );
      dbIdx.current = result[result.length - 1].id + 2;
    }
  };

  useEffect(() => {
    const chatSocketRef = new WebSocket(
      `ws://192.168.31.69/ws/room/${props.pk}/${access_token}/`
    );
    chatSocketRef.onopen = function () {
      initMessageRecord();
      chatSocketRef.onmessage = (event) => receptionMessage(event.data);
    };

    return () => {
      chatSocketRef.close();
    };
  }, []);

  return (
    <div>
      {message.map((item: any) => {
        return (
          <MessageItem
            key={item.key}
            user={item.user}
            message={item.message}
            who={item.who}
            create_time={item.create_time}
          />
        );
      })}
    </div>
  );
};

const MsgItemWrap = styled.div<{ $who: number }>`
  position: relative;
  display: flex;
  vertical-align: top;
  justify-content: ${(props) =>
    props.$who === 0 ? "center" : props.$who === 1 ? "end" : "start"};
  align-items: center;
  .system {
    color: #636363;
    font-size: 12px;
    margin: 10px 0px;
  }
  .other {
    margin: 20px 0px;
    padding: 10px;
    color: #000;
    border-radius: 3px;
    max-width: 300px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    background-color: #05b665;
  }
  .self {
    margin: 20px 0px;
    background-color: #fff;
    padding: 10px;
    color: #000;
    border-radius: 3px;
    max-width: 300px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  .time {
    position: absolute;
    right: ${(props) => (props.$who === 1 ? "0px" : "")};
    left: ${(props) => (props.$who === 2 ? "0px" : "")};
    bottom: 0px;
    font-size: 10px;
    color: white;
    font-weight: lighter;
  }
`;

const MessageItem = (props: {
  user: string;
  message: string;
  who: number;
  create_time: number;
}) => {
  return (
    <MsgItemWrap $who={props.who}>
      <div
        className={
          props.who === 0 ? "system" : props.who === 1 ? "self" : "other"
        }
      >
        {props.message}
        {props.who !== 0 ? (
          <div className="time">{parseStampTime(props.create_time)}</div>
        ) : null}
      </div>
    </MsgItemWrap>
  );
};
