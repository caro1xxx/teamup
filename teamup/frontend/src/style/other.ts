import styled from "styled-components";

export const CategoryWrap = styled.div`
  margin-top: 20px;
  display: flex;
  position: relative;
  z-index: 2;
  .btn {
    cursor: pointer;
    background-color: #232323;
    width: 35px;
    height: 35px;
    border-radius: 5px;
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .create {
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    height: 35px;
    .create_btn {
      border-radius: 5px 0px 0px 5px;
      height: 35px;
      background-color: #232323;
      text-align: center;
      line-height: 35px;
      padding: 0px 10px;
    }
    .create_btn:hover {
      background-color: #5c8874;
    }
    .test {
      display: flex;
      vertical-align: top;
      justify-content: center;
      align-items: center;
      height: 35px;
      padding: 0px 10px;
      border-radius: 0px 5px 5px 0px;
      background-color: #05b665;
      font-size: 10px;
      img {
        width: 13px;
      }
    }
  }
  .search {
    background-color: #232323;
    border-radius: 5px;
    width: 285px;
    .cutomer .ant-input-search-button {
      background-color: #05b665;
      color: #fff;
      border-color: #05b665;
      box-shadow: none;
    }
    .cutomer .ant-input-search-button:hover {
      background-color: #2a9263ac;
      border-color: #2a9263ac;
      box-shadow: none;
    }
    .cutomer :focus,
    :hover,
    .ant-input-focused {
      border-color: #2a9263ac;
      box-shadow: none;
    }
  }
  @media (max-width: 500px) {
    display: none;
  }
`;

export const FavoriteWarp = styled.div`
  .wrap {
    cursor: pointer;
    user-select: none;
    background-color: #464646a4;
    border-radius: 5px;
    padding: 10px 10px;
    margin-bottom: 10px;
    .title {
      font-size: 12px;
      margin-bottom: 5px;
    }
    .tag {
      font-size: 10px;
      display: flex;
      vertical-align: top;
      justify-content: start;
      align-items: center;
      .hint {
        flex: 1;
      }
    }
  }
`;
export const LoadingMore = styled.div`
  text-align: center;
  margin-top: 30px;
  display: flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;

  .btnbody {
    background-color: #05b665;
  }
  > div {
    cursor: pointer;
    user-select: none;
    padding: 10px 15px;
    border-radius: 4px;
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    img {
      margin-left: 5px;
    }
  }
  .btnbody:hover {
    background-color: #2a9263ac;
  }
`;

export const LoadingWrap = styled.div`
  .loadingwrap {
    height: 213px;
    display: flex;
    justify-content: center;
    align-items: end;
  }
  .text {
    margin-top: 10px;
    height: 203px;
    display: flex;
    justify-content: center;
    align-items: start;
  }
  .loading {
    position: relative;
    width: 30px;
    height: 30px;
    border: 2px solid #2a9263ac;
    border-top-color: #05b665;
    border-right-color: #05b665;
    border-bottom-color: #05b665;
    border-radius: 100%;
    animation: circle infinite 0.75s linear;
  }
  @keyframes circle {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const AccountInfoWrap = styled.div`
  width: 100%;
  margin-top: 20px;
  background: linear-gradient(to right, #259acc, #05b665);
  color: transparent;
  border-radius: 15px;
  position: relative;
  color: #fff;
  .type {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 30px;
  }
  .contentwrap {
    padding: 20px;
  }
  .info {
    margin-top: 10px;
    display: flex;
  }
  .account {
    font-size: 15px;
    font-weight: lighter;
    font-style: italic;
  }
  .account_ {
    font-size: 15px;
  }
  .password {
    font-size: 15px;
    font-weight: lighter;
    font-style: italic;
  }
  .password_ {
    font-size: 15px;
  }
  .exprie_time {
    margin-top: 10px;
    text-align: center;
    font-size: 10px;
    cursor: pointer;
    user-select: none;
  }
  .hint {
    margin-top: 10px;
    font-size: 10px;
    text-align: center;
  }
`;

export const ActivityWrap = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  background-color: #0f0f1051;
  z-index: 1000;
  display: flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  .content {
    position: relative;
    height: 243px;
    background-repeat: no-repeat;
    background-size: 100%;
    width: 700px;
    border-radius: 10px;
    background-color: #0f0f1051;
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }
  @media (max-width: 500px) {
    display: none;
  }
`;

export const PayedOrderWrap = styled.div`
  max-height: 200px;
  overflow: scroll;
  .warp {
    padding: 5px 10px;
    background-color: #4c4c4c;
    margin: 10px 0px;
    border-radius: 5px;
    font-size: 10px;
    .ac {
      background-color: #1e1e1e;
      padding: 3px 5px;
      border: 2px solid #525252;
      color: #838383;
      margin: 3px 0px;
      border-radius: 5px;
    }
  }
  .changepwd {
    display: flex;
    .change {
      flex: 1;
      text-align: end;
      color: #ea4335;
      cursor: pointer;
      user-select: none;
    }
    .change:hover {
      color: #eb847b;
    }
  }
`;

export const AskWrap = styled.div`
  position: fixed;
  width: 480px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(143, 143, 143, 0.322),
    0 6px 20px 0 rgba(142, 142, 142, 0.129);
  bottom: 20px;
  font-size: 10px;
  color: #5d5d5d;
  font-weight: lighter;
  right: 20px;
  z-index: 3;
  padding: 30px;
  .btotbn {
    display: flex;
    > div {
      width: calc(33.3% - 20px);
      text-align: center;
      line-height: 30px;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
      margin: 10px 10px;
      margin-bottom: 0px;
    }
    .hulu {
      border: 0.5px #5d5d5d solid;
    }
    .hulu:hover {
      background-color: #cecece;
    }
  }
  @media (max-width: 500px) {
    display: none;
  }
`;

export const ErrorWrap = styled.div`
  text-align: center;
  .public {
    margin: 20px 0px;
    width: 100%;
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
  }
`;
