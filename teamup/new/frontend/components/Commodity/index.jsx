import React from "react";
import { Wrap, ToFowrad } from "./style.jsx";
import netflix from "../../assets/images/netflix.webp";
import toRightIcon from "../../assets/icon/toright.png";
import toLeftIcon from "../../assets/icon/toleft.png";
import HotIcon from "../../assets/icon/hot.png";
import Image from "next/image";

const index = (props) => {
  const [currentShowDirection, setCurrentShowDirection] = React.useState(1);
  const moveScroll = (type) => {
    let ponit = null;
    if (type === 1) {
      ponit = document.getElementById("toright");
      setCurrentShowDirection(0);
    } else {
      ponit = document.getElementById("toleft");
      setCurrentShowDirection(1);
    }
    if (ponit === null) return;
    ponit.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <>
      <Wrap>
        <div className="title">
          Netflix Premium 标准账号五人车
          <Image width={25} height={30} src={HotIcon} alt="settings" />
        </div>
        <div className="body">
          {props.goods.map((item, index) => {
            return (
              <div className="item" key={item.key}>
                <div className="stock">库存:{item.stock}</div>
                <div className="top">
                  <Image className="logo" src={netflix} alt="settings" />
                  <div>{item.title}</div>
                </div>
                <div className="price">
                  ￥{item.price}/{item.showTime}
                </div>
                <div className="choose" onClick={props.open}>
                  购买
                </div>
                <div className="feature">
                  {item.support.map((childItem) => {
                    return (
                      <div
                        key={childItem.key}
                        className={childItem.support ? "support" : "nosupport"}
                      >
                        {childItem.title}
                      </div>
                    );
                  })}
                </div>
                {index === props.goods.length - 1 ? (
                  <div className="toright" id="toright"></div>
                ) : null}
                {index === 0 ? (
                  <div className="toleft" id="toleft"></div>
                ) : null}
              </div>
            );
          })}
          <ToFowrad
            onClick={() => moveScroll(currentShowDirection)}
            $orientations={currentShowDirection}
          >
            <Image
              width={25}
              height={30}
              src={currentShowDirection === 1 ? toRightIcon : toLeftIcon}
              alt="settings"
            />
          </ToFowrad>
        </div>
      </Wrap>
    </>
  );
};

export default index;
