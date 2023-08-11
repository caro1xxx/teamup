import React from "react";
import DescendingIcon from "../assets/images/descending.png";
import AscendingIcon from "../assets/images/ascending.png";
import styled from "styled-components";
import { Input } from "antd";
type Props = {};

const Wrap = styled.div`
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

const { Search } = Input;

const Category = (props: Props) => {
  return (
    <Wrap>
      <div className="btn">
        <img src={AscendingIcon} alt="asce" />
      </div>
      <div className="btn">
        <img src={DescendingIcon} alt="desc" />
      </div>
      <div style={{ flex: 1 }}></div>
      <div className="search">
        <Search
          className="cutomer"
          placeholder="input search text"
          enterButton
        />
      </div>
    </Wrap>
  );
};

export default Category;
