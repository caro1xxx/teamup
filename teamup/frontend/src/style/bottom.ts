import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  margin-top: 100px;
  font-style: italic;
  font-size: 12px;
  > div {
    width: 20%;
    margin-left: 5%;
  }
  .title {
    color: #05b665;
    font-weight: bolder;
    font-size: 17px;
  }
  .content {
    margin: 10px 0px;
  }
`;
