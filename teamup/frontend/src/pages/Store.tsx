import React from "react";
import { StoreWrap } from "../style/pages";
import { nanoid } from "nanoid";
import { Modal } from "antd";
import BuyAccount from "../components/Mod/BuyAccount";
import { fecther } from "../utils/fecther";
import { useAppSelector } from "../redux/hooks";
import { generateRandomString } from "../utils/tools";
import { useAppDispatch } from "../redux/hooks";
import { changeMessage } from "../redux/modules/notifySlice";
type Props = {};

const Store = (props: Props) => {
  const dispatch = useAppDispatch();
  const [serviceList] = React.useState([
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
        },
        {
          time: 90,
          key: nanoid(),
          level: "登堂入室",
          image: require("../assets/images/90.png"),
          includes: [
            { title: "Netflix标准会员 90天", key: nanoid() },
            { title: "平台邮箱 安全同行", key: nanoid() },
            { title: "密码变更邮件推送", key: nanoid() },
            { title: "账号有效期内免费质保", key: nanoid() },
            { title: "5秒出货 无需等待", key: nanoid() },
          ],
          money: 40,
        },
        {
          time: 180,
          key: nanoid(),
          level: "初出茅庐",
          image: require("../assets/images/180.png"),
          includes: [
            { title: "Netflix标准会员 180天", key: nanoid() },
            { title: "平台邮箱 安全同行", key: nanoid() },
            { title: "密码变更邮件推送", key: nanoid() },
            { title: "账号有效期内免费质保", key: nanoid() },
            { title: "5秒出货 无需等待", key: nanoid() },
          ],
          money: 70,
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

  const buy = async (type: string, time: number) => {
    let result = await fecther(
      "accountorder/",
      { time, type, flag: isLogin ? "None" : generateRandomString(5) },
      "post"
    );
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
          {serviceList.map((item) => {
            return (
              <div key={item.key}>
                <img className="logo" src={item.icon} alt="logo" />
                <div className="render_item">
                  {item.plan.map((childitem, index) => {
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
                          <div
                            className="buy"
                            onClick={() => buy(item.type, childitem.time)}
                          >
                            立即购买 ￥{childitem.money}
                          </div>
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
          flush={flush}
          qrcode={OrderInfo.qrcode}
          qrstate={OrderInfo.qrstate}
          price={OrderInfo.price}
          discountPrice={OrderInfo.discountPrice}
        />
      </Modal>
    </>
  );
};

export default Store;
