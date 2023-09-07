import styled from "styled-components";

export const Wrap = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: #0d6efd;
  box-shadow: 0 4px 8px 0 rgba(120, 120, 120, 0.2),
    0 6px 20px 0 rgba(93, 93, 93, 0.19);
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
`;

export const Message = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(120, 120, 120, 0.2),
    0 6px 20px 0 rgba(93, 93, 93, 0.19);
  height: 400px;
  width: 300px;
  border-radius: 5px;
  .top {
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    background-color: #0d6efd;
    border-radius: 5px 5px 0px 0px;
  }
  .box {
    height: 320px;
    padding: 10px;
  }
  .input {
    border-radius: 0px 0px 5px 5px;
    display: flex;
    height: 40px;
    > input {
      padding: 0px 5px;
      flex: 1;
      height: 40px;
      border: none;
      outline: none;
    }
    .send {
      color: #fff;
      line-height: 40px;
      text-align: center;
      width: 50px;
      height: 100%;
      cursor: pointer;
      user-select: none;
      background-color: #0d6efd;
      border-radius: 0px 0px 5px 0px;
    }
    .send:hover {
      background-color: #145eced3;
    }
  }
`;
