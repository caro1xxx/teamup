import { nanoid } from "nanoid";
import React from "react";
import styled from "styled-components";
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
        <div className="login">登录</div>
        <div className="signup">注册</div>
      </User>
    </Wrap>
  );
};

export default NavBar;
