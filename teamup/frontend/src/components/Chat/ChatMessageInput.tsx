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
  send: (value: string, aite: string) => void;
  pk: number;
  isLogin: boolean;
  username: string;
};

const { Search } = Input;

const ChatMessageInput = (props: Props) => {
  const [inputContent, setInputContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [items, setUsers] = React.useState<MenuProps["items"]>([
    { key: "", label: <div></div> },
  ]);
  const [currentSelectUser, setcurrentSelectUser] = React.useState("");

  const send = () => {
    if (isLoading) return;
    setIsLoading(true);
    props.send(inputContent, currentSelectUser ? currentSelectUser : "None");
    setInputContent("");
    setcurrentSelectUser("");
    setTimeout(() => setIsLoading(false), 500);
  };

  // 获取@列表
  const getUsers = React.useCallback(async () => {
    if (items && items[0] && items[0].key !== "") return;
    let result = await fecther(`handler/?room_pk=${props.pk}`, {}, "get");
    if (result.code !== 200) return;
    const data = [{ key: "", label: "" }];
    if (result.data.length === 0) {
      data.push({
        key: nanoid(),
        // @ts-ignore
        label: <div>暂无</div>,
      });
    } else {
      result.data.forEach((item: string) => {
        if (item !== props.username) {
          data.push({
            key: nanoid(),
            // @ts-ignore
            label: (
              <div onClick={() => setcurrentSelectUser(item)}>
                {"@" + item}
                {item === result.leader ? (
                  <span style={{ marginLeft: "10px", color: "#05b665" }}>
                    队长
                  </span>
                ) : null}
              </div>
            ),
          });
        }
      });
    }
    data.splice(0, 1);
    setUsers([...data]);
  }, [props.pk]);

  const MemoInputOptions = React.memo(InputOptions);

  React.useEffect(() => {
    getUsers();
  }, [props.pk]);

  return (
    <InputWrap>
      <MemoInputOptions
        items={items}
        getUsers={getUsers}
        currentSelectUser={currentSelectUser}
      />
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

const InputOptions = (props: {
  items: MenuProps["items"];
  getUsers: () => Promise<void>;
  currentSelectUser: string;
}) => {
  return (
    <InputOptionsWrap>
      <Dropdown
        placement="topLeft"
        trigger={["click"]}
        menu={{
          items: props.items,
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
