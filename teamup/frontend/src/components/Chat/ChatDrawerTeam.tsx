import React from "react";
import { TeamWrap, TeamTypeWrap } from "../../style/chat";
import { TeamInfoProps } from "../../types/componentsPropsTypes";
import { Button } from "antd";
// assets
import FleetBackIcon from "../../assets/images/fleet_back.png";
import "../../style/custome_antd.css";
import WrapIcon from "../../assets/images/wrap.png";
import TypeIcon from "../../assets/images/type.png";
import PriceIcon from "../../assets/images/price.png";

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
    <>
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
      <TeamType
        data={{
          level: props.data.level,
          type: props.data.type,
          price: props.data.price,
        }}
      />
    </>
  );
};

export default ChatDrawerTeam;

const TeamType = (props: {
  data: { level: string; type: number; price: number };
}) => {
  return (
    <TeamTypeWrap>
      <div>
        <img src={WrapIcon} width={25} alt="icon" />
        {props.data.level}
      </div>
      <div>
        <img
          src={TypeIcon}
          width={15}
          alt="icon"
          style={{ marginLeft: "5px", marginRight: "3px" }}
        />
        {props.data.type === 1
          ? "平台邮箱注册账号,可长期续费不换号(5分钟内发货)"
          : "自备邮箱账号-充值到自己账号(2小时内到账)"}
      </div>
      <div>
        <img
          src={PriceIcon}
          width={20}
          style={{ marginLeft: "2px" }}
          alt="icon"
        />
        {props.data.price} RMB /人{" "}
        <span style={{ color: "#05b665", marginLeft: "10px" }}>
          (价格计算公式:单价 = 总价 / 当前车队入座人数)
        </span>
      </div>
      <div className="hint">如需更改,请@车队队长协商</div>
    </TeamTypeWrap>
  );
};
