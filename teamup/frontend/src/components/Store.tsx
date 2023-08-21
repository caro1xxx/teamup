import React from "react";
import styled from "styled-components";
import StoreIcon from "../assets/images/store.png";
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
  span {
    color: #05b665;
  }
`;

const Store = (props: Props) => {
  return (
    <Wrap>
      <img width={25} src={StoreIcon} alt="store" />
      <div>
        官方店铺,<span>无需组队</span>拼车即可<span>享受组队价</span>
        👉点我直达👈
      </div>
    </Wrap>
  );
};

export default Store;
