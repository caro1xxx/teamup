import React from "react";
import styled from "styled-components";
import addFleets from "../assets/images/addfleet.png";
import { nanoid } from "nanoid";

const Wrap = styled.div`
  .fleet_item {
    font-size: 13px;
    padding: 10px  150px 10px 15px;
    .fleet_name {
      color: #625e5e;
    }
    .fleet_emty {
      display: flex;
      margin: 5px 0px;
      .user {
        cursor: pointer;
        margin-top: 3px;
        margin-left: 2px;
        margin-right: 2px;
        width: 35px;
        height: 35px;
        border: 3px solid #616380;
        display: flex;
        align-items: center;
        vertical-align: top;
        justify-content: center;
        border-radius: 5px;
        .user_avator {
          width: 30px;
          height: 30px;
        }
      }
      .emty {
        cursor: pointer;
        width: 45px;
        height: 47px;
      }
    }
  }
`;

type Props = {
  data: {
    id: string;
    key: string;
    name: string;
    status: (
      | string
      | {
          number: number;
          id: string;
          avator: any;
        }
    )[];
  };
};

const Fleet = (props: Props) => {
  return (
    <Wrap>
      <div className="fleet_item">
        <div className="fleet_name">{props.data.name}</div>
        <div className="fleet_emty">
          {props.data.status.map((item) => {
            return (
              <div key={nanoid()}>
                {typeof item === "string" ? (
                  <img className="emty" src={addFleets} alt="user_avator" />
                ) : (
                  <div className="user">
                    <img
                      className="user_avator"
                      src={item.avator}
                      alt="user_avator"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Wrap>
  );
};

export default Fleet;
