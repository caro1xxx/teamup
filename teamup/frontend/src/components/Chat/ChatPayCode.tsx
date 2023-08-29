import React from "react";
import { Tooltip, Input, QRCode } from "antd";
import { PayCodeWrap, PayCodeBodyWrap } from "../../style/chat";
import WechatPayIcon from "../../assets/images/wechat.png";
import LoadingPayIcon from "../../assets/images/loadingpay.png";
import SuccessIcon from "../../assets/images/success.png";
type Props = {
  qrcode: string;
  expire_time: number;
  price: number;
  discountPrice: number;
  isOpenQr: boolean;
  payState: number;
  flushQr: () => void;
  useDiscount: (code: string) => Promise<void>;
};

const ChatPayCode = (props: Props) => {
  const [qrState, setQrState] = React.useState(true);
  const timerRef = React.useRef(null);

  const manualOpenPayCode = () => {
    let paycodeEle = document.getElementById("paycode");
    paycodeEle?.click();
  };

  // 检查二维码是否到期
  const captureChangeQr = (open: boolean) => {
    if (!open) {
      if (timerRef === null || !qrState) return;
      // @ts-ignore
      clearInterval(timerRef.current);
    } else {
      if (!qrState) return;
      if (qrState === props.expire_time > new Date().getTime() / 1000) {
      } else {
        setQrState(props.expire_time > new Date().getTime() / 1000);
      }
      // @ts-ignore
      timerRef.current = setInterval(() => {
        if (qrState === props.expire_time > new Date().getTime() / 1000) return;
        setQrState(props.expire_time > new Date().getTime() / 1000);
        // @ts-ignore
        clearInterval(timerRef.current);
      }, 1000);
    }
  };

  React.useEffect(() => {
    if (!props.isOpenQr) return;
    setTimeout(() => {
      manualOpenPayCode();
    });
  }, [props.isOpenQr]);

  React.useEffect(() => {
    if (props.expire_time === 0) return;
    setQrState(true);
  }, [props.expire_time]);

  return (
    <Tooltip
      autoAdjustOverflow
      title={
        props.payState === 0 ? (
          <PayCodeBody
            flushQr={props.flushQr}
            qrcode={props.qrcode}
            expire_time={props.expire_time}
            price={props.price}
            qrstate={qrState}
            discountPrice={props.discountPrice}
            useDiscount={props.useDiscount}
          />
        ) : (
          "支付成功"
        )
      }
      onOpenChange={(open) => captureChangeQr(open)}
      trigger={["click"]}
    >
      <PayCodeWrap id="paycode">
        {props.payState === 0 ? (
          <div>
            付款 <img src={LoadingPayIcon} alt="loading" />
          </div>
        ) : (
          <div>
            已付款 <img src={SuccessIcon} alt="success" />
          </div>
        )}
      </PayCodeWrap>
    </Tooltip>
  );
};

export default ChatPayCode;

const { Search } = Input;

type PayCodeBodyProps = {
  qrcode: string;
  expire_time: number;
  price: number;
  discountPrice: number;
  qrstate: boolean;
  flushQr: () => void;
  useDiscount: (code: string) => Promise<void>;
};

const PayCodeBody = (props: PayCodeBodyProps) => {
  const [isLoading, setLoading] = React.useState(false);

  const use = (e: string) => {
    setLoading(true);
    props.useDiscount(e);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <PayCodeBodyWrap>
      <div className="title">
        <img src={WechatPayIcon} alt="pay" />
        <div>微信扫码支付</div>
      </div>
      <QRCode
        value={props.qrcode}
        status={props.qrstate ? "active" : "expired"}
        color="#05b665"
        bordered={false}
        size={200}
        onRefresh={props.flushQr}
      />
      <div className="detail">
        <div className="price">
          <div>订单价格:</div>
          <div className="value">¥{props.price}</div>
        </div>
        <div className="price">
          <div>优惠:</div>
          <div className="value">
            {props.discountPrice}
            {props.price - props.discountPrice >= 1 ? "折扣码" : "随机立减"} -
            {(props.price - props.discountPrice).toFixed(2)}
          </div>
        </div>
        <div className="price">
          <div>实际价格:</div>
          <div className="value">¥{props.discountPrice}</div>
        </div>
        <Search
          style={{ width: "180px" }}
          loading={isLoading}
          size="small"
          placeholder="折扣码"
          onSearch={(e) => use(e)}
          enterButton="使用"
        />
      </div>
    </PayCodeBodyWrap>
  );
};
