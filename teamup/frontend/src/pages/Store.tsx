import React, { useEffect } from "react";
import { StoreWrap } from "../style/pages";
import { nanoid } from "nanoid";
import { Modal, Button } from "antd";
import BuyAccount from "../components/Mod/BuyAccount";
import { fecther } from "../utils/fecther";
import { useAppSelector } from "../redux/hooks";
import { generateRandomString } from "../utils/tools";
import { useAppDispatch } from "../redux/hooks";
import { changeMessage } from "../redux/modules/notifySlice";
import "../style/custome_antd.css";
import { getStorage, setStorage } from "../utils/localstorage";
import { WEBSOCKER_HOST, QRCODE_FLUSH_TIME } from "../env/config";
import { current } from "@reduxjs/toolkit";

type Props = {};

const Store = (props: Props) => {
  const dispatch = useAppDispatch();
  const [serviceList, setServiceList] = React.useState([
    {
      icon: require("../assets/images/logo/netflix.webp"),
      key: nanoid(),
      type: "netflix",
      plan: [
        {
          time: 30,
          key: nanoid(),
          level: "初出茅庐",
          image: require("../assets/images/30.webp"),
          includes: [
            { title: "Netflix标准会员 30天", key: nanoid() },
            { title: "平台邮箱 安全同行", key: nanoid() },
            { title: "密码变更邮件推送", key: nanoid() },
            { title: "账号有效期内免费质保", key: nanoid() },
            { title: "独立观影记录 享受4K蓝光", key: nanoid() },
          ],
          money: 16,
          loading: false,
          emtry: false,
        },
        {
          time: 90,
          key: nanoid(),
          level: "略有小成",
          image: require("../assets/images/90.webp"),
          includes: [
            { title: "Netflix标准会员 90天", key: nanoid() },
            { title: "平台邮箱 安全同行", key: nanoid() },
            { title: "密码变更邮件推送", key: nanoid() },
            { title: "账号有效期内免费质保", key: nanoid() },
            { title: "独立观影记录 享受4K蓝光", key: nanoid() },
          ],
          money: 40,
          loading: false,
          emtry: false,
        },
        {
          time: 180,
          key: nanoid(),
          level: "登堂入室",
          image: require("../assets/images/180.webp"),
          includes: [
            { title: "Netflix标准会员 180天", key: nanoid() },
            { title: "平台邮箱 安全同行", key: nanoid() },
            { title: "密码变更邮件推送", key: nanoid() },
            { title: "账号有效期内免费质保", key: nanoid() },
            { title: "独立观影记录 享受4K蓝光", key: nanoid() },
          ],
          money: 70,
          loading: false,
          emtry: true,
        },
        {
          time: 365,
          key: nanoid(),
          level: "渐入佳境",
          image: require("../assets/images/365.webp"),
          includes: [
            { title: "Netflix标准会员 365天", key: nanoid() },
            { title: "平台邮箱 安全同行", key: nanoid() },
            { title: "密码变更邮件推送", key: nanoid() },
            { title: "账号有效期内免费质保", key: nanoid() },
            { title: "独立观影记录 享受4K蓝光", key: nanoid() },
          ],
          money: 100,
          loading: false,
          emtry: true,
        },
      ],
    },
  ]);
  const isLogin = useAppSelector((state) => state.user.isLogin) as boolean;
  const [createRoomModel, setCreateRoomModel] = React.useState(false);
  const [OrderInfo, setOrderInfo] = React.useState({
    order_id: "",
    user: "",
    create_time: 0,
    price: 0,
    discountPrice: 0,
    type: "",
    time: 0,
    qrcode: "",
    qrstate: false,
    expire_time: 0,
  });
  const WsRef = React.useRef<WebSocket | null>(null);
  const [PayedInfo, setPayedInfo] = React.useState({
    username: "",
    password: "",
    seat: "",
    isPayed: 0,
  });
  const isFlushingRef = React.useRef(false);
  const isUseingDiscount = React.useRef(false);

  const buy = async (type: string, time: number, idx: number, didx: number) => {
    let userFlag: string = "";
    if (!isLogin) {
      if (getStorage("userFlag")) {
        userFlag = getStorage("userFlag");
      } else {
        setStorage("userFlag", generateRandomString(5));
        userFlag = generateRandomString(5);
      }
    }
    let newValue = [...serviceList];
    serviceList[idx].plan[didx].loading = true;
    setServiceList(newValue);
    let result = await fecther(
      "accountorder/",
      { time, type, flag: isLogin ? "None" : userFlag },
      "post"
    );
    serviceList[idx].plan[didx].loading = false;
    setServiceList(newValue);
    if (result.code !== 200) {
      dispatch(changeMessage(["系统繁忙,请稍后再试", false]));
      return;
    }
    setOrderInfo({
      ...result.order,
      expire_time: result.order.create_time + QRCODE_FLUSH_TIME,
      qrstate: true,
    });
    setCreateRoomModel(true);
  };

  // 二维码到期
  const captureChangeQr = () => {
    setOrderInfo({
      ...OrderInfo,
      qrstate: OrderInfo.expire_time > new Date().getTime() / 1000,
    });
  };

  // 刷新code
  const flush = async () => {
    if (isFlushingRef.current) {
      dispatch(changeMessage(["刷新中", false]));
      return;
    }
    isFlushingRef.current = true;
    let result = await fecther(
      "accountorder/",
      {
        order_id: OrderInfo.order_id,
        flag: isLogin ? "None" : getStorage("userFlag"),
      },
      "put"
    );
    if (result.code == 200) {
      if (WsRef.current) {
        WsRef.current.close();
        WsRef.current = null;
      }
      let newValue = { ...OrderInfo };
      newValue.create_time = result.order.create_time;
      newValue.expire_time = newValue.create_time + QRCODE_FLUSH_TIME;
      newValue.qrcode = result.order.qrcode;
      newValue.discountPrice = result.order.discountPrice;
      newValue.order_id = result.order.order_id;
      newValue.qrstate = true;
      setOrderInfo(newValue);
    } else {
      dispatch(changeMessage([result.message, false]));
    }
  };

  // 打开二维码后 连接支付回调
  const connectPayNotify = (orderid: string) => {
    WsRef.current = new WebSocket(`${WEBSOCKER_HOST}notify/${orderid}/`);
    WsRef.current.onopen = () => {
      if (!WsRef.current) return;
      WsRef.current.onmessage = (event) => {
        let jsonMsg = JSON.parse(event.data);
        if (jsonMsg.message === "已付款") {
          setPayedInfo({
            ...PayedInfo,
            isPayed: 1,
          });
        } else if (!jsonMsg.message.includes("分配失败")) {
          setPayedInfo({
            username: JSON.parse(jsonMsg.message).username,
            password: JSON.parse(jsonMsg.message).password,
            seat: JSON.parse(jsonMsg.message).seat,
            isPayed: 2,
          });
        }
      };
    };
  };

  // 使用折扣码
  const useDiscount = async (code: string) => {
    if (isUseingDiscount.current) {
      dispatch(changeMessage(["正在使用折扣码中", false]));
      return;
    }
    if (!isLogin) {
      dispatch(changeMessage(["登录后才能使用折扣码", false]));
      return;
    }
    isUseingDiscount.current = true;
    let result = await fecther(
      "paystate/",
      {
        orderId: OrderInfo.order_id,
        discountCode: code,
        roomId: "account",
      },
      "post"
    );
    if (result.code === 200) {
      if (WsRef.current) {
        WsRef.current.close();
        WsRef.current = null;
      }
      setOrderInfo({
        ...OrderInfo,
        discountPrice: result.discountPrice,
        order_id: result.order_id,
        qrcode: result.qrcode,
        qrstate: true,
        expire_time: new Date().getTime() / 1000 + QRCODE_FLUSH_TIME,
      });
    }
    dispatch(
      changeMessage([result.message, result.code === 200 ? true : false])
    );
    isUseingDiscount.current = false;
  };

  useEffect(() => {
    if (
      OrderInfo.order_id !== "" &&
      createRoomModel === true &&
      WsRef.current === null
    ) {
      connectPayNotify(OrderInfo.order_id);
    } else {
      WsRef.current?.close();
      WsRef.current = null;
    }
  }, [OrderInfo.order_id, createRoomModel]);

  return (
    <>
      <StoreWrap>
        <div className="title">🎉无需组队,选择你喜欢的计划后即可享受服务</div>
        <div className="plan">
          {serviceList.map((item, index) => {
            return (
              <div key={item.key}>
                <img className="logo" src={item.icon} alt="logo" />
                <div className="render_item">
                  {item.plan.map((childitem, indexdeep) => {
                    return (
                      <div className="item" key={childitem.key}>
                        <div className="plantitle">{childitem.level}</div>
                        <div
                          className="wrap"
                          style={{
                            backgroundImage: 'url("' + childitem.image + '")',
                          }}
                        >
                          {childitem.includes.map((childistem) => {
                            return (
                              <div className="items" key={childistem.key}>
                                <span style={{}}>✔</span>
                                {childistem.title}
                              </div>
                            );
                          })}
                          <Button
                            className="buy btn"
                            loading={childitem.loading}
                            onClick={() =>
                              childitem.emtry
                                ? null
                                : buy(
                                    item.type,
                                    childitem.time,
                                    index,
                                    indexdeep
                                  )
                            }
                          >
                            {childitem.emtry
                              ? "补货中"
                              : `立即购买 ￥${childitem.money}`}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center" }}>敬请期待更多Plan</div>
      </StoreWrap>
      <Modal
        title="付款 - 微信支付"
        centered
        open={createRoomModel}
        onCancel={() => setCreateRoomModel(false)}
        footer={[]}
        width={350}
      >
        <BuyAccount
          useDiscount={useDiscount}
          payinfo={PayedInfo}
          time={OrderInfo.time}
          flush={flush}
          qrcodeExpire={captureChangeQr}
          qrcode={OrderInfo.qrcode}
          qrstate={OrderInfo.qrstate}
          price={OrderInfo.price}
          discountPrice={OrderInfo.discountPrice}
          isLogin={isLogin}
          timeLeft={OrderInfo.expire_time}
        />
      </Modal>
    </>
  );
};

export default Store;
