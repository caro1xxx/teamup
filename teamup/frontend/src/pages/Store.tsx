import React from "react";
import { StoreWrap } from "../style/pages";
import { nanoid } from "nanoid";
type Props = {};

const Store = (props: Props) => {
  const [serviceList, setServiceList] = React.useState([
    {
      icon: require("../assets/images/logo/netflix.png"),
      key: nanoid(),
      plan: [
        {
          title: "30天",
          key: nanoid(),
          level: "初出茅庐",
          image: require("../assets/images/30.png"),
          includes: [
            { title: "Netflix标准会员 30天", key: nanoid() },
            { title: "平台邮箱 安全同行", key: nanoid() },
            { title: "密码变更邮件推送", key: nanoid() },
            { title: "账号有效期内免费质保", key: nanoid() },
            { title: "5秒出货 无需等待", key: nanoid() },
          ],
        },
        {
          title: "90天",
          key: nanoid(),
          level: "初出茅庐",
          image: require("../assets/images/90.png"),
          includes: [
            { title: "Netflix标准会员 90天", key: nanoid() },
            { title: "平台邮箱 安全同行", key: nanoid() },
            { title: "密码变更邮件推送", key: nanoid() },
            { title: "账号有效期内免费质保", key: nanoid() },
            { title: "5秒出货 无需等待", key: nanoid() },
          ],
        },
        {
          title: "180天",
          key: nanoid(),
          level: "初出茅庐",
          image: require("../assets/images/180.png"),
          includes: [
            { title: "Netflix标准会员 180天", key: nanoid() },
            { title: "平台邮箱 安全同行", key: nanoid() },
            { title: "密码变更邮件推送", key: nanoid() },
            { title: "账号有效期内免费质保", key: nanoid() },
            { title: "5秒出货 无需等待", key: nanoid() },
          ],
        },
        {
          title: "365天",
          key: nanoid(),
          level: "初出茅庐",
          image: require("../assets/images/365.png"),
          includes: [
            { title: "Netflix标准会员 365天", key: nanoid() },
            { title: "平台邮箱 安全同行", key: nanoid() },
            { title: "密码变更邮件推送", key: nanoid() },
            { title: "账号有效期内免费质保", key: nanoid() },
            { title: "5秒出货 无需等待", key: nanoid() },
          ],
        },
      ],
    },
  ]);

  return (
    <StoreWrap>
      <div className="title">🎉无需组队,选择你喜欢的计划后即可享受服务</div>
      <div className="plan">
        {serviceList.map((item) => {
          return (
            <div key={item.key}>
              <img className="logo" src={item.icon} alt="logo" />
              <div className="render_item">
                {item.plan.map((childitem, index) => {
                  return (
                    <div className="item" key={childitem.key}>
                      <div className="plantitle">{childitem.level}</div>
                      <div
                        className="wrap"
                        style={{
                          backgroundImage: 'url("' + childitem.image + '")',
                        }}
                      >
                        {childitem.includes.map((childistem) => {
                          return (
                            <div className="items" key={childistem.key}>
                              <span style={{}}>✔</span>
                              {childistem.title}
                            </div>
                          );
                        })}
                        <div className="buy">立即购买</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center" }}>敬请期待更多Plan</div>
    </StoreWrap>
  );
};

export default Store;
