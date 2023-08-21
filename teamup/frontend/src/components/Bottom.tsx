import React from "react";
import { Wrap } from "../style/bottom";
type Props = {};

const Bottom = (props: Props) => {
  return (
    <>
      <Wrap>
        <div>
          <div className="title">TEAMUP</div>
          <div className="content">关于</div>
          <div className="content">Teamup</div>
          <div className="content">开发</div>
        </div>
        <div>
          <div className="title">联系我们</div>
          <div className="content">公众号:bezos的小屋</div>
          <div className="content">微信:caro1xxx</div>
          <div className="content">TEAMUP</div>
        </div>
        <div>
          <div className="title">支持</div>
          <div className="content">产品帮助</div>
          <div className="content">报告问题</div>
          <div className="content">技术支持</div>
        </div>
        <div>
          <div className="title">隐私</div>
          <div className="content">网站隐私声明</div>
          <div className="content">Cookies</div>
          <div className="content">无障碍访问</div>
        </div>
      </Wrap>
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          cursor: "pointer",
          color: "#8b8b8b",
        }}
      >
        Teamup 2023
      </div>
    </>
  );
};

export default Bottom;
