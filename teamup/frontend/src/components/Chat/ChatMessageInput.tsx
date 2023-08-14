import React from "react";
import { InputWrap } from "../../style/chat";
import { MessageOutlined } from "@ant-design/icons";
import "../../style/custome_antd.css";
import { Input } from "antd";
type Props = {
  send: (value: string) => void;
};

const { Search } = Input;

const ChatMessageInput = (props: Props) => {
  const [inputContent, setInputContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const send = () => {
    if (isLoading) return;
    setIsLoading(true);
    props.send(inputContent);
    setInputContent("");
    setTimeout(() => setIsLoading(false), 500);
  };

  const onKeyDownEnter = (event: any) => {
    if (event.code !== "Enter") return;
    send();
  };

  return (
    <InputWrap>
      <Search
        value={inputContent}
        onChange={(e) => setInputContent(e.target.value)}
        size="large"
        className="cutomer"
        placeholder="请输入消息"
        enterButton={<MessageOutlined />}
        onSearch={send}
        loading={isLoading}
      />
    </InputWrap>
  );
};

export default ChatMessageInput;
