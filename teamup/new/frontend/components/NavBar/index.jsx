import React from "react";
import { Wrap } from "./style";
import Image from "next/image";
import SettingsIcon from "../../assets/icon/settings.png";
import CarIcon from "../../assets/icon/car.png";

const index = (props) => {
  return (
    <Wrap>
      <div className="body">
        <div className="logo">Logo</div>
        <div className="tag">
          <div>车站</div>
          <div>帮助</div>
          <div>客服</div>
        </div>
        <div className="login" onClick={() => props.login(true)}>
          <div>登录</div>
        </div>
        <div className="car">
          <Image src={CarIcon} alt="car" width={25} height={25} />
        </div>
        <div className="avator">
          <Image src={SettingsIcon} alt="settings" width={25} height={25} />
        </div>
      </div>
    </Wrap>
  );
};

export default index;
