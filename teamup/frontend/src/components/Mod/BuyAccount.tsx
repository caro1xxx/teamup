import React from "react";
import { QRCode, Input } from "antd";
import styled from "styled-components";
type Props = {
  qrcode: string;
  qrstate: boolean;
  flush: () => Promise<void>;
  price: number;
  discountPrice: number;
};

const Wrap = styled.div`
  .detail {
    display: flex;
    padding: 3px 10px;
  }
  .price {
    flex: 1;
    display: flex;
    vertical-align: top;
    justify-content: end;
    align-items: center;
  }
`;

const { Search } = Input;

const BuyAccount = (props: Props) => {
  return (
    <Wrap>
      <QRCode
        size={300}
        value={props.qrcode}
        status={props.qrstate ? "active" : "expired"}
        color="#05b665"
        bordered={false}
        onRefresh={props.flush}
      />
      <div className="detail">
        <div className="title">订单价格:</div>
        <div className="price">{props.price}</div>
      </div>
      <div className="detail">
        <div className="title">优惠价格:</div>
        <div className="price">
          随机立减 -{(props.price - props.discountPrice).toFixed(2)}
        </div>
      </div>
      <div className="detail">
        <div className="title">实际价格:</div>
        <div className="price">{props.discountPrice}</div>
      </div>
      <Search
        style={{ width: "95%", margin: "0px 10px", marginTop: "10px" }}
        size="middle"
        placeholder="折扣码"
        // onSearch={onSearch}
        enterButton="使用"
      />
    </Wrap>
  );
};

export default BuyAccount;
