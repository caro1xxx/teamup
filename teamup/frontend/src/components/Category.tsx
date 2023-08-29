import React from "react";
import TestIcon from "../assets/images/test.png";
import { CategoryWrap } from "../style/other";
import { Input, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CreateRoom from "./Mod/CreateRoom";
import { fecther } from "../utils/fecther";
import { changeMessage } from "../redux/modules/notifySlice";
import {
  saveNewCreateRoom,
  changeRoomOrderBy,
  changeSearchValue,
} from "../redux/modules/roomSlice";
import KefuIcon from "../assets/images/kefu.png";
import { nanoid } from "nanoid";

type Props = {};

const { Search } = Input;

const Category = (props: Props) => {
  const [createRoomModel, setCreateRoomModel] = React.useState<boolean>(false);
  const [loadingDelay, setLoadingDelay] = React.useState<boolean>(false);
  const isLogin = useAppSelector((state) => state.user.isLogin) as boolean;
  const [OderByState, setOrderByState] = React.useState([
    {
      icon: require("../assets/images/descending.png"),
      key: nanoid(),
      label: "asce",
      select: false,
    },
    {
      icon: require("../assets/images/ascending.png"),
      key: nanoid(),
      label: "desc",
      select: false,
    },
    {
      icon: require("../assets/images/self.png"),
      key: nanoid(),
      label: "self",
      select: false,
    },
  ]);
  const dispatch = useAppDispatch();

  const createRoom = async (data: {
    name: string;
    description: string;
    type: string;
    uuid: string;
    mailType: number;
    time: number;
  }) => {
    if (loadingDelay) return;
    setLoadingDelay(true);
    let result = await fecther("room/", { data: { ...data } }, "post");
    if (result.code === 200) {
      dispatch(saveNewCreateRoom([{ ...result.data }]));
      setCreateRoomModel(false);
    }
    dispatch(
      changeMessage([result.message, result.code === 200 ? true : false])
    );
    setTimeout(() => {
      setLoadingDelay(false);
    }, 1000);
  };

  const selectOrderBy = (label: string) => {
    dispatch(changeRoomOrderBy(label));
    let newValue = [...OderByState];
    newValue.forEach((item) => {
      if (item.label === label) {
        item.select = !item.select;
      } else {
        item.select = false;
      }
    });
    setOrderByState(newValue);
  };

  const searchRoom = (value: string) => {
    dispatch(changeSearchValue(value));
  };

  return (
    <>
      <CategoryWrap>
        {OderByState.map((item, index) => {
          return (
            <div key={item.key}>
              {isLogin || item.label !== "self" ? (
                <div
                  className="btn"
                  style={{
                    backgroundColor: item.select ? "#05b665" : "#232323",
                  }}
                  onClick={() => selectOrderBy(item.label)}
                >
                  <img src={item.icon} alt={item.label} />
                </div>
              ) : null}
            </div>
          );
        })}
        {/* <div>
          {isLogin ? (
            <div className="btn">
              <img src={KefuIcon} alt="客服" />
            </div>
          ) : null}
        </div> */}

        {isLogin ? (
          <div className="create">
            <div
              className="create_btn"
              onClick={() => setCreateRoomModel(true)}
            >
              创建车队
            </div>
            <div className="test">
              <img src={TestIcon} alt="test" />
              <div>内测</div>
            </div>
          </div>
        ) : null}

        <div style={{ flex: 1 }}></div>
        <div className="search">
          <Search
            className="cutomer"
            placeholder="车队编号或车队名称"
            enterButton
            onSearch={(value) => searchRoom(value)}
          />
        </div>
      </CategoryWrap>
      <Modal
        title="创建车队 限时内测(如遇BUG请联系客服或提交工单)"
        centered
        open={createRoomModel}
        onCancel={() => setCreateRoomModel(false)}
        footer={[]}
      >
        <CreateRoom delay={loadingDelay} create={createRoom} />
      </Modal>
    </>
  );
};

export default Category;
