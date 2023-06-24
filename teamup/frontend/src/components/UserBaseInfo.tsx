import React from "react";
import styled from "styled-components";
import GuestAvator from "../assets/avator/guest.png";
const Wrap = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #1d1c21;
`;

const Avator = styled.div`
  padding: 0px 10px;
  img {
    height: 40px;
    width: 40px;
  }
`;

const BaseInfo = styled.div`
  .username {
    font-size: 13px;
    padding-bottom: 5px;
  }
  .email {
    background-color: #3d3f5882;
    color: #5765f2;
    font-size: 13px;
    padding: 0px 5px;
    border-radius: 10px;
  }
`;

type Props = {};

const UserBaseInfo = (props: Props) => {
  return (
    <Wrap>
      <Avator>
        <img src={GuestAvator} alt="" />
      </Avator>
      <BaseInfo>
        <div className="username">游客102390</div>
        <div className="email">caro1xxx@gmail.com</div>
      </BaseInfo>
    </Wrap>
  );
};

export default UserBaseInfo;
