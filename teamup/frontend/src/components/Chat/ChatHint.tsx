import React from "react";
import styled from "styled-components";
type Props = {};

const HintWrap = styled.div`
  margin: 20px 0px;
`;

const ChatHint = (props: Props) => {
  return <HintWrap>请文明发言 共建和谐社区</HintWrap>;
};

export default ChatHint;
