import React from "react";
import { InputOptionsWrap } from "../../style/chat";
import { Dropdown } from "antd";
import AiteIcon from "../../assets/images/aite.webp";

type Props = {
  // @ts-ignore
  users: ItemType[] | undefined;
  currentSelectUser: string;
};

const ChatInputOptions = (props: Props) => {
  return (
    <InputOptionsWrap>
      <Dropdown
        placement="topLeft"
        trigger={["click"]}
        menu={{
          items: props.users,
          selectable: true,
        }}
      >
        <div className="options_back">
          <img width={20} src={AiteIcon} alt="aite" />
          {props.currentSelectUser}
        </div>
      </Dropdown>
    </InputOptionsWrap>
  );
};

export default ChatInputOptions;
