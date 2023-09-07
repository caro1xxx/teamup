import React from "react";
import { Wrap, ToFowrad } from "./style.jsx";
import netflix from "../../assets/images/netflix.webp";
import toRightIcon from "../../assets/icon/toright.png";
import toLeftIcon from "../../assets/icon/toleft.png";
import HotIcon from "../../assets/icon/hot.png";
import Image from "next/image";
import { nanoid } from "nanoid";

const list = [
  {
    title: "体验套餐",
    price: 7,
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
    price: 22,
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
    price: 48,
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
    price: 48,
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
    price: 90,
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
    price: 150,
    time: 360,
    showTime: "365",
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
    price: 999,
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
];

const turkeyList = [
  {
    title: "包月",
    price: 10,
    time: 30,
    showTime: "30天",
    type: "netflix",
    stock: 333,
    support: [
      { title: "全设备支持", support: 1, key: nanoid() },
      { title: "Ultra HD 4K观看", support: 1, key: nanoid() },
      { title: "平台邮件通知", support: 1, key: nanoid() },
      { title: "翻车包退", support: 1, key: nanoid() },
      { title: "限土耳其,乌克兰,新西兰,", support: 1, key: nanoid() },
      { title: "阿根廷,德国节点", support: 1, key: nanoid() },
      { title: "赠送奈飞节点", support: 0, key: nanoid() },
      { title: "续费不换号", support: 0, key: nanoid() },
      { title: "售后群", support: 0, key: nanoid() },
    ],
    key: nanoid(),
  },
  {
    title: "季度套餐",
    price: 50,
    time: 25,
    showTime: "30天",
    type: "netflix",
    stock: 333,
    support: [
      { title: "全设备支持", support: 1, key: nanoid() },
      { title: "Ultra HD 4K观看", support: 1, key: nanoid() },
      { title: "平台邮件通知", support: 1, key: nanoid() },
      { title: "翻车包退", support: 1, key: nanoid() },
      { title: "限土耳其,乌克兰,新西兰,", support: 1, key: nanoid() },
      { title: "阿根廷,德国节点", support: 1, key: nanoid() },
      { title: "赠送奈飞土耳其节点", support: 1, key: nanoid() },
      { title: "首月免费", support: 1, key: nanoid() },
      { title: "续费不换号", support: 0, key: nanoid() },
    ],
    key: nanoid(),
  },
];

const index = () => {
  const [currentShowDirection, setCurrentShowDirection] = React.useState(1);

  const moveScroll = (type) => {
    let ponit = null;
    if (type === 1) {
      ponit = document.getElementById("toright");
      setCurrentShowDirection(0);
    } else {
      ponit = document.getElementById("toleft");
      setCurrentShowDirection(1);
    }
    if (ponit === null) return;
    ponit.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <>
      <Wrap>
        <div className="title">
          Netflix Premium 五人车
          <Image width={25} height={30} src={HotIcon} alt="settings" />
        </div>
        <div className="body">
          {list.map((item, index) => {
            return (
              <div className="item" key={item.key}>
                <div className="stock">库存:{item.stock}</div>
                <div className="top">
                  <Image className="logo" src={netflix} alt="settings" />
                  <div>{item.title}</div>
                </div>
                <div className="price">
                  ￥{item.price}/{item.showTime}
                </div>
                <div className="choose">购买</div>
                <div className="feature">
                  {item.support.map((childItem) => {
                    return (
                      <div
                        key={childItem.key}
                        className={childItem.support ? "support" : "nosupport"}
                      >
                        {childItem.title}
                      </div>
                    );
                  })}
                </div>
                {index === list.length - 1 ? <div id="toright"></div> : null}
                {index === 0 ? <div id="toleft"></div> : null}
              </div>
            );
          })}
          <ToFowrad
            onClick={() => moveScroll(currentShowDirection)}
            $orientations={currentShowDirection}
          >
            <Image
              width={25}
              height={30}
              src={currentShowDirection === 1 ? toRightIcon : toLeftIcon}
              alt="settings"
            />
          </ToFowrad>
        </div>
      </Wrap>
      <Wrap>
        <div className="body">
          {turkeyList.map((item, index) => {
            return (
              <div className="item" key={item.key}>
                <div className="stock">库存:{item.stock}</div>
                <div className="top">
                  <Image className="logo" src={netflix} alt="settings" />
                  <div>{item.title}</div>
                </div>
                <div className="price">
                  ￥{item.price}/{item.showTime}
                </div>
                <div className="choose">购买</div>
                <div className="feature">
                  {item.support.map((childItem) => {
                    return (
                      <div
                        key={childItem.key}
                        className={childItem.support ? "support" : "nosupport"}
                      >
                        {childItem.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Wrap>
    </>
  );
};

export default index;
