import React from "react";
import { OrderFieldsState } from "../../types/componentsPropsTypes";
import { PayedOrderWrap } from "../../style/other";
import { parseStampTime } from "../../utils/tools";
const Order = (props: { order: OrderFieldsState[] }) => {
  return (
    <PayedOrderWrap>
      {props.order.map((item) => {
        return (
          <div className="warp" key={item.key}>
            <div style={{ textAlign: "center", fontSize: "10px" }}>
              {parseStampTime(item.user_buy_expire_time)}到期
            </div>
            <div className="ac">账号:{item.username}</div>
            <div className="ac">账号:{item.password}</div>
          </div>
        );
      })}
    </PayedOrderWrap>
  );
};

export default Order;
