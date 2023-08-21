import styled from "styled-components";

export const CreateRoomWrap = styled.div`
  .title {
    display: flex;
    div:first-of-type {
      margin-right: 2%;
      width: 60%;
    }
    div:nth-child(2) {
      margin-left: 2%;
      width: 36%;
    }
    margin-bottom: 20px;
  }
  .type {
    display: flex;
    .types,
    .time {
      width: 20%;
      margin-right: 4%;
    }
    .account {
      width: 30%;
      margin-right: 4%;
    }
    .price {
      width: 20%;
    }
    margin-bottom: 20px;
  }
  .detail {
    margin-bottom: 20px;
  }
  .link {
    display: flex;
    .copy {
      flex: 1;
      display: flex;
      text-align: center;
      color: #0d6efd;
      cursor: pointer;
      user-select: none;
      vertical-align: top;
      justify-content: center;
      align-items: center;
    }
    .copy:hover {
      color: #5a9bfe;
    }
  }
  .create {
    margin-top: 20px;
    text-align: center;
    font-size: 17px;
    height: 40px;
    width: 100%;
    background-color: #05b665;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
  }
`;

export const SelfWrap = styled.div`
  padding-top: 10px;
  > div {
    margin: 10px 0px;
  }
  .hint {
    font-size: 10px;
    color: #05b665;
  }
  .create {
    margin-top: 20px;
    text-align: center;
    font-size: 17px;
    height: 40px;
    width: 100%;
    background-color: #05b665;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
  }
`;
