import { nanoid } from "nanoid";
import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Popover, Segmented } from "antd";
import UserIcon from "../assets/images/user.webp";
import HotIcon from "../assets/images/hot.webp";
import Base from "./User/Base";
import Info from "./User/Info";
import Favorite from "./User/Favorite";
import Order from "./User/Order";
import Settings from "./User/Settings";
import { Link } from "react-router-dom";
import {
  changeRegisterPupup,
  changeLoginPupup,
} from "../redux/modules/userSlice";
import {
  InfoState,
  FavoriteState,
  OrderState,
  OrderFieldsState,
} from "../types/componentsPropsTypes";
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
  .link_item {
    user-select: none;
    cursor: pointer;
    margin: 0px 20px;
    text-decoration: none;
    color: #cccccccc;
    position: relative;
  }
  .link_item:hover {
    color: #fff;
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
  { title: "车站", key: nanoid(), path: "/home/netflix" },
  { title: "官方店铺", key: nanoid(), path: "/store" },
  { title: "活动", key: nanoid(), path: "/discount" },
  { title: "帮助", key: nanoid(), path: "/support" },
  { title: "更新日志", key: nanoid(), path: "/logs" },
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
          return (
            <Link className="link_item" key={item.key} to={item.path}>
              {item.title}
              {item.title === "官方店铺" ? (
                <img
                  style={{ position: "absolute", width: "15px", top: "-10px" }}
                  src={HotIcon}
                  alt="hot"
                />
              ) : null}
            </Link>
          );
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
  const [order, setOrder] = React.useState<OrderFieldsState[] | []>([]);
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

  const getOrder = async () => {
    let result = await fecther("payedorder/", {}, "get");
    if (result.code !== 200) return;
    let data: OrderFieldsState[] = [];
    result.data.forEach((item: OrderState) => {
      data.push({
        key: nanoid(),
        username: item.fields.username,
        password: item.fields.password,
        seat_code: item.fields.seat_code,
        user_buy_expire_time: item.fields.user_buy_expire_time,
      });
    });
    setOrder(data);
  };

  React.useEffect(() => {
    getMessage();
    getFavorite();
    getOrder();
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
        <Order order={order} />
      ) : currentBarValue === "收藏" ? (
        <Favorite favoriteList={FavoriteList} />
      ) : (
        <Settings />
      )}
    </Account>
  );
};
