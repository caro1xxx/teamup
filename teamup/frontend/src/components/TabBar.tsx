import { nanoid } from "nanoid";
import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { useAppDispatch } from "../redux/hooks";
import { changeMessage } from "../redux/modules/notifySlice";

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
      path: "/home/netflix",
      image: require("../assets/images/logo/netflix.webp"),
      key: nanoid(),
      select: true,
      isDev: false,
    },
    {
      path: "/home/disney",
      image: require("../assets/images/logo/disney.webp"),
      key: nanoid(),
      select: false,
      isDev: true,
    },
    {
      path: "/home/hulu",
      image: require("../assets/images/logo/hulu.webp"),
      key: nanoid(),
      select: false,
      isDev: true,
    },
    {
      path: "/home/spotify",
      image: require("../assets/images/logo/spotify.webp"),
      key: nanoid(),
      select: false,
      isDev: true,
    },
    {
      path: "/home/nintendo",
      image: require("../assets/images/logo/nintendo.webp"),
      key: nanoid(),
      select: false,
      isDev: true,
    },
    {
      path: "/home/youtube",
      image: require("../assets/images/logo/youtube.webp"),
      key: nanoid(),
      select: false,
      isDev: true,
    },
    {
      path: "/home/pornhub",
      image: require("../assets/images/logo/pornhub.webp"),
      key: nanoid(),
      select: false,
      isDev: true,
    },
  ]);
  const location = useLocation();
  const dispath = useAppDispatch();

  // select bar
  const selectBar = (idx: number) => {
    if (barList[idx].isDev) {
      dispath(changeMessage(["程序员通宵开发中", false]));
      return;
    }
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
    }
    setBarList(oldValue); // eslint-disable-next-line
  }, []);

  return (
    <Wrap>
      {barList.map((item, index) => {
        return (
          <Fragment key={item.key}>
            {item.isDev ? (
              <Tooltip placement="top" title={"敬请期待"}>
                <Link
                  className="item"
                  onClick={() => selectBar(index)}
                  to={"/home/netflix"}
                >
                  <img
                    src={item.image}
                    className={item.select ? "select" : ""}
                    alt="logo"
                  />
                </Link>
              </Tooltip>
            ) : (
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
            )}
          </Fragment>
        );
      })}
    </Wrap>
  );
};

export default TabBar;
