import styled from "styled-components";

export const RoomDrawerWrap = styled.div`
  display: flex;
  font-size: 20px;
  align-items: center;

  .id {
    color: #05b665;
    font-weight: lighter;
    font-size: 16px;
  }
`;
export const TeamWrap = styled.div`
  height: 50px;
  display: flex;
  .auditorium {
    height: 35px;
    width: 35px;
    margin-right: 14px;
    cursor: pointer;
    img {
      user-select: none;
      -webkit-user-drag: none;
    }
  }
  .people {
    cursor: pointer;
    height: 32px;
    width: 32px;
    border: 4px solid #05b665;
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    > div {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      font-weight: bold;
      border-radius: 20px;
    }
  }
  .join {
    height: 39px;
    border-radius: 3px;
    text-align: center;
    font-weight: bolder;
    user-select: none;
    cursor: pointer;
  }
  .departure {
    text-align: center;
    line-height: 39px;
    color: #ee5b5b;
    cursor: pointer;
    user-select: none;
  }
`;

export const MsgItemWrap = styled.div<{ $who: number }>`
  position: relative;
  display: flex;
  vertical-align: top;
  justify-content: ${(props) =>
    props.$who === 0 ? "center" : props.$who === 1 ? "end" : "start"};
  align-items: center;
  .system {
    color: #636363;
    font-size: 12px;
    margin: 10px 0px;
    cursor: pointer;
    user-select: none;
  }
  .other {
    margin: 20px 0px;
    padding: 10px;
    color: #000;
    border-radius: 3px;
    max-width: 300px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    background-color: #fff;
  }
  .self {
    margin: 20px 0px;
    background-color: #05b665;
    padding: 10px;
    color: #000;
    border-radius: 3px;
    max-width: 300px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  .time {
    position: absolute;
    right: ${(props) => (props.$who === 1 ? "0px" : "")};
    left: ${(props) => (props.$who === 2 ? "0px" : "")};
    bottom: 0px;
    font-size: 10px;
    color: white;
    cursor: pointer;
    user-select: none;
    font-weight: lighter;
  }
`;

export const InputWrap = styled.div`
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
  .cutomer :hover {
    border-color: #2a9263ac;
    box-shadow: none;
  }
  .cutomer :focus,
  :hover,
  .ant-input-focused {
    border-color: #2a9263ac;
    box-shadow: none;
  }
`;

export const PleaseWrap = styled.div`
  height: calc(100vh - 350px - 50px);
  width: 100%;
  position: relative;

  .mask {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: #1f1f1f9f;
    backdrop-filter: blur(2px);
    border-radius: 5px;
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    user-select: none;
    span {
      cursor: pointer;
      color: #05b665;
      font-weight: bolder;
    }
  }

  .fake {
    display: flex;
    div {
      background-color: #05b665;
      max-width: 300px;
      padding: 10px 5px;
      border-radius: 3px;
      margin: 10px 0px;
    }
  }
`;

export const TeamTypeWrap = styled.div`
  cursor: pointer;
  user-select: none;
  div {
    display: flex;
    vertical-align: top;
    justify-content: start;
    align-items: center;
    margin: 10px 0px;
  }
  .hint {
    width: 100%;
    text-align: end;
    font-size: 10px;
  }
`;

// export const InputOptionsWrap = styled.div`
//   margin: 10px 0px 5px 0px;
//   height: 30px;
//   display: flex;

//
// `;

export const UserPayWrap = styled.div<{ $color: string; $state: number }>`
  background-color: ${(props) =>
    props.$state === 0 ? "#303030" : props.$color};
  width: 20px;
  cursor: pointer;
  height: 20px;
  border-radius: 15px;
  margin: 5px 5px;
  text-align: center;
  line-height: 20px;
  .loading,
  .loading > div {
    position: relative;
    box-sizing: border-box;
  }

  .loading {
    display: block;
    font-size: 0;
    color: #aaa;
  }

  .loading.la-dark {
    color: #fff;
  }

  .loading > div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
  }

  .loading {
    width: 18px;
    height: 20px;
    margin-top: 3px;
  }

  .loading > div {
    width: 3px;
    height: 3px;
    margin: 1px;
    border-radius: 100%;
    animation: ball-beat 0.7s -0.15s infinite linear;
  }

  .loading > div:nth-child(2n-1) {
    animation-delay: -0.5s;
  }

  @keyframes ball-beat {
    50% {
      opacity: 0.2;
      transform: scale(0.75);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const PayCodeWrap = styled.div`
  height: 30px;
  background-color: #0f0f10;
  margin-left: 10px;
  text-align: center;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
  line-height: 30px;
  div {
    padding: 0px 10px;
    display: flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 18px;
  }
`;

export const PayCodeBodyWrap = styled.div`
  .title {
    display: flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    > img {
      margin-right: 10px;
      width: 25px;
    }
  }
  .detail {
    font-size: 10px;
    margin: 0px 10px;
  }
  .price {
    display: flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    .value {
      flex: 1;
      text-align: end;
    }
  }
  .hint {
    color: #ea4335;

    text-align: center;
  }
`;

export const InputOptionsWrap = styled.div`
  height: 35px;
  .options_back {
    padding: 5px 5px;
    cursor: pointer;
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #0f0f10;
  }
  .options_back:hover {
    background-color: #525252;
  }
`;
