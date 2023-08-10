import React from "react";
import styled from "styled-components";
import VipFalseIcon from "../../assets/images/vip_false.png";
import VipIcon from "../../assets/images/vip.png";
import { parseStampTime } from "../../utils/tools";
import { clearStorage } from "../../utils/localstorage";
import { Divider, Button } from "antd";

type Props = {
  detailInfo: {
    username: string;
    create_time: number;
    email: string;
    admin: boolean;
    premium: boolean;
  };
};

const Content = styled.div`
  margin-top: 10px;
  .row_data {
    display: flex;
    color: #808080ce;
    img {
      width: 30px;
    }
    .data {
      flex: 1;
      display: flex;
      vertical-align: top;
      justify-content: end;
    }
  }
`;

const logOut = () => {
  clearStorage();
  window.location.reload();
};

const Info = (props: Props) => {
  return (
    <Content>
      <Divider>{props.detailInfo.username}</Divider>
      <div className="row_data">
        <div>邮箱:</div>
        <div className="data">{props.detailInfo.email}</div>
      </div>
      <div className="row_data">
        <div>注册时间:</div>
        <div className="data">
          {parseStampTime(props.detailInfo.create_time)}
        </div>
      </div>
      <div className="row_data">
        <img
          src={props.detailInfo.premium ? VipIcon : VipFalseIcon}
          alt="vip"
        />
      </div>
      <Button block danger onClick={logOut}>
        退出登录
      </Button>
    </Content>
  );
};

export default Info;
