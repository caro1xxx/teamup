import React from "react";
import { Wrap } from "./style.jsx";
import Image from "next/image.js";
import Netflix from "../../assets/images/netflix.webp";
import { fether } from "../../utils/fether.js";
import { useRequest } from "ahooks";

const index = () => {
  const [card, setCard] = React.useState([]);

  const requestCard = async () => {
    let result = await fether("card/", {}, "get");
    if (result.code === 200) {
      let data = [];
      result.data.forEach((item) => {
        // data.push({
        //   order_id:item.fields.order_id,
        //   order_uid:,
        //   use_time:,
        // })
      });
      setCard([{}]);
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  };

  const { data, loading } = useRequest(requestCard, {
    cacheKey: "card-flag",
  });

  if (!data && loading) {
    return (
      <Wrap>
        <div className="loading"></div>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <div className="body">
        <Image src={Netflix} alt="logo" />
      </div>
    </Wrap>
  );
};

export default index;
