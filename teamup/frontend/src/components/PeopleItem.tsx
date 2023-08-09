import React from "react";
import styled from "styled-components";
type Props = {
  people: {
    username: string;
    key: string;
    avatorColor: string;
  };
  index: number;
  surplus: number;
};

const Wrap = styled.div<{ $color: string; $index: number }>`
  background-color: ${(props) => (props.$color ? props.$color : "#fff")};
  position: ${(props) => (props.$index === 0 ? "" : "absolute")};
  top: ${(props) => (props.$index === 0 ? "" : "0px")};
  left: ${(props) =>
    props.$index === 0 ? "" : `calc(30px * ${props.$index})`};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
`;
const Raming = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  line-height: 40px;
  font-size: 13px;
`;

const PeopleItem = (props: Props) => {
  return (
    <>
      <Wrap $color={props.people.avatorColor} $index={props.index}>
        <div>{props.people.username.charAt(0)}</div>
      </Wrap>
      <Raming>
        {props.surplus === 0 ? null : `剩余座位:${props.surplus}`}
      </Raming>
    </>
  );
};

export default PeopleItem;
