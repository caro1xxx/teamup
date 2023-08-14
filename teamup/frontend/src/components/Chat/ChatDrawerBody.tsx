import React from "react";
import styled from "styled-components";
import { MsgItemWrap } from "../../style/chat";
import { parseStampTime } from "../../utils/tools";
type Props = {
  message: any;
};

const BodyWrap = styled.div`
  height: calc(100vh - 200px - 50px);
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
