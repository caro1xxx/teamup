import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FleetBackIcon from "../assets/images/fleet_back.png";
import { fecther } from "../utils/fecther";
import { nanoid } from "nanoid";
import { generatorEmtryArray, randomHexColor } from "../utils/tools";
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
  border-radius: 5px;
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

export const ChatDrawerBody = () => {
  return <div></div>;
};
