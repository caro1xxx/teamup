import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  margin-top: 300px;
  font-style: italic;
  font-size: 12px;
  > div {
    width: 20%;
    margin-left: 5%;
  }
  .title {
    cursor: pointer;
    user-select: none;
    color: #05b665;
    font-weight: bolder;
    font-size: 17px;
  }
  .content {
    cursor: pointer;
    user-select: none;
    margin: 10px 0px;
  }
`;
