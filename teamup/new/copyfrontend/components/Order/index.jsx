import React from "react";
import { Wrap } from "./style.jsx";
import Image from "next/image";
import Wechatpay from "../../assets/icon/wechatpay.png";
import twitter from "../../assets/icon/twitter.png";
import facebook from "../../assets/icon/facebook.png";
import wechat from "../../assets/icon/wechat.png";
import close from "../../assets/icon/close.png";
import { getCurrentDateFormatted, getCurrentTs } from "../../utils/tools.js";
import { QRCodeSVG } from "qrcode.react";
import { useCountDown, useWebSocket } from "ahooks";
import { Button } from "antd";

const index = (props) => {
  const codeRef = React.useRef("");
  const [loading, setLoadings] = React.useState(false);
  const [accountInfo, setAccountInfo] = React.useState({
    username: "",
    password: "",
    seat_number: "",
    seat_pin: "",
  });
  // connect
  const { readyState, latestMessage, disconnect } = useWebSocket(
    props.order.order_id &&
      props.order.order_qrcode &&
      props.order.qrcode_expire_time > getCurrentTs()
      ? `ws://192.168.31.69/ws/notify/${props.order.order_id}/`
      : ""
  );

  // 使用折扣码
  const useCode = (order_id) => {
    props.code(order_id, codeRef.current);
  };

  // 倒计时
  const [countdown] = useCountDown({
    leftTime: props.order.qrcode_expire_time * 1000 - new Date().getTime(),
    onEnd: () => {
      readyState === 1 && disconnect();
    },
  });

  React.useEffect(() => {
    if (latestMessage) {
      const payNotify = JSON.parse(latestMessage.data);
      if (payNotify.message.message === "success") {
        readyState === 1 && disconnect();
        setAccountInfo({ ...payNotify.message });
      }
    }
    return () => readyState === 1 && disconnect();
  }, [latestMessage]);

  return (
    <Wrap>
      <div className="body">
        <Image
          onClick={props.close}
          className="close"
          src={close}
          width={30}
          height={30}
          alt="close"
        />
        <div className="title">
          <div>Teamup</div>
          <div style={{ textAlign: "end" }}>{getCurrentDateFormatted()}</div>
        </div>
        <div className="text">
          <div style={{ fontWeight: "normal" }}>感谢您的购买</div>
          <div style={{ fontSize: "12px", marginTop: "10px" }}>
            在您付款完毕后,账号信息将会显示出来并且同时发送到您的邮箱,在使用过程中遇到任何问题都可以联系我们
            09:00 - 24:00.
            <br />
            并且你也可以关注官方公众号:teamupteam 获取更多折扣
          </div>
        </div>
        <div className="order">订单号:{props.order.order_id}</div>
        <div className="good">
          <div className="top">
            <div className="id">#</div>
            <div className="product">产品</div>
            <div className="count">数量</div>
            <div className="price">价格</div>
          </div>
          <div className="content">
            <div className="id">1</div>
            <div className="product">
              Netflix Premium{props.order.use_time}天
            </div>
            <div className="count">1</div>
            <div className="price">￥{props.order.order_price}</div>
          </div>
          <div className="content">
            <div className="id">2</div>
            <div className="product">密码变更邮件通知</div>
            <div className="count">1</div>
            <div className="price">平台赠送</div>
          </div>
          <div className="content">
            <div className="id">3</div>
            <div className="product">续费不换号</div>
            <div className="count">1</div>
            <div className="price">平台赠送</div>
          </div>
          {props.order.order_amount === props.order.order_price ? null : (
            <div className="content">
              <div className="id">4</div>
              <div className="product">
                {!props.order.discount_code
                  ? "随机立减"
                  : `折扣码${props.order.discount_code}`}
              </div>
              <div className="count">1</div>
              <div className="price">
                -{" "}
                {(props.order.order_price - props.order.order_amount).toFixed(
                  2
                )}
              </div>
            </div>
          )}
          <div className="bottom">
            <div className="sum">总计</div>
            <div className="sum_price">￥{props.order.order_amount}</div>
          </div>
        </div>
        {accountInfo.username ? (
          <div className="account">
            <div>账号:{accountInfo.username}</div>
            <div>密码:{accountInfo.password}</div>
            <div>座位号:{accountInfo.seat_number}号位(从左往右数)</div>
            <div>PIN码:{accountInfo.seat_pin}</div>
            <div style={{ fontSize: "12px", marginTop: "5px" }}>
              请按规定座位入座,禁止修改密码(如需修改密码请点击购物车提交申请或联系客服)
              否则您将失去账号享有权
            </div>
          </div>
        ) : (
          <>
            {props.order.discount_code || props.order.order_qrcode ? null : (
              <div className="discount">
                <input
                  type="text"
                  placeholder="折扣码"
                  onChange={(e) => (codeRef.current = e.target.value)}
                />
                <div
                  className="check"
                  onClick={() => useCode(props.order.order_id)}
                >
                  使用
                </div>
              </div>
            )}
            {props.order.order_qrcode && countdown !== 0 ? (
              <div className="qrcode">
                <div>
                  <QRCodeSVG
                    value={props.order.order_qrcode}
                    size={150}
                    fgColor="#eb3329"
                  />
                </div>
                <div style={{ marginTop: "10px", fontSize: "12px" }}>
                  二维码将于
                  <span style={{ color: "red" }}>
                    {Math.round(countdown / 1000)}
                  </span>
                  秒后失效
                </div>
              </div>
            ) : (
              <Button
                className="pay"
                onClick={() => {
                  setLoadings(true);
                  props.pay(props.order.order_id);
                  setTimeout(() => setLoadings(false), 2000);
                }}
              >
                <Image src={Wechatpay} width={20} height={20} alt="pay" />
                <div>微信支付</div>
              </Button>
            )}
          </>
        )}
        <div className="public">
          <div className="question">
            <div>有问题请联系微信公众号</div>
            <div className="icon">
              <Image src={twitter} width={15} height={15} alt="icon" />
              <Image src={facebook} width={15} height={15} alt="icon" />
              <Image src={wechat} width={15} height={15} alt="icon" />
            </div>
          </div>
        </div>
      </div>
    </Wrap>
  );
};

export default index;
