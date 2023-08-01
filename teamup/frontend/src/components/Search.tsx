import React from "react";
import styled from "styled-components";
import SearchIcon from "../assets/images/search.png";
type Props = {};

const Wrap = styled.div`
  background-color: #0e0e10;
  height: 5vh;
  width: 95%;
  border-radius: 0px 10px 10px 0px;
  display: inline-flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  .search_back {
    background-color: #2d2e3d;
    height: 3vh;
    border-radius: 5px;
    width: 90%;
    display: flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    img {
      height: 2.5vh;
      width: 2.5vh;
      margin-right: 2px;
    }
  }
  .search_input {
    outline: none;
    background-color: #2d2e3d;
    height: 2vh;
    border: none;
    border-radius: 10px;
    flex: 1;
  }
  .search_input::placeholder {
    color: #71717494;
  }
`;

const Search = (props: Props) => {
  return (
    <Wrap>
      <div className="search_back">
        <input
          type="text"
          className="search_input"
          placeholder="寻找属于你的车队吧!"
        />
        <img src={SearchIcon} alt="search" />
      </div>
    </Wrap>
  );
};

export default Search;
