import React from "react";
import { ActivityWrap } from "../style/pages";
import { nanoid } from "nanoid";
import {
  ActivityListState,
  ResultActivityListState,
} from "../types/componentsPropsTypes";
import { fecther } from "../utils/fecther";
type Props = {};

const Activity = (props: Props) => {
  const [activityList, setActivityList] = React.useState<
    ActivityListState[] | []
  >([]);

  const getActivitList = async () => {
    let result = await fecther(`activity/?count=all`, {}, "get");
    if (result.code !== 200) return;
    let data: ActivityListState[] | [] = [];
    result.data.forEach((item: ResultActivityListState) => {
      // @ts-ignore
      data.push({ ...item.fields, key: nanoid() });
    });
    setActivityList(data);
  };

  React.useEffect(() => {
    getActivitList();
  }, []);

  return (
    <ActivityWrap>
      {activityList.map((item) => {
        return (
          <img
            src={`https://teamup.best/media/activity/${item.image}`}
            key={item.key}
            alt=""
          />
        );
      })}
    </ActivityWrap>
  );
};

export default Activity;
