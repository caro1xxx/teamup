import React from "react";
import { OrderFieldsState } from "../../types/componentsPropsTypes";
import { PayedOrderWrap } from "../../style/other";
import { parseStampTime } from "../../utils/tools";
import { Empty } from "antd";
import { fecther } from "../../utils/fecther";
import { useAppDispatch } from "../../redux/hooks";
import { changeMessage } from "../../redux/modules/notifySlice";

const Order = (props: { order: OrderFieldsState[] }) => {
  const dispatch = useAppDispatch();
  const changePassword = async (username: string) => {
    let result = await fecther(
      `changepwdaccount/?account=${username}`,
      {},
      "get"
    );
    dispatch(
      changeMessage([result.message, result.code === 200 ? true : false])
    );
  };

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
                  <div
                    className="change"
                    onClick={() => changePassword(item.username)}
                  >
                    修改密码
                  </div>
                </div>
                <div className="ac">
                  座位PIN:{item.seat_code} 座位号:{item.seat_number}号位
                </div>
              </div>
            );
          })}
        </>
      )}
    </PayedOrderWrap>
  );
};

export default Order;
