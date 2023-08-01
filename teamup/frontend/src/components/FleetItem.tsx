import { nanoid } from "nanoid";
import React, { useState } from "react";
import styled from "styled-components";

const Wrap = styled.div`
  width: 80%;
  margin: 2vh 1vw;
  .top {
    display: flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;

    .title {
      cursor: pointer;
      user-select: none;
      font-size: 1vw;
    }
    .type {
      font-size: 0.7vw;
      cursor: pointer;
      user-select: none;
      font-weight: lighter;
      color: #d1d1d1;
    }
  }
`;

const UserAvator = styled.div`
  margin: 1vh 0px;
  position: relative;
`;

type Props = {
  fleet: {
    title: string;
    type: string;
    sum: number;
    key: string;
    user: {
      avator: string;
      key: string;
      itemKey: string;
    }[];
  }[];
};

const FleetItem = (props: Props) => {
  return (
    <Wrap>
      <div className="top">
        <div className="title">{props.fleet[0].title}</div>
        <div style={{ flex: 1 }}></div>
        <div className="type">{props.fleet[0].type}</div>
      </div>
      <UserAvator>
        {props.fleet[0].user.map((item, index) => {
          return <AvatorItem sum={10} avator={item.avator} index={index} />;
        })}
      </UserAvator>
    </Wrap>
  );
};

export default FleetItem;

const Item = styled.div<{ $index: number }>`
  height: 4vh;
  width: 4vh;
  position: ${(props) => (props.$index === 0 ? null : "absolute")};
  top: ${(props) => (props.$index === 0 ? null : "0px")};
  left: ${(props) =>
    props.$index === 0 ? null : `calc(3.5vh * ${props.$index})`};
  backdrop-filter: ${(props) => (props.$index === 3 ? "blur(4px)" : null)};
  -webkit-backdrop-filter: ${(props) =>
    props.$index === 3 ? "blur(4px)" : null};
  border-radius: 4vh;
  border: 0.5vh solid black;
  text-align: center;
  line-height: 4vh;
  color: white;
  font-size: 1vw;
  cursor: pointer;
  user-select: none;
`;

type ItemProps = { avator: string; index: number; sum: number };

const AvatorItem = (props: ItemProps) => {
  return (
    <Item style={{ background: props.avator }} $index={props.index}>
      {props.index === 3 ? props.sum + "+" : <></>}
    </Item>
  );
};
