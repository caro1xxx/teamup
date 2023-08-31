import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "../assets/images/close.webp";
import { useAppDispatch } from "../redux/hooks";
import { changeLoginPupup, saveUserInfo } from "../redux/modules/userSlice";
import { changeMessage } from "../redux/modules/notifySlice";
import { Input, Button } from "antd";
import { LoginUserInfo } from "../types/methodTypes";
import { Validator, stopEventPropagation } from "../utils/tools";
import { fecther } from "../utils/fecther";
import { batchSetStorage } from "../utils/localstorage";
import { changeRegisterPupup } from "../redux/modules/userSlice";
import md5 from "md5";
type Props = {};

const Wrap = styled.div`
  position: fixed;
  background-color: #3a3a3a30;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  width: 360px;
  padding: 20px;
  background-size: cover;
  background-position: center;
  height: 460px;
  position: relative;
  border-radius: 5px;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #414141a5;
    backdrop-filter: blur(1.5px);
    border-radius: 5px;
  }
  .title {
    color: white;
    font-size: 20px;
    padding-bottom: 20px;
    font-size: 30px;
    font-weight: bolder;
    text-align: center;
    margin-top: 50px;
  }
  .deatil {
    text-align: center;
    font-size: 13px;
  }
  .close {
    cursor: pointer;
    width: 30px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

const Form = styled.div`
  padding: 20px 10%;
  .input {
    width: 100%;
    margin-bottom: 30px;
    height: 40px;
  }
  .code .ant-input-search-button {
    background-color: #05b665;
    color: #fff;
    border-color: #05b665;
  }
  .code .ant-input-search-button:hover {
    background-color: #2a9263ac;
    border-color: #2a9263ac;
  }
  .btn {
    background-color: #05b665;
    color: #fff;
    border-color: #05b665;
  }
  .btn:hover {
    background-color: #2a9263ac !important;
    border-color: #2a9263ac !important;
  }
  .search .ant-input-search-button {
    width: 50px;
  }
`;
const Cookie = styled.div`
  margin: 20px 0px;
  background-color: #c0f8df97;
  border: 1px solid #05b665;
  border-radius: 5px;
  height: 50px;
  font-size: 12px;
  padding: 10px;
`;

const Login = (props: Props) => {
  const dispatch = useAppDispatch();
  const closeLogin = () => {
    dispatch(changeLoginPupup());
  };

  const [userinfo, setUserInfo] = useState({
    username: "",
    password: "",
    isLoading: false,
  });

  const login = async (userInfo: LoginUserInfo): Promise<void> => {
    let validator = new Validator();
    validator.add(userInfo.username, "isNonEmpty", "输入用户名");
    validator.add(userInfo.password, "isNonEmpty", "输入密码");
    validator.add(userInfo.username, "minLength", "用户名长度需>=5", 5);
    validator.add(userInfo.password, "minLength", "密码长度需>=8", 8);
    let validatorResult = validator.start();
    if (validatorResult) {
      dispatch(changeMessage([validatorResult, false]));
    } else {
      setUserInfo({ ...userinfo, isLoading: true });
      let result = await fecther(
        "login/",
        {
          data: {
            username: userInfo.username,
            password: md5(userInfo.password),
          },
        },
        "post"
      );
      if (result.code === 200) {
        batchSetStorage({
          access_token: result.access_token,
          avator_color: result.avator_color,
        });
        dispatch(
          saveUserInfo([
            userInfo.username,
            result.access_token,
            result.avator_color,
          ])
        );
        window.location.reload();
        return;
      }
    }
  };

  const onKeyDownEnter = (event: any) => {
    if (event.code !== "Enter") return;
    login(userinfo);
  };

  return (
    <Wrap onClick={closeLogin}>
      <Body
        onClick={(e) => stopEventPropagation(e)}
        onKeyDown={onKeyDownEnter}
        style={{
          backgroundImage:
            'url("' + require("../assets/images/logback.webp") + '")',
        }}
      >
        <div className="mask">
          <img
            className="close"
            src={CloseIcon}
            onClick={closeLogin}
            alt="close"
          />
          <div className="title">欢迎回来!</div>
          <Form>
            <Input
              value={userinfo.username}
              autoFocus
              onChange={(e) =>
                setUserInfo({ ...userinfo, username: e.target.value })
              }
              showCount
              maxLength={16}
              placeholder="用户名"
              className="input"
            />
            <Input.Password
              onChange={(e) =>
                setUserInfo({ ...userinfo, password: e.target.value })
              }
              value={userinfo.password}
              placeholder="密码"
              className="input"
            />
            <Button
              className="input btn"
              type="primary"
              onClick={() => login(userinfo)}
              loading={userinfo.isLoading}
            >
              登录
            </Button>
            <div style={{ fontSize: "12px", textAlign: "center" }}>
              没有账号？
              <span
                style={{ color: "#05b665", cursor: "pointer" }}
                onClick={() => {
                  closeLogin();
                  dispatch(changeRegisterPupup());
                }}
              >
                我要注册
              </span>
            </div>
            <Cookie>
              登录表示 "接受所有 cookie"，即表示您同意 Temaup
              可以在您的设备上存储 cookie,并根据我们的 Cookie 政策披露信息
            </Cookie>
            <div style={{ fontSize: "12px", textAlign: "center" }}>
              登录即表示同意
              <a
                style={{ textDecoration: "none", color: "#05b665" }}
                href="https://www.leichina.org/cei/2935724/index.html"
              >
                服务条款协议
              </a>
            </div>
          </Form>
        </div>
      </Body>
    </Wrap>
  );
};

export default Login;
