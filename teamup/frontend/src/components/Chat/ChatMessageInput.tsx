import React from "react";
import { InputWrap, InputOptionsWrap } from "../../style/chat";
import { MessageOutlined } from "@ant-design/icons";
import "../../style/custome_antd.css";
import AiteIcon from "../../assets/images/aite.png";
import { Input, Dropdown } from "antd";
import { fecther } from "../../utils/fecther";
import type { MenuProps } from "antd";
import { nanoid } from "nanoid";
type Props = {
  send: (value: string) => void;
  pk: number;
  isLogin: boolean;
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

  const MemoInputOptions = React.memo(InputOptions);

  return (
    <InputWrap>
      <MemoInputOptions pk={props.pk} />
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

const InputOptions = (props: { pk: number }) => {
  const [items, setUsers] = React.useState<MenuProps["items"]>([
    { key: "", label: <div></div> },
  ]);
  const [currentSelectUser, setcurrentSelectUser] = React.useState("");

  const getUsers = React.useCallback(async () => {
    if (items && items[0] && items[0].key !== "") return;
    let result = await fecther(`handler/?room_pk=${props.pk}`, {}, "get");
    if (result.code !== 200) return;
    const data = [{ key: "", label: "" }];
    result.data.forEach((item: string) => {
      data.push({
        key: nanoid(),
        // @ts-ignore
        label: (
          <div onClick={() => setcurrentSelectUser(item)}>{"@" + item}</div>
        ),
      });
    });
    data.splice(0, 1);
    setUsers([...data]);
  }, [props.pk]);

  return (
    <InputOptionsWrap>
      <Dropdown
        placement="topLeft"
        trigger={["click"]}
        menu={{
          items,
          selectable: true,
        }}
      >
        <div className="options_back" onClick={getUsers}>
          <img width={20} src={AiteIcon} alt="aite" />
          {currentSelectUser}
        </div>
      </Dropdown>
    </InputOptionsWrap>
  );
};
