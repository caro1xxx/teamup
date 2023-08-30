import React from "react";
import { Steps } from "antd";
type Props = {};

const Logs = (props: Props) => {
  return (
    <div
      style={{ margin: "50px 50px 0px 50px", position: "relative", zIndex: 2 }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bolder",
          fontSize: "20px",
        }}
      >
        Teamup更新日志
      </div>
      <Steps
        progressDot
        current={1}
        direction="vertical"
        items={[
          {
            title: "待定",
            description: "参加调查问卷,提议最多的功能将在这个阶段开发",
          },
          {
            title: "开发中 - diseny车队",
            description: "开发中 - diseny车队 预计10日后上线",
          },
          {
            title: "加入车队成员支付状态显示",
            description: "加入车队成员支付状态显示 2023-05-17",
          },
          {
            title: "@功能同步通知用户邮箱",
            description: "@功能同步通知用户邮箱 2023-05-13",
          },
          {
            title: "加入@功能",
            description: "加入@功能 2023-04-29",
          },
          {
            title: "加入Teamup小店",
            description: "为满足部分用户需要,退出免组队服务 2023-04-26",
          },
          {
            title: "项目成立",
            description: "项目成立 2023-04-04",
          },
        ]}
      />
    </div>
  );
};

export default Logs;
