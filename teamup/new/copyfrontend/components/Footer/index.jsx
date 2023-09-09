import React from "react";
import { Wrap, Logos } from "./style";
import Image from "next/image";
import Public from "../../assets/images/public.png";
import Logo from "../../assets/images/logo.png";
const index = () => {
  return (
    <footer>
      <Wrap>
        <div className="wrap">
          <div className="title">TEAMUP</div>
          <div>关于</div>
          <div>开发</div>
          <div>帮助</div>
        </div>
        <div className="wrap">
          <div className="title">隐私</div>
          <div>网站隐私声明</div>
          <div>Cookies</div>
          <div>无障碍访问</div>
        </div>
        <div className="wrap">
          <div className="title">支持</div>
          <div>产品帮助</div>
          <div>报告问题</div>
          <div>技术支持</div>
        </div>
        <div className="wrap">
          <div className="title">联系我们</div>
          <div>公众号:teamupteam</div>
          <div>TEAMUP</div>
        </div>
        <div className="wrap">
          <div className="title">微信公众号</div>
          <Image src={Public} width={100} height={100} alt="logo" />
        </div>
      </Wrap>
      <Logos>
        <Image src={Logo} width={150} height={70} alt="logo" />@ 2023
      </Logos>
    </footer>
  );
};

export default index;
