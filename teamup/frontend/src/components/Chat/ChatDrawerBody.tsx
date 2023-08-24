import React from "react";
import styled from "styled-components";
import { MsgItemWrap, PleaseWrap } from "../../style/chat";
import { parseStampTime } from "../../utils/tools";
import { nanoid } from "nanoid";
import { useAppDispatch } from "../../redux/hooks";
import LoadingMoreIcon from "../../assets/images/loadingmore.png";
import {
  changeLoginPupup,
  changeRegisterPupup,
} from "../../redux/modules/userSlice";
type Props = {
  message: any;
  isLogin: boolean;
  isCloseWs: boolean;
  reconnect: () => void;
};

const BodyWrap = styled.div`
  height: calc(100vh - 350px - 50px);
  overflow: scroll;
  .closehint {
    margin: 20px 0px;
    display: flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    .body {
      cursor: pointer;
      user-select: none;
      height: 40px;
      padding: 0px 10px;
      display: inline-flex;
      vertical-align: top;
      justify-content: center;
      align-items: center;

      border-radius: 5px;
      border: solid 1px #0f7949;
      background-color: #0a2a1c;
    }
    .body:hover {
      border: solid 1px #0b5634;
      background-color: #071a12;
    }
  }
`;
const ChatDrawerBody = (props: Props) => {
  const moveChatBottom = () => {
    setTimeout(() => {
      let ponit = document.getElementById("point");
      if (ponit === null) return;
      ponit.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 1000);
  };

  React.useEffect(() => {
    moveChatBottom();
    return () => {};
  }, [props]);

  return (
    <>
      {props.isLogin ? (
        <BodyWrap>
          {props.message.map((item: any) => {
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
          {props.isCloseWs ? (
            <div className="closehint">
              <div className="body" onClick={props.reconnect}>
                长时间未操作,已断开连接点击重连
                <img src={LoadingMoreIcon} width={20} alt="load" />
              </div>
            </div>
          ) : null}
          <div id="point"></div>
        </BodyWrap>
      ) : (
        <PleaseLogin />
      )}
    </>
  );
};

export default ChatDrawerBody;

const MessageItem = (props: {
  user: string;
  message: string;
  who: number;
  create_time: number;
}) => {
  return (
    <MsgItemWrap $who={props.who}>
      <div className="username">{props.who === 2 ? props.user : ""}</div>
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

const fakeMessageList = [
  { who: 1, key: nanoid(), message: "你好" },
  { who: 1, key: nanoid(), message: "欢迎 bezosz 进入房间" },
  {
    who: 1,
    key: nanoid(),
    message: "include them or remove the dependency array",
  },
  { who: 1, key: nanoid(), message: "你好你好" },
  { who: 1, key: nanoid(), message: "你好你好你好你好你好" },
  { who: 1, key: nanoid(), message: "ok" },
  { who: 1, key: nanoid(), message: "teamup" },
  { who: 1, key: nanoid(), message: "你好" },
  { who: 1, key: nanoid(), message: "welcome" },
];

const PleaseLogin = () => {
  const dispatch = useAppDispatch();

  const openLogin = () => {
    dispatch(changeLoginPupup());
  };
  const openRegister = () => {
    dispatch(changeRegisterPupup());
  };

  return (
    <PleaseWrap>
      {fakeMessageList.map((item) => {
        return (
          <div key={item.key} className="fake">
            <div>{item.message}</div>
          </div>
        );
      })}
      <div className="mask">
        请先<span onClick={openLogin}>👉「登录」</span>或
        <span onClick={openRegister}>「注册」👈</span>
        后查看聊天记录
      </div>
    </PleaseWrap>
  );
};
