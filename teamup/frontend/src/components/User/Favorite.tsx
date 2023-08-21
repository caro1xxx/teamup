import React from "react";
import { FavoriteState } from "../../types/componentsPropsTypes";
import { FavoriteWarp } from "../../style/other";
import { Tag } from "antd";
type Props = {
  favoriteList: FavoriteState[];
};

const Favorite = (props: Props) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {props.favoriteList.map((item: FavoriteState) => {
        return (
          <FavoriteWarp key={item.key}>
            <div className="wrap">
              <div className="title">{item.roomName}</div>
              <div className="tag">
                <Tag color="#05b665">{item.type}</Tag>
                <div className="hint">
                  {item.state === 0 ? `还差${item.surplus}人发车` : "已发车"}
                </div>
              </div>
            </div>
          </FavoriteWarp>
        );
      })}
    </div>
  );
};

export default Favorite;