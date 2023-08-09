import React from "react";
import styled from "styled-components";
type Props = {};

const Wrap = styled.div`
  font-family: "Helvetica";
  margin-top: 100px;
  margin-bottom: 50px;
  font-size: 20px;
  font-weight: lighter;
  .title {
    color: #05b665;
  }
  .detail {
    font-size: 12px;
    color: #d5d5d5d1;
    margin: 20px 0px;
    width: 50%;
    line-height: 25px;
    text-indent: 2em;
  }
  span {
    color: #05b665;
    font-weight: bolder;
  }
`;

const Introduce = (props: Props) => {
  return (
    <Wrap>
      <div className="title">组队大厅</div>
      <div className="detail">
        在我们的平台上，您可以与身边的人一起<span>创建或加入团队</span>
        ，共同享受会员账户所提供的海量影片和视频资源。
        不再为会员费用而烦恼，通过拼团，您可以与<span>团队成员平摊费用</span>
        ，让会员体验变得更加<span>经济实惠</span>!
        现在就加入我们，与您的朋友们一起开启全新的
        <span>会员拼团模式</span>，共同享受精彩无限的视听盛宴！
      </div>
    </Wrap>
  );
};

export default Introduce;
