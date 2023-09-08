import styled from "styled-components";
export const Wrap = styled.div`
  top: 0px;
  width: 100%;
  height: 70px;
  line-height: 70px;
  position: fixed;
  z-index: 2;
  color: #fff;
  font-weight: bolder;
  background: radial-gradient(to bottom, #000000c5, #00000020);
  .body {
    display: flex;
    font-size: 18px;
    cursor: pointer;
    user-select: none;
    width: 1200px;
    margin: 0 auto;
    .logo {
      flex: 1;
      display: inline-flex;
      vertical-align: top;
      justify-content: center;
      align-items: center;
    }
    .tag {
      width: 40%;
      display: flex;
      vertical-align: top;
      justify-content: end;
      align-items: center;
      > div {
        margin-right: 30px;
      }
    }
    .user {
      display: inline-flex;
      vertical-align: top;
      justify-content: center;
      align-items: center;
      margin-left: 50px;
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
      > div {
        border-radius: 5px;
        text-align: center;
        width: 50px;
        color: #fff;
        background-color: #cd2d29;
      }
      > div:hover {
        background-color: #cd2c29cc;
      }
    }
    .options {
      width: 40%;
      display: inline-flex;
      vertical-align: top;
      justify-content: start;
      align-items: center;
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
