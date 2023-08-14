import React from "react";
import styled from "styled-components";
import { MsgItemWrap, PleaseWrap } from "../../style/chat";
import { parseStampTime } from "../../utils/tools";
import { nanoid } from "nanoid";
import { useAppDispatch } from "../../redux/hooks";
import {
  changeLoginPupup,
  changeRegisterPupup,
} from "../../redux/modules/userSlice";
type Props = {
  message: any;
  isLogin: boolean;
};

const BodyWrap = styled.div`
  height: calc(100vh - 350px - 50px);
  overflow: scroll;
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
