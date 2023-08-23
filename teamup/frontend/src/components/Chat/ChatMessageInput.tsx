import React from "react";
import { InputWrap } from "../../style/chat";
import { MessageOutlined } from "@ant-design/icons";
import "../../style/custome_antd.css";
import { Input } from "antd";

type Props = {
  send: (value: string) => void;
  isLogin: boolean;
};

const { Search } = Input;

const ChatMessageInput = (props: Props) => {
  const [inputContent, setInputContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  // 发送消息
  const send = () => {
    if (isLoading) return;
    setIsLoading(true);
    props.send(inputContent);
    setInputContent("");
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <InputWrap>
      <Search
        value={inputContent}
        onChange={(e) => setInputContent(e.target.value)}
        size="large"
        className="cutomer"
        disabled={props.isLogin ? false : true}
        placeholder={props.isLogin ? "赶快一起畅所欲言吧!" : "请先登录或注册"}
        enterButton={<MessageOutlined />}
        onSearch={send}
        loading={isLoading}
      />
    </InputWrap>
  );
};

export default ChatMessageInput;
