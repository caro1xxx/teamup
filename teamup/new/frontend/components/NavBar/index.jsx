import React from "react";
import { Wrap } from "./style.jsx";
import Image from "next/image";
import CarIcon from "../../assets/icon/car.png";
import LogoPng from "../../assets/images/logo.png";

const index = (props) => {
  return (
    <Wrap>
      <div className="body">
        <div className="tag">
          <div>车站</div>
          <div>帮助</div>
          <div>客服</div>
        </div>
        <div className="logo">
          <Image src={LogoPng} width={150} height={70} />
        </div>
        <div className="options">
          {props.username === "" ? (
            <div className="login" onClick={() => props.login(true)}>
              <div>登录</div>
            </div>
          ) : (
            <div className="user">
              <div>用户:{props.username}</div>
            </div>
          )}
          <div className="car">
            <Image src={CarIcon} alt="car" width={25} height={25} />
          </div>
        </div>
      </div>
    </Wrap>
  );
};

export default index;
