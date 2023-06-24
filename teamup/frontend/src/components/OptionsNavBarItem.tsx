import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 10px 20px;
  background-color: white;
  display: inline-flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  border: 2px solid #5765f2;
  img {
    width: 30px;
    height: 30px;
  }
`;

type Props = {
  data: {
    name: string;
    key: string;
    img: any;
    background: string;
  };
};

const OptionsNavBar = (props: Props) => {
  return (
    <Wrap style={{ backgroundColor: props.data.background }}>
      <img src={props.data.img} alt="option" />
    </Wrap>
  );
};

export default OptionsNavBar;
