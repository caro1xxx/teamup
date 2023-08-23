import React from "react";
import { ActivityWrap } from "../style/other";
import CloseIcon from "../assets/images/close.png";
type Props = {
  close: () => void;
};

const Activity = (props: Props) => {
  return (
    <ActivityWrap onClick={props.close}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
        className="content"
        style={{
          backgroundImage:
            "url(" + require("../assets/images/bg/youhui.png") + ")",
        }}
      >
        <img
          className="close"
          width={30}
          onClick={props.close}
          src={CloseIcon}
          alt="close"
        />
      </div>
    </ActivityWrap>
  );
};

export default Activity;
