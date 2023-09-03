import React from "react";
import styled from "styled-components";
import CheckPng from "../assets/images/bg/check.webp";
import { Modal, Input, Select, Rate } from "antd";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import "../style/custome_antd.css";
import { changeMessage } from "../redux/modules/notifySlice";
import { fecther } from "../utils/fecther";

type Props = {};

const Wrap = styled.div`
  display: flex;
  position: relative;
  z-index: 2;
  margin-top: 50px;
  img {
    flex: 1;
    margin-top: 50px;
    border-radius: 10px;
    margin-left: 10px;
    cursor: pointer;
  }
  .detailWrap {
    font-family: "Helvetica";
    margin-bottom: 50px;
    font-size: 20px;
    font-weight: lighter;
    .title {
      color: #05b665;
      font-size: 22px;
    }
    .detail {
      font-size: 15px;
      color: #d5d5d5d1;
      margin: 20px 0px;
      line-height: 25px;
      text-indent: 2em;
    }
    span {
      color: #05b665;
      font-weight: bolder;
    }
  }
`;
const { TextArea } = Input;

const Introduce = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const detailInfo = useAppSelector((state) => state.user.detailInfo);
  const isLogin = useAppSelector((state) => state.user.isLogin) as boolean;
  const [checkInfo, setCheckInfo] = React.useState({
    useType: "",
    question: "",
    suggestion: "",
    score: 0,
  });
  const handleChange = (value: string) => {
    setCheckInfo({ ...checkInfo, useType: value });
  };

  const subMit = async () => {
    for (let i in checkInfo) {
      // @ts-ignore
      if (checkInfo[i] === "" || checkInfo[i] === 0) {
        // @ts-ignore
        dispatch(changeMessage(["请填写完整", false]));
        return;
      }
    }
    let result = await fecther(
      "check/",
      {
        data: {
          ...checkInfo,
          username: detailInfo.username,
          email: detailInfo.email,
        },
      },
      "post"
    );
    if (result.code === 200) {
      setOpen(false);
    }
    dispatch(
      changeMessage([result.message, result.code === 200 ? true : false])
    );
  };

  const openCheck = () => {
    if (isLogin) {
      setOpen(true);
    } else {
      dispatch(changeMessage(["请先登录", false]));
    }
  };

  return (
    <Wrap>
      <div className="detailWrap">
        <div className="title">组队车站</div>
        <div className="detail">
          在Teamup平台你可以以<span>最低最划算的价格获取</span>你想要的会员
          ，你不必再为寻找合租队友而苦恼。
          不再为会员费用而烦恼，通过拼团，您可以与<span>团队成员平摊费用</span>
          ，让会员体验变得更加<span>经济实惠</span>
          现在就加入我们，平台账号100%由平台邮箱注册，
          <span>告别和陌生人组队跑路风险</span>，共同享受精彩无限的视听盛宴！
          <span>全新会员拼团模式</span>等你加入
        </div>
      </div>
      <img height={100} src={CheckPng} alt="" onClick={() => openCheck()} />
      <Modal
        title="感谢参与调查问卷"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={[]}
        width={400}
      >
        <Input
          style={{ margin: "10px 0px" }}
          placeholder="Basic usage"
          disabled
          value={detailInfo.username}
        />
        <Input
          style={{ margin: "10px 0px" }}
          placeholder="Basic usage"
          disabled
          value={detailInfo.email}
        />
        <div style={{ margin: "10px 0px" }}>
          <div>正在使用:</div>
          <Select
            defaultValue="请选择"
            style={{ width: "100%" }}
            onChange={handleChange}
            options={[
              { value: "netflix", label: "Netflix" },
              { value: "disney", label: "disney" },
              { value: "hulu", label: "hulu" },
              { value: "spotify", label: "spotify" },
              { value: "nintendo", label: "任天堂" },
              { value: "youtube", label: "Youtube" },
              { value: "pornhub", label: "Pornhub" },
            ]}
          />
        </div>
        <div style={{ margin: "10px 0px" }}>
          <div>遇到的问题:</div>
          <TextArea
            onChange={(e) =>
              setCheckInfo({ ...checkInfo, question: e.target.value })
            }
            rows={4}
            placeholder="遇到问题就大声说出来吧!我们一定加班修复"
          />
        </div>
        <div style={{ margin: "10px 0px" }}>
          <div>建议:</div>
          <TextArea
            onChange={(e) =>
              setCheckInfo({ ...checkInfo, suggestion: e.target.value })
            }
            rows={4}
            placeholder="你希望平台新增任何功能都可以告诉我们！"
          />
        </div>
        <div style={{ margin: "10px 0px" }}>
          <div>Teamup组队使用体验评分:</div>
          <Rate
            onChange={(value) => setCheckInfo({ ...checkInfo, score: value })}
          />
        </div>
        <div
          className="btn"
          onClick={subMit}
          style={{
            height: "40px",
            textAlign: "center",
            borderRadius: "5px",
            lineHeight: "40px",
          }}
        >
          提交
        </div>
      </Modal>
    </Wrap>
  );
};

export default Introduce;
