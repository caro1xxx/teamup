import React from "react";
import { Wrap } from "./style.jsx";
import Image from "next/image";
import Public from "../../assets/images/public.png";
const index = () => {
  return (
    <Wrap>
      <div className="sub">
        <input
          type="text"
          className="input"
          placeholder="订阅折扣活动通知邮件"
        />
        <div className="btn">订阅</div>
      </div>
      <div className="public">
        <Image src={Public} width={300} height={300} />
      </div>
    </Wrap>
  );
};

export default index;
