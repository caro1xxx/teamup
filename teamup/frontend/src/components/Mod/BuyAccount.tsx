import React from "react";
import { QRCode, Input } from "antd";
import styled from "styled-components";
import { LoadingWrap, AccountInfoWrap } from "../../style/other";

type Props = {
  qrcode: string;
  qrstate: boolean;
  flush: () => Promise<void>;
  price: number;
  discountPrice: number;
  isLogin: boolean;
  payinfo: {
    username: string;
    password: string;
    isPayed: number;
  };
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
      {props.payinfo.isPayed === 1 ? (
        <Loading />
      ) : props.payinfo.isPayed == 2 ? (
        <AccountInfo
          username={props.payinfo.username}
          password={props.payinfo.password}
          isLogin={props.isLogin}
        />
      ) : (
        <>
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
        </>
      )}
    </Wrap>
  );
};

export default BuyAccount;

const Loading = () => {
  return (
    <LoadingWrap>
      <div className="loadingwrap">
        <div className="loading"></div>
      </div>
      <div className="text">正在生成账号中</div>
    </LoadingWrap>
  );
};

const AccountInfo = (props: {
  username: string;
  password: string;
  isLogin: boolean;
}) => {
  return (
    <AccountInfoWrap>
      <div>
        <div className="contentwrap">
          <div>账号:</div>
          <div className="content">{props.username}</div>
        </div>
        <div className="contentwrap">
          <div>密码:</div>
          <div className="content">{props.password}</div>
        </div>
        {props.isLogin ? null : (
          <div className="hint">
            由于你未登录,平台无法保存订单,请你妥善保管账号消息
          </div>
        )}
      </div>
    </AccountInfoWrap>
  );
};
