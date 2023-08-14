import React from "react";
import { RoomDrawerWrap } from "../../style/chat";
type Props = {
  roomName: string;
  roomId: string;
};

const ChatDrawerTitle = (props: Props) => {
  return (
    <RoomDrawerWrap>
      <div>{props.roomName}</div>
      <div style={{ flex: 1 }}></div>
      <div className="id">#{props.roomId}</div>
    </RoomDrawerWrap>
  );
};

export default ChatDrawerTitle;
