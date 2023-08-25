import React from "react";
import { UserPayWrap } from "../../style/chat";
import { Tooltip } from "antd";
type Props = {
  data: {
    order_id: string;
    price: number;
    qrcode: string;
    state: number;
    user: string;
    avatorColor: string;
    discountPrice: number;
  }[];
};

const ChatUserPayState = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#0f0f10",
        marginLeft: "10px",
        borderRadius: "10px",
        height: "30px",
      }}
    >
      {props.data.map((item) => {
        return (
          <UserPayWrap
            $state={item.state}
            $color={item.avatorColor}
            key={item.order_id}
          >
            <Tooltip
              title={
                item.state === 0
                  ? `等待${item.user}支付`
                  : `${item.user}支付完毕`
              }
            >
              {item.state === 0 ? (
                <div className="loading">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                item.user.charAt(0)
              )}
            </Tooltip>
          </UserPayWrap>
        );
      })}
    </div>
  );
};

export default ChatUserPayState;
