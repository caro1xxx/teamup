import React from "react";
import { Tooltip, Input, QRCode } from "antd";
import { PayCodeWrap, PayCodeBodyWrap } from "../../style/chat";
import WechatPayIcon from "../../assets/images/wechat.webp";
import LoadingPayIcon from "../../assets/images/loadingpay.webp";
import SuccessIcon from "../../assets/images/success.webp";
import { useCountDown } from "ahooks";
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

  const manualOpenPayCode = () => {
    let paycodeEle = document.getElementById("paycode");
    paycodeEle?.click();
  };

  React.useEffect(() => {
    if (props.expire_time === 0 || qrState === true) return;
    setQrState(true);
  }, [props.expire_time]);

  React.useEffect(() => {
    if (!props.isOpenQr) return;
    setTimeout(() => {
      manualOpenPayCode();
    });
  }, [props.isOpenQr]);

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
            setqr={setQrState}
          />
        ) : (
          "支付成功"
        )
      }
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
  setqr: React.Dispatch<React.SetStateAction<boolean>>;
};

const PayCodeBody = (props: PayCodeBodyProps) => {
  const [isLoading, setLoading] = React.useState(false);
  const [countdown] = useCountDown({
    leftTime: props.expire_time * 1000 - new Date().getTime(),
    onEnd: () => {
      props.setqr(false);
    },
  });

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
      <div style={{ textAlign: "center", fontSize: "12px" }}>
        {countdown === 0 ? (
          "二维码已失效,请刷新"
        ) : (
          <>
            二维码于
            <span style={{ color: "red" }}>
              {Math.round(countdown / 1000)}秒
            </span>
            后失效
          </>
        )}
      </div>
      <div className="detail">
        <div className="price">
          <div>订单价格:</div>
          <div className="value">¥{props.price}</div>
        </div>
        <div className="price">
          <div>优惠:</div>
          <div className="value">
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
