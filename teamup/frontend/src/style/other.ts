import styled from "styled-components";

export const CategoryWrap = styled.div`
  margin-top: 20px;
  display: flex;
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
`;
