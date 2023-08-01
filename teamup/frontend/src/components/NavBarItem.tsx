import React from "react";
import styled from "styled-components";
type Props = {};

const Circle = styled.div`
  height: 5vh;
  width: 5vh;
  background-color: white;
  margin: 1vh 0px;
  border-radius: 5vh;
`;

const Wrap = styled.div`
  display: flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
`;

const NavBarItem = (props: Props) => {
  return (
    <Wrap>
      <Circle></Circle>
    </Wrap>
  );
};

export default NavBarItem;
