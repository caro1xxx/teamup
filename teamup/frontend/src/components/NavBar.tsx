import { nanoid } from "nanoid";
import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Popover, Segmented } from "antd";
import UserIcon from "../assets/images/user.png";
import Base from "./User/Base";
import Info from "./User/Info";
import Favorite from "./User/Favorite";
import Order from "./User/Order";
import Settings from "./User/Settings";
import {
  changeRegisterPupup,
  changeLoginPupup,
} from "../redux/modules/userSlice";
import { InfoState, FavoriteState } from "../types/componentsPropsTypes";
import { fecther } from "../utils/fecther";
type Props = {};

const Wrap = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  background-color: #1b1c1e;
  display: flex;
  padding: 10px 0px;
  height: 60px;
`;
const Logo = styled.div`
  color: white;
  display: flex;
  user-select: none;
  cursor: pointer;
  .T {
    color: #05b665;
    font-family: "Helvetica";
    font-size: 35px;
    font-weight: bolder;
    font-style: italic;
    display: inline-flex;
    align-items: center;
  }
  .eamup {
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
`;
const Options = styled.div`
  display: flex;
  font-size: 15px;
  font-weight: lighter;
  width: 40%;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  color: #cccccccc;
  font-family: "Helvetica";
  div {
    user-select: none;
    cursor: pointer;
    margin: 0px 20px;
  }
`;
const User = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
  font-family: "Helvetica";
  font-size: 15px;
  align-items: center;
  .login {
    user-select: none;
    cursor: pointer;
    width: 80px;
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
  }
  .signup {
    height: 40px;
    user-select: none;
    cursor: pointer;
    background-color: #0ab666;
    border-radius: 5px;
    width: 80px;
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
  }
`;
const OptionLis = [
  { title: "首页", key: nanoid() },
  { title: "大厅", key: nanoid() },
  { title: "帮助", key: nanoid() },
  { title: "联系", key: nanoid() },
  { title: "日志", key: nanoid() },
];

const NavBar = (props: Props) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username) as string;
  const isLogin = useAppSelector((state) => state.user.isLogin) as boolean;
  const avator_color = useAppSelector(
    (state) => state.user.avator_color
  ) as string;
  const avator_color_backup = useAppSelector(
    (state) => state.user.detailInfo.avator_color
  ) as string;

  const openRegister = () => {
    dispatch(changeRegisterPupup());
  };

  const openLogin = () => {
    dispatch(changeLoginPupup());
  };

  return (
    <Wrap>
      <Logo>
        <div className="T">T</div>
        <div className="eamup">eamup</div>
      </Logo>
      <Options>
        {OptionLis.map((item) => {
          return <div key={item.key}>{item.title}</div>;
        })}
      </Options>
      <User>
        {isLogin ? (
          <UserInfo
            username={username}
            avator_color={
              avator_color === "green" ? avator_color_backup : avator_color
            }
          />
        ) : (
          <>
            <div className="login" onClick={openLogin}>
              登录
            </div>
            <div className="signup" onClick={openRegister}>
              注册
            </div>
          </>
        )}
      </User>
    </Wrap>
  );
};

export default NavBar;

type UserProps = {
  username: string;
  avator_color: string;
};

const UserWrap = styled.div`
  display: flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  .avator {
    margin-right: 10px;
    height: 35px;
    width: 35px;
    border-radius: 25px;
    /* background-color: green; */
    user-select: none;
    cursor: pointer;
    line-height: 35px;
    text-align: center;
    font-weight: bolder;
    font-size: 18px;
  }
  .username {
    user-select: none;
    cursor: pointer;
    font-weight: lighter;
    font-size: 18px;
  }
`;

const UserInfo = (props: UserProps) => {
  return (
    <Popover
      placement="bottom"
      title={<AccountInfo />}
      color={"#313131"}
      content={<BottomContent />}
      trigger="click"
    >
      <UserWrap>
        <div className="avator" style={{ backgroundColor: props.avator_color }}>
          {props.username.charAt(0)}
        </div>
        <div className="username">{props.username}</div>
      </UserWrap>
    </Popover>
  );
};

const Account = styled.div`
  color: white;
  .top {
    display: flex;
    vertical-align: top;
    align-items: center;

    img {
      margin-right: 10px;
    }
  }
`;

const AccountInfo = () => {
  return (
    <Account>
      <div className="top">
        <img src={UserIcon} alt="user" width={20} height={20} />
        用户信息
      </div>
    </Account>
  );
};

const BottomContent = () => {
  const [currentBarValue, setCurrentBarValue] = useState<string | number>(
    "基础"
  );
  const [message, setMessage] = React.useState<InfoState[] | []>([]);
  const detailInfo = useAppSelector((state) => state.user.detailInfo);
  const [FavoriteList, setFavoriteList] = React.useState<FavoriteState[] | []>(
    []
  );
  const getMessage = async () => {
    let result = await fecther("notify/", {}, "get");
    if (result.code !== 200) return;
    let msg: any[] = [];
    result.data.forEach((item: any) => {
      msg.push({
        content: item.fields.content,
        sendTime: item.fields.create_time,
        send: item.fields.send_user[0].username,
        key: nanoid(),
      });
    });
    setMessage(msg);
  };

  const getFavorite = async () => {
    let result = await fecther("favorites/", {}, "get");
    if (result.code !== 200) return;
    let data: FavoriteState[] = [];
    result.data.forEach((item: FavoriteState) => {
      data.push({ ...item, key: nanoid() });
    });
    setFavoriteList(data);
  };

  React.useEffect(() => {
    getMessage();
    getFavorite();
  }, []);

  return (
    <Account>
      <Segmented
        options={["基础", "消息", "订单", "收藏", "设置"]}
        value={currentBarValue}
        onChange={setCurrentBarValue}
      />
      {currentBarValue === "基础" ? (
        <Base detailInfo={detailInfo} />
      ) : currentBarValue === "消息" ? (
        <Info message={message} />
      ) : currentBarValue === "订单" ? (
        <Order />
      ) : currentBarValue === "收藏" ? (
        <Favorite favoriteList={FavoriteList} />
      ) : (
        <Settings />
      )}
    </Account>
  );
};
