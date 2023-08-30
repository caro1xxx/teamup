import React from "react";
import { OrderFieldsState } from "../../types/componentsPropsTypes";
import { PayedOrderWrap } from "../../style/other";
import { parseStampTime } from "../../utils/tools";
import { Empty } from "antd";

const Order = (props: { order: OrderFieldsState[] }) => {
  return (
    <PayedOrderWrap>
      {props.order.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          {props.order.map((item) => {
            return (
              <div className="warp" key={item.key}>
                <div style={{ textAlign: "center", fontSize: "10px" }}>
                  {parseStampTime(item.user_buy_expire_time)}到期
                </div>
                <div className="ac">账号:{item.username}</div>
                <div className="ac changepwd">
                  <div>密码:{item.password}</div>
                  <div className="change">修改密码</div>
                </div>
                <div className="ac">座位PIN:{item.seat_code}</div>
              </div>
            );
          })}
        </>
      )}
    </PayedOrderWrap>
  );
};

export default Order;
