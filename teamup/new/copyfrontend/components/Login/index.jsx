import React from "react";
import { Wrap } from "./style.jsx";
import QRCode from "qrcode";
import Image from "next/image";
const index = (props) => {
  const [qrCodeUrl, setQRCodeUrl] = React.useState("");
  React.useEffect(() => {
    console.log("http://192.168.31.69/login?token=" + props.token);
    QRCode.toDataURL("http://192.168.31.69/login?token=" + props.token)
      .then((url) => {
        setQRCodeUrl(url);
      })
      .catch((error) => {});
  }, [props.token]);

  return (
    <Wrap onClick={() => props.close(false)}>
      <div
        className="body"
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Image
          style={{ borderRadius: "10px" }}
          src={qrCodeUrl}
          width={300}
          height={300}
          alt="qr"
        />
        <div className="hint">微信扫码登录或注册</div>
      </div>
    </Wrap>
  );
};

export default index;
