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

type Props = {};

const Store = (props: Props) => {
  const dispatch = useAppDispatch();
  const [serviceList, setServiceList] = React.useState([
    {
      icon: require("../assets/images/logo/netflix.png"),
      key: nanoid(),
      type: "netflix",
      plan: [
        {
          time: 30,
          key: nanoid(),
          level: "略有小成",
          image: require("../assets/images/30.png"),
          includes: [
            { title: "Netflix标准会员 30天", key: nanoid() },
            { title: "平台邮箱 安全同行", key: nanoid() },
            { title: "密码变更邮件推送", key: nanoid() },
            { title: "账号有效期内免费质保", key: nanoid() },
            { title: "5秒出货 无需等待", key: nanoid() },
          ],
          money: 16,
          loading: false,
        },
        {
          time: 90,
          key: nanoid(),
          level: "初出茅庐",
          image: require("../assets/images/90.png"),
          includes: [
            { title: "Netflix标准会员 90天", key: nanoid() },
            { title: "平台邮箱 安全同行", key: nanoid() },
            { title: "密码变更邮件推送", key: nanoid() },
            { title: "账号有效期内免费质保", key: nanoid() },
            { title: "5秒出货 无需等待", key: nanoid() },
          ],
          money: 40,
          loading: false,
        },
        {
          time: 180,
          key: nanoid(),
          level: "登堂入室",
          image: require("../assets/images/180.png"),
          includes: [
            { title: "Netflix标准会员 180天", key: nanoid() },
            { title: "平台邮箱 安全同行", key: nanoid() },
            { title: "密码变更邮件推送", key: nanoid() },
            { title: "账号有效期内免费质保", key: nanoid() },
            { title: "5秒出货 无需等待", key: nanoid() },
          ],
          money: 70,
          loading: false,
        },
        {
          time: 365,
          key: nanoid(),
          level: "渐入佳境",
          image: require("../assets/images/365.png"),
          includes: [
            { title: "Netflix标准会员 365天", key: nanoid() },
            { title: "平台邮箱 安全同行", key: nanoid() },
            { title: "密码变更邮件推送", key: nanoid() },
            { title: "账号有效期内免费质保", key: nanoid() },
            { title: "5秒出货 无需等待", key: nanoid() },
          ],
          money: 100,
          loading: false,
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
  const timerRef = React.useRef();
  const WsRef = React.useRef<WebSocket | null>(null);
  const [PayedInfo, setPayedInfo] = React.useState({
    username: "",
    password: "",
    isPayed: 0,
  });

  const buy = async (type: string, time: number, idx: number, didx: number) => {
    let newValue = [...serviceList];
    serviceList[idx].plan[didx].loading = true;
    setServiceList(newValue);
    let result = await fecther(
      "accountorder/",
      { time, type, flag: isLogin ? "None" : generateRandomString(5) },
      "post"
    );
    serviceList[idx].plan[didx].loading = false;
    setServiceList(newValue);
    if (result.code !== 200) {
      dispatch(changeMessage(["商品已下架", false]));
      return;
    }
    setOrderInfo({
      ...result.order,
      expire_time: result.order.create_time + 60 * 3,
      qrstate: true,
    });
    setCreateRoomModel(true);
  };

  // 检查二维码是否到期
  const captureChangeQr = () => {
    if (!createRoomModel) {
      if (timerRef === null || !OrderInfo.qrstate) return;
      // @ts-ignore
      clearInterval(timerRef.current);
    } else {
      if (!OrderInfo.qrstate) return;
      if (
        OrderInfo.qrstate ===
        OrderInfo.expire_time > new Date().getTime() / 1000
      ) {
      } else {
        setOrderInfo({
          ...OrderInfo,
          qrstate: OrderInfo.expire_time > new Date().getTime() / 1000,
        });
      }
      // @ts-ignore
      timerRef.current = setInterval(() => {
        if (
          OrderInfo.qrstate ===
          OrderInfo.expire_time > new Date().getTime() / 1000
        )
          return;
        setOrderInfo({
          ...OrderInfo,
          qrstate: OrderInfo.expire_time > new Date().getTime() / 1000,
        });
        // @ts-ignore
        clearInterval(timerRef.current);
      }, 1000);
    }
  };

  // 刷新code
  const flush = async () => {
    let result = await fecther(
      "accountorder/",
      { order_id: OrderInfo.order_id },
      "put"
    );
    if (result.code == 200) {
      let newValue = { ...OrderInfo };
      newValue.create_time = parseInt(new Date().getTime() / 1000 + "");
      newValue.expire_time = newValue.create_time + 60 * 3;
      newValue.qrstate = true;
      setOrderInfo(newValue);
    } else {
      dispatch(changeMessage(["刷新二维码失败", false]));
    }
  };

  const connectPayNotify = (orderid: string) => {
    WsRef.current = new WebSocket(`ws://192.168.31.69/ws/notify/${orderid}/`);
    WsRef.current.onopen = () => {
      if (!WsRef.current) return;
      WsRef.current.onmessage = (event) => {
        let jsonMsg = JSON.parse(event.data);
        if (jsonMsg.message === "已付款") {
          setPayedInfo({ ...PayedInfo, isPayed: 1 });
        } else if (!jsonMsg.message.includes("分配失败")) {
          setPayedInfo({
            username: JSON.parse(jsonMsg.message).username,
            password: JSON.parse(jsonMsg.message).password,
            isPayed: 2,
          });
        }
      };
    };
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

  // @ts-ignore
  React.useEffect(() => {
    if (!createRoomModel) {
      // @ts-ignore
      timerRef.current = null;
    } else {
      captureChangeQr();
    }
    //@ts-ignore
    return () => (timerRef.current = null);
  }, [createRoomModel]);

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
                              buy(item.type, childitem.time, index, indexdeep)
                            }
                          >
                            立即购买 ￥{childitem.money}
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
          payinfo={PayedInfo}
          flush={flush}
          qrcode={OrderInfo.qrcode}
          qrstate={OrderInfo.qrstate}
          price={OrderInfo.price}
          discountPrice={OrderInfo.discountPrice}
          isLogin={isLogin}
        />
      </Modal>
    </>
  );
};

export default Store;
