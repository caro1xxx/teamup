import styled from "styled-components";

export const Wrap = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  background-color: #7a7a7a34;
  z-index: 5;
  display: inline-flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  .body {
    width: 350px;
    position: relative;
    background-color: white;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    .title {
      display: flex;
      font-size: 16px;
      color: #cd2d29;
      > div {
        width: 50%;
      }
      padding-bottom: 10px;
      border-bottom: 2px solid #cd2d29;
    }
    .text {
      margin-top: 10px;
      font-size: 16px;
      color: #cd2d29;
      font-weight: lighter;
    }
    .order {
      margin-top: 20px;
      font-size: 12px;
      color: #cd2d29;
      font-weight: bold;
    }
    .good {
      margin-top: 10px;
      .top {
        background: linear-gradient(to right, #eb3329, #962626);
        height: 30px;
        color: #fff;
        border-radius: 5px 5px 0px 0px;
        display: flex;
        text-align: center;
        line-height: 30px;
        font-size: 13px;
      }
      .product {
        width: 40%;
        text-align: start;
      }
      .id {
        width: 10%;
      }
      .count {
        width: 20%;
      }
      .price {
        width: 30%;
      }
      .content {
        height: 50px;
        font-weight: lighter;
        font-size: 12px;
        text-align: center;
        display: flex;
        color: #962626;
        border-bottom: 1px solid #eb3329;
        padding: 10px 0px;
      }
      .bottom {
        background: linear-gradient(to right, #eb3329, #962626);
        height: 30px;
        color: #fff;
        border-radius: 0px 0px 5px 5px;
        display: flex;
        line-height: 30px;
        font-size: 13px;
        .sum {
          flex: 1;
          margin-left: 10px;
        }
        .sum_price {
          width: 30%;
          text-align: center;
        }
      }
    }
    .discount {
      margin-top: 20px;
      display: flex;
      > input {
        outline: none;
        border: none;
        background-color: #e1e1e1b9;
        width: 80%;
        border-radius: 5px;
        padding: 10px 10px;
      }
      .check {
        flex: 1;
        position: relative;
        margin-left: 10px;
        text-align: center;
        line-height: 35px;
        background: linear-gradient(to right, #eb3329, #962626);
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        user-select: none;
      }
      .check:hover {
        transform: scale(0.96);
      }
    }
    .pay {
      cursor: pointer;
      user-select: none;
      height: 35px;
      width: 100%;
      background: linear-gradient(to right, #eb3329, #962626);
      color: #fff;
      border-radius: 5px;
      margin-top: 20px;
      line-height: 30px;
      text-align: center;
      display: inline-flex;
      vertical-align: top;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      border: none;
    }
    .pay:focus {
      color: rgb(255, 255, 255);
      background: #bf1d0a;
      border-color: #bf1d0a;
    }
    .pay:hover {
      color: #fff;
    }
    .public {
      margin-top: 20px;
      width: 100%;
      text-align: center;
      .question {
        font-size: 12px;
        cursor: pointer;
        color: #a1a1a1db;
      }
      .icon {
        margin-top: 10px;
        > img {
          cursor: pointer;
          margin: 0px 5px;
        }
      }
    }
    .qrcode {
      margin-top: 10px;

      > div {
        display: flex;
        vertical-align: top;
        justify-content: center;
        align-items: center;
      }
    }
    .close {
      position: absolute;
      top: 0px;
      right: -50px;
      cursor: pointer;
    }
    .account {
      padding: 10px;
      border: 2px solid #eb3329;
      margin-top: 10px;
      border-radius: 5px;
      background-color: #d04f48b1;
      color: #fff;
    }
  }
`;
