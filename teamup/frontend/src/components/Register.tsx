import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "../assets/images/close.webp";
import { Input, Button } from "antd";
import { fecther } from "../utils/fecther";
import { useAppDispatch } from "../redux/hooks";
import { changeMessage } from "../redux/modules/notifySlice";
import { changeRegisterPupup, saveUserInfo } from "../redux/modules/userSlice";
import { UserInfo } from "../types/methodTypes";
import {
  Validator,
  stopEventPropagation,
  randomHexColor,
} from "../utils/tools";
import { batchSetStorage, getStorage } from "../utils/localstorage";
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
    margin-bottom: 20px;
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

const { Search } = Input;
let timerFlag = 60;

const Register = (props: Props) => {
  const [AccountInfo, setAccountInfo] = useState({
    username: "",
    password: "",
    email: "",
    code: "",
    isLoading: 0,
  });

  const [CodeTimer, setCodeTimer] = useState({ timer: 60 });

  const dispatch = useAppDispatch();

  const sendMailCode = async (email: string) => {
    // 校验
    if (timerFlag !== 60) return;
    let validator = new Validator();
    validator.add(email, "checkEmailFormat", "邮箱格式错误");
    let validatorResult = validator.start();
    if (validatorResult) {
      dispatch(changeMessage([validatorResult, false]));
      return;
    }

    // 改变状态
    setAccountInfo({ ...AccountInfo, isLoading: 1 });
    let result = await fecther(`sendcode?email=${email}`, "", "get");
    if (result.code !== 200)
      setTimeout(() => setAccountInfo({ ...AccountInfo, isLoading: 0 }), 500);
    else
      setTimeout(() => setAccountInfo({ ...AccountInfo, isLoading: 2 }), 500);
    dispatch(
      changeMessage([result.message, result.code === 200 ? true : false])
    );

    // 启动定时器
    if (result.code !== 200) return;
    let timer = setInterval(() => {
      if (timerFlag <= 0) {
        timerFlag = 60;
        setAccountInfo({ ...AccountInfo, isLoading: 0 });
        setCodeTimer({ timer: 60 });
        clearInterval(timer);
      } else {
        setCodeTimer({ timer: (timerFlag -= 1) });
      }
    }, 1000);
  };

  const createUser = async (userInfo: UserInfo): Promise<void> => {
    let validator = new Validator();
    validator.add(userInfo.username, "isNonEmpty", "输入用户名");
    validator.add(userInfo.password, "isNonEmpty", "输入密码");
    validator.add(userInfo.email, "isNonEmpty", "输入邮箱");
    validator.add(userInfo.code, "isNonEmpty", "输入验证码");
    validator.add(userInfo.username, "minLength", "用户名长度需>=5", 5);
    validator.add(userInfo.password, "minLength", "密码长度需>=8", 8);
    validator.add(userInfo.email, "checkEmailFormat", "邮箱格式错误");
    let validatorResult = validator.start();
    if (validatorResult) {
      dispatch(changeMessage([validatorResult, false]));
    } else {
      const avator_color = randomHexColor();
      let result = await fecther(
        "register/",
        {
          data: {
            ...userInfo,
            password: md5(userInfo.password),
            avator_color,
            temporary_orders: getStorage("temporary_order_record_account")
              ? JSON.parse(getStorage("temporary_order_record_account"))
              : "None",
          },
        },
        "post"
      );
      if (result.code === 200) {
        localStorage.removeItem("temporary_order_record_account");
        batchSetStorage({
          access_token: result.access_token,
          avator_color,
        });
        dispatch(
          saveUserInfo([userInfo.username, result.access_token, avator_color])
        );
        closeRegister();

        dispatch(changeMessage([`欢迎回来,${userInfo.username}`, false]));
        window.location.reload();
        return;
      }
      dispatch(changeMessage([result.message, false]));
    }
  };

  const closeRegister = () => {
    dispatch(changeRegisterPupup());
  };

  const onKeyDownEnter = (event: any) => {
    if (event.code !== "Enter") return;
    createUser({ ...AccountInfo });
  };

  return (
    <Wrap onClick={closeRegister}>
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
            onClick={closeRegister}
            alt="close"
          />
          <div className="title">Hola!</div>
          <div className="deatil">
            就等你上车了!创建一个属于自己的Teamup账号吧.
          </div>
          <Form>
            <Input
              autoFocus
              value={AccountInfo.username}
              onChange={(e) =>
                setAccountInfo({ ...AccountInfo, username: e.target.value })
              }
              showCount
              maxLength={16}
              placeholder="用户名"
              className="input"
            />
            <Input.Password
              value={AccountInfo.password}
              onChange={(e) =>
                setAccountInfo({ ...AccountInfo, password: e.target.value })
              }
              placeholder="密码"
              className="input"
            />
            <Search
              value={AccountInfo.email}
              onChange={(e) =>
                setAccountInfo({ ...AccountInfo, email: e.target.value })
              }
              placeholder="注册邮箱"
              size="large"
              enterButton={
                AccountInfo.isLoading === 1
                  ? ""
                  : AccountInfo.isLoading === 2
                  ? CodeTimer.timer + "s"
                  : "获取验证码"
              }
              className={AccountInfo.isLoading === 0 ? "code" : "code search"}
              onSearch={(value) => sendMailCode(value)}
              loading={AccountInfo.isLoading === 1 ? true : false}
            />
            <div
              style={{
                fontSize: "10px",
                marginTop: "5px",
                color: "#cecece",
              }}
            >
              · 如未收到验证码邮件,请查看邮件垃圾箱
            </div>
            <Input
              value={AccountInfo.code}
              onChange={(e) =>
                setAccountInfo({ ...AccountInfo, code: e.target.value })
              }
              style={{ marginTop: "20px" }}
              placeholder="邮箱验证码"
              className="input"
            />
            <Button
              className="input btn"
              type="primary"
              onClick={() => createUser({ ...AccountInfo })}
            >
              创建账号
            </Button>
            <div style={{ fontSize: "12px", textAlign: "center" }}>
              注册账户表示同意
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

export default Register;
