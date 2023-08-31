import React from "react";
import styled from "styled-components";
import StoreIcon from "../assets/images/store.webp";
import { Link } from "react-router-dom";
type Props = {};

const Wrap = styled.div`
  height: 50px;
  display: flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  text-decoration: double;
  text-decoration: underline;
  font-style: italic;
  cursor: pointer;
  user-select: none;
  color: #fff;
  span {
    color: #05b665;
  }
  .link:focus {
    text-decoration: none;
  }
`;

const Store = (props: Props) => {
  return (
    <Wrap>
      <img width={25} src={StoreIcon} alt="store" />
      <div>
        <Link className="link" key={"123123123"} to={"/store"}>
          <span style={{ color: "#fff" }}>官方店铺,</span>
          <span>无需组队</span>
          <span style={{ color: "#fff" }}>拼车即可</span>
          <span>享受组队最低价</span>
          <span style={{ color: "#fff" }}>👉点我直达👈</span>
        </Link>
      </div>
    </Wrap>
  );
};

export default Store;
