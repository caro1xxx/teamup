import React from "react";
import { fecther } from "../../utils/fecther";
import { FavoriteState } from "../../types/componentsPropsTypes";
import { nanoid } from "nanoid";
import { FavoriteWarp } from "../../style/other";
import { Tag } from "antd";
type Props = {};

const Favorite = (props: Props) => {
  const [FavoriteList, setFavoriteList] = React.useState<FavoriteState[] | []>(
    []
  );

  const getFavorite = async () => {
    let result = await fecther("favorites/", {}, "get");
    if (result.code !== 200) return;
    let data: FavoriteState[] = [];
    result.data.forEach((item: FavoriteState) => {
      data.push({ ...item, key: nanoid() });
    });
    setFavoriteList(data);
  };

  React.useEffect(() => {
    getFavorite();
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      {FavoriteList.map((item: FavoriteState) => {
        return (
          <FavoriteWarp key={item.key}>
            <div className="wrap">
              <div className="title">{item.roomName}</div>
              <div className="tag">
                <Tag color="#05b665">{item.type}</Tag>
                <div className="hint">
                  {item.state === 0 ? `还差${item.surplus}人开车` : "已发车"}
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
