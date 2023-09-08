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
    height: 700px;
    background-color: white;
    border-radius: 5px;
    padding: 20px;
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
  }
`;
