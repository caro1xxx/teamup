import React from "react";
import { InputWrap } from "../../style/chat";
import { MessageOutlined } from "@ant-design/icons";
import "../../style/custome_antd.css";
import { Input } from "antd";
import { useMouse } from "ahooks";

type Props = {
  send: (value: string) => void;
  isLogin: boolean;
  closeWs: () => void;
  isCloseWs: boolean;
};

const { Search } = Input;

const ChatMessageInput = (props: Props) => {
  const mouse = useMouse();
  const [inputContent, setInputContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const noActionTimer = React.useRef<NodeJS.Timer | null>();
  // 发送消息
  const send = () => {
    if (isLoading) return;
    setIsLoading(true);
    props.send(inputContent);
    setInputContent("");
    setTimeout(() => setIsLoading(false), 500);
  };

  React.useEffect(() => {
    if (props.isCloseWs) return;
    // @ts-ignore
    clearTimeout(noActionTimer.current);
    noActionTimer.current = setTimeout(() => {
      props.closeWs();
    }, 1000 * 60 * 3);
    return () => {
      if (noActionTimer.current) {
        clearTimeout(noActionTimer.current);
      }
    };
  }, [mouse.clientX]);

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
