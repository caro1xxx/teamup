import React from "react";
import { Input, Select, Typography } from "antd";
import { CreateRoomWrap } from "../../style/mod";

type Props = {};

const { Link } = Typography;
const { TextArea } = Input;

const typeData = ["Netflix", "Hulu"];

const dayData = {
  Netflix: ["一个月", "一季度", "半年", "一年"],
  Hulu: ["一个月", "一季度", "半年", "一年"],
};

const accountTypeData = {
  Netflix: ["平台邮箱账号", "自备邮箱账号"],
  Hulu: ["平台邮箱账号", "自备邮箱账号"],
};

type dayName = keyof typeof dayData;
type accountName = keyof typeof accountTypeData;

const CreateRoom = (props: Props) => {
  const [cities, setCities] = React.useState(dayData[typeData[0] as dayName]);
  const [account, setAccount] = React.useState(
    accountTypeData[typeData[0] as accountName]
  );

  const handleProvinceChange = (value: dayName) => {
    setCities(dayData[value]);
    setAccount(accountTypeData[value]);
  };

  return (
    <CreateRoomWrap>
      <div className="title">
        <div>
          <Input showCount maxLength={16} placeholder="车队名称" />
        </div>
        <div>
          <Input disabled />
        </div>
      </div>
      <div className="type">
        <div className="types">
          <Select
            style={{ width: "100%" }}
            onChange={handleProvinceChange}
            options={typeData.map((province) => ({
              label: province,
              value: province,
            }))}
          />
        </div>
        <div className="time">
          <Select
            style={{ width: "100%" }}
            options={cities.map((city) => ({ label: city, value: city }))}
          />
        </div>
        <div className="account">
          <Select
            style={{ width: "100%" }}
            options={account.map((city) => ({
              label: city,
              value: city,
            }))}
          />
        </div>
        <div className="price">
          <Input value={"18.8元/人"} disabled placeholder="最低价格" />
        </div>
      </div>
      <div className="detail">
        <TextArea rows={4} placeholder="车队描述" showCount maxLength={64} />
      </div>
      <Link className="link" href="https://ant.design" target="_blank">
        https://www.teamup.com/shareroom?id=123123 (车队分享链接)
      </Link>
      <div className="create">创建</div>
    </CreateRoomWrap>
  );
};

export default CreateRoom;
