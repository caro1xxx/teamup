import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  position: fixed;
  bottom: 0px;
  height: calc(10vh);
  box-shadow: 0 4px 8px 0 rgba(210, 210, 210, 0.2),
    0 6px 20px 0 rgba(206, 206, 206, 0.19);
  background-color: white;
  right: 10%;
  left: 10%;
  border-radius: 20px 20px 0px 0px;
`;

type Props = {};

const MediaNavbarItem = (props: Props) => {
  return (
    <Wrap>
      <div>1</div>
    </Wrap>
  );
};

export default MediaNavbarItem;
