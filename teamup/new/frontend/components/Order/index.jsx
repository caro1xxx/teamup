import React from "react";
import { Wrap } from "./style.jsx";
import Image from "next/image";
import Wechatpay from "../../assets/icon/wechatpay.png";
import twitter from "../../assets/icon/twitter.png";
import facebook from "../../assets/icon/facebook.png";
import wechat from "../../assets/icon/wechat.png";
import close from "../../assets/icon/close.png";
import { getCurrentDateFormatted } from "../../utils/tools.js";
import { QRCodeSVG } from "qrcode.react";

const index = (props) => {
  return (
    <Wrap>
      <div className="body">
        <Image
          onClick={props.close}
          className="close"
          src={close}
          width={30}
          height={30}
          alt="close"
        />
        <div className="title">
          <div>Teamup</div>
          <div style={{ textAlign: "end" }}>{getCurrentDateFormatted()}</div>
        </div>
        <div className="text">
          <div style={{ fontWeight: "normal" }}>感谢您的购买</div>
          <div style={{ fontSize: "12px", marginTop: "10px" }}>
            在您付款完毕后,账号信息将会显示出来并且同时发送到您的邮箱,在使用过程中遇到任何问题都可以联系我们
            09:00 - 24:00.
            <br />
            并且你也可以关注官方公众号:teamupteam 获取更多折扣
          </div>
        </div>
        <div className="order">订单号:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1N</div>
        <div className="good">
          <div className="top">
            <div className="id">#</div>
            <div className="product">产品</div>
            <div className="count">数量</div>
            <div className="price">价格</div>
          </div>
          <div className="content">
            <div className="id">1</div>
            <div className="product">Netflix Premium7天账号</div>
            <div className="count">1</div>
            <div className="price">￥10.00</div>
          </div>
          <div className="content">
            <div className="id">2</div>
            <div className="product">密码变更邮件通知</div>
            <div className="count">1</div>
            <div className="price">平台赠送</div>
          </div>
          <div className="content">
            <div className="id">3</div>
            <div className="product">续费不换号</div>
            <div className="count">1</div>
            <div className="price">平台赠送</div>
          </div>
          <div className="bottom">
            <div className="sum">总计</div>
            <div className="sum_price">￥0.00</div>
          </div>
        </div>
        <div className="discount">
          <input type="text" placeholder="折扣码" />
          <div className="check">验证</div>
        </div>
        <div className="pay">
          <Image src={Wechatpay} width={20} height={20} alt="pay" />
          <div>微信支付</div>
        </div>
        <div className="qrcode">
          <QRCodeSVG
            value="https://reactjs.org/"
            size={150}
            fgColor="#eb3329"
          />
          ,
        </div>
        <div className="public">
          <div className="question">
            <div>有问题请联系微信公众号</div>
            <div className="icon">
              <Image src={twitter} width={15} height={15} alt="icon" />
              <Image src={facebook} width={15} height={15} alt="icon" />
              <Image src={wechat} width={15} height={15} alt="icon" />
            </div>
          </div>
        </div>
      </div>
    </Wrap>
  );
};

export default index;
