import React from "react";
import { Input, Select, Typography, Button } from "antd";
import { CreateRoomWrap } from "../../style/mod";
import { generateRandomString } from "../../utils/tools";
import { Validator } from "../../utils/tools";
import { useAppDispatch } from "../../redux/hooks";
import { changeMessage } from "../../redux/modules/notifySlice";

type Props = {
  create: (data: {
    name: string;
    description: string;
    type: string;
    uuid: string;
    mailType: number;
    time: number;
  }) => Promise<void>;
  delay: boolean;
};

const { Link } = Typography;
const { TextArea } = Input;

const type = [{ value: "netflix", label: "Netflix" }];
const time = [
  { value: "30", label: "30天" },
  { value: "90", label: "90天" },
  { value: "半年", label: "半年" },
  { value: "一年", label: "一年" },
];
const mailType = [
  { value: "1", label: "平台邮箱账号" },
  { value: "2", label: "自备邮箱账号" },
];

const CreateRoom = (props: Props) => {
  const roomInfoRef = React.useRef({
    name: "",
    description: "",
    type: "netflix",
    uuid: generateRandomString(6),
    mailType: 1,
    time: 30,
  });

  const dispatch = useAppDispatch();

  const checkAfterCreate = () => {
    let validator = new Validator();
    let data = { ...roomInfoRef.current };
    validator.add(data.name, "isNonEmpty", "输入车队名称");
    validator.add(data.description, "isNonEmpty", "输入车队描述");
    validator.add(data.type, "isNonEmpty", "选择车队类型");
    validator.add(data.mailType, "isNonEmpty", "选择车队账号类型");
    validator.add(data.time, "isNonEmpty", "选择账号时长");
    let validatorResult = validator.start();
    if (validatorResult) {
      dispatch(changeMessage([validatorResult, false]));
    } else {
      props.create({ ...data });
    }
  };

  return (
    <CreateRoomWrap>
      <div className="title">
        <div>
          <Input
            showCount
            maxLength={16}
            placeholder="车队名称"
            onChange={(e) => (roomInfoRef.current.name = e.target.value)}
          />
        </div>
        <div>
          <Input disabled value={"#" + roomInfoRef.current.uuid} />
        </div>
      </div>
      <div className="type">
        <div className="types">
          <Select
            defaultValue="netflix"
            style={{ width: "100%" }}
            options={type}
            onChange={(option) => (roomInfoRef.current.type = option)}
          />
        </div>
        <div className="time">
          <Select
            defaultValue="30"
            style={{ width: "100%" }}
            options={time}
            onChange={(option) => (roomInfoRef.current.time = parseInt(option))}
          />
        </div>
        <div className="account">
          <Select
            defaultValue="1"
            style={{ width: "100%" }}
            options={mailType}
            onChange={(option) =>
              (roomInfoRef.current.mailType = parseInt(option))
            }
          />
        </div>
        <div className="price">
          <Input value={"18.8元/人"} disabled placeholder="最低价格" />
        </div>
      </div>
      <div className="detail">
        <TextArea
          rows={4}
          onChange={(e) => (roomInfoRef.current.description = e.target.value)}
          placeholder="车队描述"
          showCount
          maxLength={64}
        />
      </div>
      <Link className="link" href="https://ant.design" target="_blank">
        https://www.teamup.com/shareroom?id={roomInfoRef.current.uuid}{" "}
        (车队分享链接)
      </Link>
      <Button
        loading={props.delay}
        className="create"
        onClick={checkAfterCreate}
      >
        创建
      </Button>
    </CreateRoomWrap>
  );
};

export default CreateRoom;
