import styled from "styled-components";
export const Wrap = styled.div`
  position: fixed;
  top: 0px;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #7a7a7a34;
  z-index: 4;
  display: inline-flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  .body {
    background-color: #fff;
    border-radius: 10px;
    .hint {
      margin-bottom: 20px;
      text-align: center;
    }
  }
`;
