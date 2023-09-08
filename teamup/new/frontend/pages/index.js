import Head from "next/head";
import NavBar from "../components/NavBar/index";
import Commodity from "../components/Commodity/index";
import Notify from "../components/Notify/index";
import Footer from "../components/Footer/index";
import Login from "../components/Login/index";
import Order from "../components/Order/index";
import styled from "styled-components";
import React from "react";
import Bg from "../assets/images/bg.webp";
import { nanoid } from "nanoid";
import Image from "next/image";
import { fether } from "../utils/fether.js";
import { useWebSocket } from "ahooks";
import { setStorage, getStorage } from "../utils/localStorage";

const Wrap = styled.div`
  .main {
    position: absolute;
    z-index: 3;
    top: 70px;
    right: 0;
    left: 0;
    height: 95vh;
    overflow: scroll;
    .body {
      width: 1200px;
      margin: 0 auto;
    }
  }
  .backwarp {
    position: relative;
    z-index: 1;
    .bg {
      width: 100%;
      height: 100vh;
    }
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background: radial-gradient(circle, #00000039, #2a2a2a17);
  }
`;

export default function Home() {
  const [userinfo, setUserinfo] = React.useState({
    username: "",
    showLogin: false,
    loginToken: "",
  });
  const [order, setOrder] = React.useState({
    showOrder: false,
  });
  const [allNetflixGoods, setAllNetflixGoods] = React.useState([
    [
      {
        title: "体验套餐",
        price: "N",
        time: 7,
        showTime: "7天",
        type: "netflix",
        stock: 333,
        support: [
          { title: "全设备支持", support: 0, key: nanoid() },
          { title: "Ultra HD 4K观看", support: 1, key: nanoid() },
          { title: "平台邮件通知", support: 1, key: nanoid() },
          { title: "翻车包退", support: 1, key: nanoid() },
          { title: "全地区解锁", support: 0, key: nanoid() },
          { title: "赠送奈飞节点", support: 0, key: nanoid() },
          { title: "续费不换号", support: 0, key: nanoid() },
          { title: "售后群", support: 0, key: nanoid() },
        ],
        key: nanoid(),
      },
      {
        title: "月抛套餐",
        price: "N",
        time: 30,
        showTime: "30天",
        type: "netflix",
        stock: 333,
        support: [
          { title: "全设备支持", support: 1, key: nanoid() },
          { title: "Ultra HD 4K观看", support: 1, key: nanoid() },
          { title: "平台邮件通知", support: 1, key: nanoid() },
          { title: "翻车包退", support: 1, key: nanoid() },
          { title: "全地区解锁", support: 1, key: nanoid() },
          { title: "赠送奈飞节点", support: 0, key: nanoid() },
          { title: "续费不换号", support: 0, key: nanoid() },
          { title: "售后群", support: 0, key: nanoid() },
        ],
        key: nanoid(),
      },
      {
        title: "短期套餐",
        price: "N",
        showTime: "60天",
        time: 60,
        type: "netflix",
        stock: 333,
        support: [
          { title: "全设备支持", support: 1, key: nanoid() },
          { title: "Ultra HD 4K观看", support: 1, key: nanoid() },
          { title: "平台邮件通知", support: 1, key: nanoid() },
          { title: "翻车包退", support: 1, key: nanoid() },
          { title: "全地区解锁", support: 1, key: nanoid() },
          { title: "赠送奈飞节点", support: 1, key: nanoid() },
          { title: "续费不换号", support: 1, key: nanoid() },
          { title: "售后群", support: 0, key: nanoid() },
        ],
        key: nanoid(),
      },
      {
        title: "长期套餐",
        price: "N",
        showTime: "90天",
        time: 60,
        type: "netflix",
        stock: 333,
        support: [
          { title: "全设备支持", support: 1, key: nanoid() },
          { title: "Ultra HD 4K观看", support: 1, key: nanoid() },
          { title: "平台邮件通知", support: 1, key: nanoid() },
          { title: "翻车包退", support: 1, key: nanoid() },
          { title: "全地区解锁", support: 1, key: nanoid() },
          { title: "赠送奈飞节点", support: 1, key: nanoid() },
          { title: "续费不换号", support: 1, key: nanoid() },
          { title: "售后群", support: 1, key: nanoid() },
        ],
        key: nanoid(),
      },
      {
        title: "稳定套餐",
        price: "N",
        time: 90,
        showTime: "180天",
        type: "netflix",
        stock: 333,
        support: [
          { title: "全设备支持", support: 1, key: nanoid() },
          { title: "Ultra HD 4K观看", support: 1, key: nanoid() },
          { title: "平台邮件通知", support: 1, key: nanoid() },
          { title: "翻车包退", support: 1, key: nanoid() },
          { title: "全地区解锁", support: 1, key: nanoid() },
          { title: "赠送奈飞节点", support: 1, key: nanoid() },
          { title: "续费不换号", support: 1, key: nanoid() },
          { title: "售后群", support: 1, key: nanoid() },
        ],
        key: nanoid(),
      },
      {
        title: "包年套餐",
        price: "N",
        time: 360,
        showTime: "365天",
        type: "netflix",
        stock: 333,
        support: [
          { title: "全设备支持", support: 1, key: nanoid() },
          { title: "Ultra HD 4K观看", support: 1, key: nanoid() },
          { title: "平台邮件通知", support: 1, key: nanoid() },
          { title: "翻车包退", support: 1, key: nanoid() },
          { title: "全地区解锁", support: 1, key: nanoid() },
          { title: "赠送奈飞节点", support: 1, key: nanoid() },
          { title: "续费不换号", support: 1, key: nanoid() },
          { title: "售后群", support: 1, key: nanoid() },
        ],
        key: nanoid(),
      },
      {
        title: "定制套餐",
        price: "N",
        time: 1000,
        showTime: "定制",
        type: "netflix",
        stock: 333,
        support: [
          { title: "全设备支持", support: 1, key: nanoid() },
          { title: "Ultra HD 4K观看", support: 1, key: nanoid() },
          { title: "平台邮件通知", support: 1, key: nanoid() },
          { title: "翻车包退", support: 1, key: nanoid() },
          { title: "全地区解锁", support: 1, key: nanoid() },
          { title: "赠送奈飞节点", support: 1, key: nanoid() },
          { title: "续费不换号", support: 1, key: nanoid() },
          { title: "售后群", support: 1, key: nanoid() },
        ],
        key: nanoid(),
      },
    ],
  ]);

  const { readyState, latestMessage, disconnect } = useWebSocket(
    userinfo.loginToken
      ? `ws://192.168.31.69/ws/login/${userinfo.loginToken}/`
      : ""
  );

  const requestLoginToken = async (type) => {
    let result = await fether("login/", {}, "get");
    if (result.code === 200) {
      setUserinfo({ ...userinfo, loginToken: result.token, showLogin: type });
    }
  };

  // 登录
  const changeLogin = async (type) => {
    if (type === false) {
      setUserinfo({ ...userinfo, showLogin: type });
      if (readyState === 1) disconnect();
    } else {
      await requestLoginToken(type);
    }
  };

  // 获取商品价格
  const getNetflixPrice = async () => {
    let result = await fether("goods/", {}, "get");
    if (result.code === 200) {
      let data = [...allNetflixGoods];
      result.data.forEach((item) => {
        item.price.forEach((childItem, index) => {
          data[0][index].price = childItem;
        });
      });
      setAllNetflixGoods(data);
    }
  };

  // 下单
  const changeOrderPopup = (type) => {
    setOrder({ showOrder: type });
  };

  React.useEffect(() => {
    if (latestMessage) {
      const loginNotify = JSON.parse(latestMessage.data);
      setStorage("accessToken", loginNotify.token);
      setStorage("username", loginNotify.username);
      setUserinfo({
        ...userinfo,
        username: loginNotify.username,
        showLogin: false,
      });
    }
    return () => readyState === 1 && disconnect();
  }, [latestMessage]);

  React.useEffect(() => {
    getNetflixPrice();
    if (getStorage("accessToken")) {
      let strings = getStorage("accessToken").split(".");
      const payload = JSON.parse(
        decodeURIComponent(
          escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))
        )
      );
      setUserinfo({ ...userinfo, username: payload.username });
    }
  }, []);

  return (
    <Wrap>
      <Head>
        <title>Teamup-奈飞合租平台 流媒体合租 奈飞组队</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="backwarp">
        <Image className="bg" src={Bg} alt="image" />
        <div className="mask"></div>
      </div>
      <Notify />
      <NavBar login={changeLogin} username={userinfo.username} />
      {userinfo.showLogin ? (
        <Login close={changeLogin} token={userinfo.loginToken} />
      ) : null}
      {order.showOrder ? <Order close={() => changeOrderPopup(false)} /> : null}
      <main className="main">
        <div className="body">
          <Commodity
            goods={allNetflixGoods[0]}
            open={() => changeOrderPopup(true)}
          />
        </div>
        <Footer />
      </main>
    </Wrap>
  );
}
