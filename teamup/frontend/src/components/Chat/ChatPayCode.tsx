import React from "react";
import { Tooltip } from "antd";
import { PayCodeWrap, PayCodeBodyWrap } from "../../style/chat";
import WechatPayIcon from "../../assets/images/wechat.png";
import { parseStampTime } from "../../utils/tools";
type Props = { qrcode: string; expire_time: number };

const ChatPayCode = (props: Props) => {
  return (
    <Tooltip
      autoAdjustOverflow
      title={
        <PayCodeBody qrcode={props.qrcode} expire_time={props.expire_time} />
      }
      trigger={["click", "hover"]}
    >
      <PayCodeWrap>付款</PayCodeWrap>
    </Tooltip>
  );
};

export default ChatPayCode;

const PayCodeBody = (props: Props) => {
  return (
    <PayCodeBodyWrap>
      <div className="title">
        <img src={WechatPayIcon} alt="pay" />
        <div>微信扫码支付</div>
      </div>
      <img
        style={{ width: "200px", padding: "10px" }}
        src={`http://192.168.31.69/media${props.qrcode}`}
        alt="qr"
      />
      <div style={{ fontSize: "10px", textAlign: "center" }}>
        二维码于{parseStampTime(props.expire_time)}到期
      </div>
    </PayCodeBodyWrap>
  );
};
