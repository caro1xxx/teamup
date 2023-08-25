import React from "react";
import { QRCode, Input } from "antd";
import styled from "styled-components";
import { LoadingWrap, AccountInfoWrap } from "../../style/other";
import { parseStampTime } from "../../utils/tools";

type Props = {
  qrcode: string;
  qrstate: boolean;
  flush: () => Promise<void>;
  price: number;
  discountPrice: number;
  isLogin: boolean;
  useDiscount: (code: string) => Promise<void>;
  time: number;
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
  const [isLoading, setLoading] = React.useState(false);

  const use = (e: string) => {
    setLoading(true);
    props.useDiscount(e);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Wrap>
      {props.payinfo.isPayed === 1 ? (
        <Loading />
      ) : props.payinfo.isPayed == 2 ? (
        <AccountInfo
          username={props.payinfo.username}
          password={props.payinfo.password}
          isLogin={props.isLogin}
          time={props.time}
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
              {props.price - props.discountPrice < 1 ? "随机立减" : "折扣码"} -
              {(props.price - props.discountPrice).toFixed(2)}
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
            onSearch={(e) => use(e)}
            loading={isLoading}
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
  time: number;
}) => {
  return (
    <AccountInfoWrap>
      <div className="contentwrap">
        <div style={{ fontWeight: "bolder" }}>TEAMUP ACCOUNT CARD</div>
        <img
          className="type"
          src={require("../../assets/images/logo/netflix.png")}
          alt=""
        />
        <div className="info">
          <div>
            <div className="account">账号:</div>
            <div className="account_">{props.username}</div>
          </div>
          <div>
            <div className="password">密码:</div>
            <div className="password_">{props.password}</div>
          </div>
        </div>
        <div className="exprie_time">
          <div>
            {parseStampTime(
              parseInt(new Date().getTime() / 1000 + "") +
                props.time * 60 * 60 * 24
            )}
            到期
          </div>
        </div>
        {props.isLogin == null ? null : (
          <div className="hint">登录后购买账号可享受平台免费保管</div>
        )}
      </div>
    </AccountInfoWrap>
  );
};
