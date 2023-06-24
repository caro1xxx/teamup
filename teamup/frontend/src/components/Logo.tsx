import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  height: 50px;
  width: 90px;
  text-align: center;
  line-height: 50px;
`;

type Props = {};

const Logo = (props: Props) => {
  return <Wrap>TeamUp</Wrap>;
};

export default Logo;
