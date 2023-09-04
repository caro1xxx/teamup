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
  margin-top: 30px;
  span {
    color: #05b665;
  }
  .link:focus {
    text-decoration: none;
  }
  @media (max-width: 500px) {
    font-size: 15px;
    margin: 10px 10%;
    img {
      display: none;
    }
  }
`;

const Kefu = styled.div`
  text-align: center;
  span {
    color: #05b665;
    font-weight: bolder;
  }
`;

const Store = (props: Props) => {
  return (
    <>
      <Wrap>
        <img width={25} src={StoreIcon} alt="store" />
        <div>
          <Link className="link" key={"123123123"} to={"/store"}>
            <span style={{ color: "#fff" }}>官方店铺已上线,</span>
            <span>无需组队</span>
            <span style={{ color: "#fff" }}>拼车即可</span>
            <span>享受组队最低价</span>
            <span style={{ color: "#fff" }}>👉点我直达👈</span>
          </Link>
        </div>
      </Wrap>
      <Kefu>
        有任何问题都可以联系<span>客服公众号:teamupteam</span>{" "}
      </Kefu>
    </>
  );
};

export default Store;
