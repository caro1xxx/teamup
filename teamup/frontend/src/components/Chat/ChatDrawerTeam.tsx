import React from "react";
import { TeamWrap } from "../../style/chat";
import { TeamInfoProps } from "../../types/componentsPropsTypes";
import { Button } from "antd";
// assets
import FleetBackIcon from "../../assets/images/fleet_back.png";
import "../../style/custome_antd.css";

type Props = {
  data: TeamInfoProps;
  join: () => Promise<void>;
};

const ChatDrawerTeam = (props: Props) => {
  const [isLoading, setisLoading] = React.useState(false);

  const joinTeam = () => {
    setisLoading(true);
    props.join();
    setTimeout(() => {
      setisLoading(false);
    }, 500);
  };

  return (
    <TeamWrap>
      {props.data.join_users.map((item) => {
        return (
          <div className="people" key={item.key}>
            <div style={{ backgroundColor: item.avatorColor }}>
              {item.name.charAt(0)}
            </div>
          </div>
        );
      })}
      {props.data.surplusEmtryArray.map((item) => {
        return (
          <div className="auditorium" key={item.key}>
            <img src={FleetBackIcon} alt="fleet" />
          </div>
        );
      })}
      <div style={{ flex: 1 }}></div>
      <Button
        className={
          props.data.isJoin || props.data.surplus === 0
            ? "btn_error join"
            : "btn join "
        }
        loading={isLoading}
        onClick={joinTeam}
      >
        {props.data.surplus === 0 && props.data.isJoin === false
          ? "满员"
          : props.data.isJoin
          ? "退出"
          : " 加入"}
      </Button>
    </TeamWrap>
  );
};

export default ChatDrawerTeam;
