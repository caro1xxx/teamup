import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "../assets/images/close.png";
import SendIcon from "../assets/images/send.png";
import { Input, Button } from "antd";
import { fecther } from "../utils/fecther";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { changeMessage } from "../redux/modules/notifySlice";

type Props = {};

const Wrap = styled.div`
  position: fixed;
  background-color: #3a3a3a30;
  z-index: 10;
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
    backdrop-filter: blur(3px);
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
    width: 50px; /* 调整按钮宽度 */
  }
`;

const { Search } = Input;

const AccountHandle = (props: Props) => {
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
    setAccountInfo({ ...AccountInfo, isLoading: 1 });
    let result = await fecther(`sendcode?email=${email}`, "", "get");
    if (result.code !== 200)
      setTimeout(() => setAccountInfo({ ...AccountInfo, isLoading: 0 }), 500);
    else
      setTimeout(() => setAccountInfo({ ...AccountInfo, isLoading: 2 }), 500);
    dispatch(changeMessage(result.message));

    let timer = setInterval(() => {
      if (!CodeTimer.timer) {
        setAccountInfo({ ...AccountInfo, isLoading: 0 });
        setCodeTimer({ timer: 60 });
        CodeTimer.timer || clearInterval(timer);
      } else {
        setCodeTimer({ timer: CodeTimer.timer-- });
      }
    }, 1000);
  };

  return (
    <Wrap>
      <Body
        style={{
          backgroundImage:
            'url("' + require("../assets/images/logback.png") + '")',
        }}
      >
        <div className="mask">
          <img className="close" src={CloseIcon} alt="close" />
          <div className="title">Hola!</div>
          <div className="deatil">
            就等你上车了!创建一个属于自己的Teamup账号吧.
          </div>
          <Form>
            <Input
              showCount
              maxLength={16}
              placeholder="用户名"
              className="input"
            />
            <Input.Password placeholder="密码" className="input" />
            <Search
              placeholder="注册邮箱"
              allowClear
              size="large"
              enterButton={
                AccountInfo.isLoading === 1
                  ? ""
                  : AccountInfo.isLoading === 2
                  ? CodeTimer.timer + " s"
                  : "获取验证码"
              }
              className={AccountInfo.isLoading === 0 ? "code" : "code search"}
              onSearch={(value) => sendMailCode(value)}
              loading={AccountInfo.isLoading === 1 ? true : false}
            />
            <Input
              style={{ marginTop: "20px" }}
              placeholder="邮箱验证码"
              className="input"
            />
            <Button className="input btn" type="primary">
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

export default AccountHandle;

const Send = () => {
  return <img width={25} src={SendIcon} alt="send" />;
};
