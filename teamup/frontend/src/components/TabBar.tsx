import { nanoid } from "nanoid";
import React from "react";
import styled from "styled-components";
type Props = {};

const Wrap = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  background-color: #232323;
  width: 100%;
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  .item {
    height: 50px;
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    img {
      width: 20px;
      padding: 10px;
      border-bottom: 3px solid #232323;
      user-select: none;
      cursor: pointer;
    }
  }
  .select {
    border-bottom: 3px solid #0ab666 !important;
  }
`;

const barList = [
  {
    title: "netflix",
    image: require("../assets/images/logo/netflix.png"),
    key: nanoid(),
    select: true,
  },
  {
    title: "netflix",
    image: require("../assets/images/logo/netflix.png"),
    key: nanoid(),
    select: false,
  },
  {
    title: "netflix",
    image: require("../assets/images/logo/netflix.png"),
    key: nanoid(),
    select: false,
  },
  {
    title: "netflix",
    image: require("../assets/images/logo/netflix.png"),
    key: nanoid(),
    select: false,
  },
];

const TabBar = (props: Props) => {
  return (
    <Wrap>
      {barList.map((item) => {
        return (
          <div className="item">
            <img
              src={item.image}
              className={item.select ? "select" : ""}
              alt=""
            />
          </div>
        );
      })}
    </Wrap>
  );
};

export default TabBar;
