import styled from "styled-components";

export const CreateRoomWrap = styled.div`
  .title {
    display: flex;
    div {
      width: 48%;
    }
    div:first-of-type {
      margin-right: 2%;
    }
    div:nth-child(2) {
      margin-left: 2%;
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
    color: #05b665;
  }
  .create {
    margin-top: 40px;
    line-height: 40px;
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
