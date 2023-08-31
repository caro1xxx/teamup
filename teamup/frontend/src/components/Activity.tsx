import React from "react";
import { ActivityWrap } from "../style/other";
import CloseIcon from "../assets/images/close.webp";
import { fecther } from "../utils/fecther";
type Props = {
  close: () => void;
};

const Activity = (props: Props) => {
  const [activityInfo, setActivityInfo] = React.useState({
    begin_time: 0,
    end_time: 0,
    image: "",
  });

  const getActivity = async () => {
    let result = await fecther(`activity/?all=1`, {}, "get");
    if (result.code !== 200) {
      props.close();
      return;
    }
    setActivityInfo({ ...result.data });
  };

  React.useEffect(() => {
    getActivity();
  }, []);

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
            activityInfo.image !== ""
              ? `url('https://teamup.best/media/activity/${activityInfo.image}')`
              : "",
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
