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
  position: absolute;
  bottom: 0px;
  height: 50px;
  width: 450px;
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
