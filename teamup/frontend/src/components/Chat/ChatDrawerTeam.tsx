import React from "react";
import { TeamWrap, TeamTypeWrap } from "../../style/chat";
import { TeamInfoProps } from "../../types/componentsPropsTypes";
import { Button, Popconfirm, Skeleton } from "antd";
// assets
import FleetBackIcon from "../../assets/images/fleet_back.webp";
import "../../style/custome_antd.css";
import WrapIcon from "../../assets/images/wrap.webp";
import TypeIcon from "../../assets/images/type.webp";
import PriceIcon from "../../assets/images/price.webp";

type Props = {
  data: TeamInfoProps;
  join: () => Promise<void>;
  departure: () => Promise<void>;
  username: string;
  kick: (username: string) => Promise<void>;
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
        {props.data.join_users[0].name !== "" ? (
          <>
            {props.data.join_users.map((item) => {
              return (
                <div key={item.key}>
                  {item.name === props.username || !props.data.isHomeowner ? (
                    <div className="people" key={item.key}>
                      <div style={{ backgroundColor: item.avatorColor }}>
                        {item.name.charAt(0)}
                      </div>
                    </div>
                  ) : (
                    <Popconfirm
                      placement="bottom"
                      title={"踢下座位?"}
                      description={""}
                      onConfirm={() => props.kick(item.name)}
                      okText="是"
                      cancelText="否"
                    >
                      <div className="people" key={item.key}>
                        <div style={{ backgroundColor: item.avatorColor }}>
                          {item.name.charAt(0)}
                        </div>
                      </div>
                    </Popconfirm>
                  )}
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
          </>
        ) : (
          <>
            <Skeleton.Avatar
              active={true}
              size={"large"}
              shape={"circle"}
              className="loadingmargin"
            />
            <Skeleton.Avatar
              active={true}
              size={"large"}
              shape={"circle"}
              className="loadingmargin"
            />
            <Skeleton.Avatar
              active={true}
              size={"large"}
              shape={"circle"}
              className="loadingmargin"
            />
            <Skeleton.Avatar
              active={true}
              size={"large"}
              shape={"circle"}
              className="loadingmargin"
            />
            <Skeleton.Avatar
              active={true}
              size={"large"}
              shape={"circle"}
              className="loadingmargin"
            />
          </>
        )}

        <div style={{ flex: 1 }}></div>
        {props.data.join_users[0].name === "" ? (
          <Skeleton.Button active={true} size={"large"} shape={"default"} />
        ) : (
          <>
            {props.data.state === 0 ? (
              <>
                {props.data.isHomeowner ? (
                  <Popconfirm
                    placement="left"
                    title={"确定发车吗?"}
                    description={
                      props.data.surplus === 0 ? (
                        "发车后,系统将等待全员支付完毕后发送账号密码"
                      ) : (
                        <DepartureHint />
                      )
                    }
                    onConfirm={props.departure}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                      style={{ marginRight: "10px" }}
                      className="btn join"
                    >
                      发车
                    </Button>
                  </Popconfirm>
                ) : null}
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
              </>
            ) : props.data.state === 1 ? (
              <div className="departure">已发车,等待全员支付完毕</div>
            ) : props.data.state === 2 ? (
              <div className="payed">
                正在生成账号(账号生成完毕后将同时发送至站内消息和您的邮箱)
              </div>
            ) : (
              <div className="payed" style={{ lineHeight: "39px" }}>
                账号已发送至站内消息和邮箱
              </div>
            )}
          </>
        )}
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
        {props.data.level.includes("30")
          ? "超低价格:16.6 RMB /人"
          : "超低价格:49.8 RMB /人"}
        <span style={{ color: "#05b665", marginLeft: "10px" }}>
          (价格公式 总价 / 当前人数 = 单价)
        </span>
      </div>
      <div>
        <span style={{ color: "#05b665", marginLeft: "10px" }}>
          (当前价格:{props.data.price.toFixed(2)} RMB /人,满员可享受超低价格)
        </span>
      </div>
      <div className="hint">如需更改,请@车队队长协商</div>
    </TeamTypeWrap>
  );
};

const DepartureHint = () => {
  return (
    <div>
      当前
      <span style={{ color: "#ee5b5b", fontWeight: "bolder" }}>
        车队未满,无法享受
      </span>
      最低价格.确定继续发车吗?
    </div>
  );
};
