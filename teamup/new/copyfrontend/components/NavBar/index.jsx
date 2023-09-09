import React, { useEffect } from "react";
import { Wrap } from "./style.jsx";
import Image from "next/image";
import CarIcon from "../../assets/icon/car.png";
import LogoPng from "../../assets/images/logo.png";
import { Tooltip, Input, Modal } from "antd";
import { fether } from "../../utils/fether.js";
import { getStorage, setStorage } from "../../utils/localStorage.js";
import Card from "../Card/index.js";

const index = (props) => {
  const [showPopup, setShowPopup] = React.useState({
    showMail: false,
    mail: "",
  });
  // 判断当前处于客户端
  const isClientRef = React.useRef(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = React.useState(false);

  const bandMail = async (mail) => {
    let result = await fether(`band/?email=${mail}`, {}, "get");
    if (result.code === 200) {
      setShowPopup({ showMail: false });
      setStorage("bandMail", mail);
    }
  };

  useEffect(() => {
    isClientRef.current = true;
    if (getStorage("bandMail")) {
      setShowPopup({ showMail: false, mail: getStorage("bandMail") });
    } else {
      setShowPopup({ showMail: true, mail: "" });
    }
  }, []);

  return (
    <Wrap>
      <div className="body">
        <div className="tag">
          <div>车站</div>
          <div>帮助</div>
          <div>关于</div>
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
              {isClientRef.current ? (
                <Tooltip
                  placement="bottom"
                  title={<SaveEmail show={showPopup.mail} band={bandMail} />}
                  color={"#fff"}
                  arrow={true}
                  open={showPopup.showMail}
                >
                  <div>用户:{props.username}</div>
                </Tooltip>
              ) : null}
            </div>
          )}
          <div className="car">
            {isClientRef.current ? (
              <Tooltip
                placement="right"
                title={<div style={{ color: "#000" }}>查看历史订单</div>}
                color={"#fff"}
                arrow={true}
                open={showPopup.showMail}
              >
                <Image
                  src={CarIcon}
                  alt="car"
                  width={25}
                  height={25}
                  onClick={() => setIsOrderHistoryOpen(true)}
                />
              </Tooltip>
            ) : null}
          </div>
        </div>
      </div>
      <Modal
        title="卡包"
        closeIcon={null}
        maskClosable={true}
        footer={[]}
        centered
        onCancel={() => setIsOrderHistoryOpen(false)}
        open={isOrderHistoryOpen}
        width={400}
      >
        <Card />
      </Modal>
    </Wrap>
  );
};

export default index;

const { Search } = Input;

const SaveEmail = (props) => {
  return (
    <div style={{ padding: "5px 10px" }}>
      <div style={{ color: "#787878", fontSize: "10px" }}>
        绑定邮箱才会接收密码更改通知
      </div>
      <Search
        defaultValue={props.show}
        placeholder="常用邮箱"
        enterButton="绑定"
        onSearch={(value) => props.band(value)}
      />
    </div>
  );
};
