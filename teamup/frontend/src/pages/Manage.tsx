// @ts-nocheck
import React from "react";
import { Wrap } from "../style/manage";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { fecther } from "../utils/fecther";
import { nanoid } from "nanoid";
import { parseStampTime } from "../utils/tools";
type Props = {};

interface DataType {
  key: string;
  username: string | number;
  price: number;
  order_id: string;
  pay_state: string;
  type: string;
  create_time: string;
}

interface UserType {
  id: string;
  create_time: number;
  premium: string;
  username: string;
}

interface FlowType {
  visit_time: number;
  ip: string;
  path: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "用户编号/昵称",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "金额",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "订单号",
    dataIndex: "order_id",
    key: "order_id",
  },
  {
    title: "支付状态",
    dataIndex: "pay_state",
    key: "pay_state",
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "订单创建时间",
    dataIndex: "create_time",
    key: "create_time",
  },
];

const UserColumns: ColumnsType<UserType> = [
  {
    title: "编号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "用户编号/昵称",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "类型",
    dataIndex: "premium",
    key: "premium",
  },
  {
    title: "用户创建时间",
    dataIndex: "create_time",
    key: "create_time",
  },
];
const FlowColumns: ColumnsType<FlowType> = [
  {
    title: "ip",
    dataIndex: "ip",
    key: "ip",
  },
  {
    title: "操作",
    dataIndex: "path",
    key: "path",
  },
  {
    title: "访问时间",
    dataIndex: "visit_time",
    key: "visit_time",
  },
];

const Manage = (props: Props) => {
  const [data, setData] = React.useState<DataType[] | []>();
  const [userData, setUserData] = React.useState<DataType[] | []>();
  const [flowData, setFlowData] = React.useState<DataType[] | []>();

  const getAllOrder = async () => {
    let result = await fecther("allorder/", {}, "get");
    if (result.code === 200) {
      const parseData: DataType[] | [] = [];
      result.data.forEach((item) => {
        parseData.push({
          key: nanoid(),
          username:
            item.fields.userFlag === ""
              ? item.fields.user
              : item.fields.userFlag,
          price: item.fields.price,
          order_id: item.fields.order_id,
          pay_state: item.fields.state === 0 ? "未支付" : "已支付",
          type: item.fields.type,
          create_time: parseStampTime(item.fields.create_time),
        });
      });
      setData([...parseData]);
    }
  };

  const getAllUser = async () => {
    let result = await fecther("alluser/", {}, "get");
    if (result.code === 200) {
      const parseData: UserType[] | [] = [];
      result.data.forEach((item) => {
        parseData.push({
          key: nanoid(),
          username: item.fields.username,
          id: item.pk,
          premium: item.fields.premium === 0 ? "真实用户" : "机器人",
          create_time: parseStampTime(item.fields.create_time),
        });
      });
      setUserData([...parseData]);
    }
  };

  const getAllFlow = async () => {
    let result = await fecther("allflow/", {}, "get");
    if (result.code === 200) {
      const parseData: FlowType[] | [] = [];
      result.data.forEach((item) => {
        parseData.push({
          key: nanoid(),
          ip: item.fields.ip,
          path: item.fields.path,
          visit_time: parseStampTime(item.fields.visit_time),
        });
      });
      setFlowData([...parseData]);
    }
  };

  React.useEffect(() => {
    getAllOrder();
    getAllUser();
    getAllFlow();
  }, []);
  return (
    <Wrap>
      <div className="table">
        <div className="title">流量表</div>
        <Table columns={FlowColumns} dataSource={flowData} />
      </div>
      <div className="table">
        <div className="title">用户表</div>
        <Table columns={UserColumns} dataSource={userData} />
      </div>
      <div className="table">
        <div className="title">订单表</div>
        <Table columns={columns} dataSource={data} />
      </div>
    </Wrap>
  );
};

export default Manage;
