import React from "react";
import { Wrap, Message } from "./style.jsx";
import KefuIcon from "../../assets/icon/kefu.png";
import Image from "next/image";
const index = () => {
  const [message, setMessage] = React.useState({
    openBox: false,
  });

  return (
    <>
      {message.openBox ? (
        <Message>
          <div className="top">Teamup在线客服</div>
          <div className="box">1</div>
          <div className="input">
            <input type="text" placeholder="请输入问题" />
            <div className="send">发送</div>
          </div>
        </Message>
      ) : (
        <Wrap onClick={() => setMessage({ openBox: true })}>
          <Image src={KefuIcon} width={20} height={20} />
        </Wrap>
      )}
    </>
  );
};

export default index;
