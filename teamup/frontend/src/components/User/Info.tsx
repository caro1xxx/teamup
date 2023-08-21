import { nanoid } from "nanoid";
import React from "react";
import styled from "styled-components";
import { calculateTimeDifference } from "../../utils/tools";
import { InfoState } from "../../types/componentsPropsTypes";

type Props = {
  message: InfoState[];
};

const BodyWrap = styled.div`
  max-height: 200px;
  overflow: scroll;
  padding-top: 10px;
`;

const Wrap = styled.div`
  height: 30px;
  margin: 20px 0px;
  display: flex;
  .avator {
    background-color: green;
    height: 30px;
    width: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 30px;
    font-weight: bolder;
    margin-right: 10px;
  }
  .content {
    width: 120px;
    height: 40px;
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .title {
    }
    .message {
      color: #adadad;
    }
  }
  .state {
    flex: 1;
    text-align: end;
    font-size: 10px;
    .read_false {
      display: flex;
      vertical-align: top;
      justify-content: end;
      align-items: center;
      div {
        background-color: green;
        border-radius: 10px;
        width: 7px;
        height: 7px;
        margin-bottom: 10px;
      }
    }
    .read_true {
      display: flex;
      vertical-align: top;
      justify-content: end;
      align-items: center;
      div {
        background-color: #313131;
        border-radius: 10px;
        width: 7px;
        height: 7px;
        margin-bottom: 10px;
      }
    }
    .time {
      color: #adadad;
    }
  }
`;

const Info = (props: Props) => {
  return (
    <BodyWrap>
      {props.message.map((item: InfoState) => {
        return (
          <Wrap key={item.key}>
            <div className="avator">{item.send.charAt(0)}</div>
            <div className="content">
              <div className="title">@{item.send}向你发送消息</div>
              <div className="message">{item.content}</div>
            </div>
            <div className="state">
              <div className="time">
                {calculateTimeDifference(item.sendTime)}之前
              </div>
            </div>
          </Wrap>
        );
      })}
    </BodyWrap>
  );
};

export default Info;
