import React from "react";
import styled from "styled-components";
import PublicPng from "../assets/images/public.png";
type Props = {};

const Wrap = styled.div`
  position: fixed;
  bottom: 45%;
  left: -10px;
  background-color: #fff;
  width: 220px;
  border-radius: 10px;
  @media (max-width: 500px) {
    display: none;
  }
`;

const Public = (props: Props) => {
  return (
    <Wrap>
      <img src={PublicPng} width={200} alt="public" />
    </Wrap>
  );
};

export default Public;
