import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";

type Props = {};

const Wrap = styled.div`
  position: -webkit-sticky;
  position: sticky;
  z-index: 100;
  top: 0px;
  background-color: #232323;
  width: 100%;
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  .item {
    height: 50px;
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    img {
      width: 20px;
      padding: 10px;
      border-bottom: 3px solid #232323;
      user-select: none;
      cursor: pointer;
    }
  }
  .select {
    border-bottom: 3px solid #0ab666 !important;
  }
`;

const TabBar = (props: Props) => {
  const [barList, setBarList] = useState([
    {
      path: "/netflix",
      image: require("../assets/images/logo/netflix.png"),
      key: nanoid(),
      select: true,
    },
    {
      path: "/disney",
      image: require("../assets/images/logo/disney.png"),
      key: nanoid(),
      select: false,
    },
    {
      path: "/hulu",
      image: require("../assets/images/logo/hulu.png"),
      key: nanoid(),
      select: false,
    },
    {
      path: "/spotify",
      image: require("../assets/images/logo/spotify.png"),
      key: nanoid(),
      select: false,
    },
    {
      path: "/nintendo",
      image: require("../assets/images/logo/nintendo.png"),
      key: nanoid(),
      select: false,
    },
    {
      path: "/youtube",
      image: require("../assets/images/logo/youtube.png"),
      key: nanoid(),
      select: false,
    },
    {
      path: "/pornhub",
      image: require("../assets/images/logo/pornhub.png"),
      key: nanoid(),
      select: false,
    },
  ]);
  const location = useLocation();
  const navigate = useNavigate();

  // select bar
  const selectBar = (idx: number) => {
    let oldValue = [...barList];
    oldValue.map((item) => (item.select = false));
    oldValue[idx].select = true;
    setBarList(oldValue);
  };

  // init navigate
  useEffect(() => {
    let oldValue = [...barList],
      flag = false;
    oldValue.forEach((item) => {
      if (item.path === location.pathname) {
        item.select = true;
        flag = true;
      } else {
        item.select = false;
      }
    });
    if (!flag) {
      oldValue[0].select = true;
      navigate("/netflix"); // eslint-disable-next-line
    }
    setBarList(oldValue); // eslint-disable-next-line
  }, []);

  return (
    <Wrap>
      {barList.map((item, index) => {
        return (
          <Link
            className="item"
            key={item.key}
            onClick={() => selectBar(index)}
            to={item.path}
          >
            <img
              src={item.image}
              className={item.select ? "select" : ""}
              alt="logo"
            />
          </Link>
        );
      })}
    </Wrap>
  );
};

export default TabBar;
