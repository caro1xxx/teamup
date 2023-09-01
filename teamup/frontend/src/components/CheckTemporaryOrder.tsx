import React from "react";
import styled from "styled-components";
import CheckOrderDranger from "../assets/images/checkorder.webp";
import { useAppDispatch } from "../redux/hooks";
import { changeLoginPupup } from "../redux/modules/userSlice";
type Props = {};

const Wrap = styled.div`
  position: fixed;
  bottom: 0px;
  background-color: white;
  border-radius: 5px 5px 0px 0px;
  width: 1200px;
  box-shadow: 0 4px 8px 0 rgba(143, 143, 143, 0.322),
    0 6px 20px 0 rgba(142, 142, 142, 0.129);
  color: #3a3a3a;
  z-index: 3;
  .hinttext {
    cursor: pointer;
    user-select: none;
    padding: 10px 20px;
    display: flex;
    vertical-align: top;
    justify-content: start;
    align-items: center;
    span {
      color: #e63d3d;
    }
    .anser {
      font-weight: lighter;
      font-size: 10px;
    }
  }
`;

const CheckTemporaryOrder = (props: Props) => {
  const dispatch = useAppDispatch();
  const login = () => {
    dispatch(changeLoginPupup());
  };

  return (
    <Wrap>
      <div className="hinttext">
        <img
          style={{ marginRight: "5px" }}
          width={20}
          src={CheckOrderDranger}
          alt="danger"
        />
        <div>
          系统检测到你有一笔订单是在<span>未登录情况下支付</span>的,请
          <span onClick={login}>注册或登录关联</span>
          这笔订单
        </div>
        <div className="anser">
          (为什么需要关联? 如果你<span>不关联</span>该订单,那么该订单的
          <span>密码变更无法通知</span>到您)
        </div>
      </div>
    </Wrap>
  );
};

export default CheckTemporaryOrder;
