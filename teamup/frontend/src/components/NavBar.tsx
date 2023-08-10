import { nanoid } from "nanoid";
import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  changeRegisterPupup,
  changeLoginPupup,
} from "../redux/modules/userSlice";
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
          <UserInfo username={username} />
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
    background-color: green;
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
    <UserWrap>
      <div className="avator">{props.username.charAt(0)}</div>
      <div className="username">{props.username}</div>
    </UserWrap>
  );
};
