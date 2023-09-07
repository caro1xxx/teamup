import styled from "styled-components";

export const Wrap = styled.div`
  top: 0px;
  width: 100%;
  height: 70px;
  line-height: 70px;
  position: fixed;
  z-index: 2;
  background-color: #fff;
  .body {
    display: flex;
    font-size: 18px;
    cursor: pointer;
    user-select: none;
    width: 1200px;
    margin: 0 auto;
    .logo {
      flex: 1;
      text-align: start;
    }
    .tag {
      display: flex;
      > div {
        margin-left: 30px;
      }
    }
    .login {
      display: inline-flex;
      vertical-align: top;
      justify-content: center;
      align-items: center;
      margin-left: 50px;
      height: 20px;
      font-size: 10px;
      line-height: 20px;
      margin-top: 25px;
      > div {
        border-radius: 5px;
        text-align: center;
        width: 50px;
        color: #fff;
        background-color: #000;
      }
      > div:hover {
        color: #000;
        background-color: #cecece;
      }
    }
    .avator {
      display: inline-flex;
      vertical-align: top;
      justify-content: center;
      align-items: center;
      margin-left: 30px;
    }
    .car {
      display: inline-flex;
      vertical-align: top;
      justify-content: center;
      align-items: center;
      margin-left: 30px;
    }
  }
`;
