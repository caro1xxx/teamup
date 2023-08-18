import React from "react";
import DescendingIcon from "../assets/images/descending.png";
import AscendingIcon from "../assets/images/ascending.png";
import TestIcon from "../assets/images/test.png";
import { CategoryWrap } from "../style/other";
import { Input, Modal } from "antd";
import { useAppDispatch } from "../redux/hooks";
import CreateRoom from "./Mod/CreateRoom";
import { fecther } from "../utils/fecther";
import { changeMessage } from "../redux/modules/notifySlice";

type Props = {};

const { Search } = Input;

const Category = (props: Props) => {
  const [createRoomModel, setCreateRoomModel] = React.useState<boolean>(false);
  const [loadingDelay, setLoadingDelay] = React.useState<boolean>(false);
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
      setCreateRoomModel(false);
    }
    dispatch(
      changeMessage([result.message, result.code === 200 ? true : false])
    );
    setTimeout(() => {
      setLoadingDelay(false);
    }, 1000);
  };

  return (
    <>
      <CategoryWrap>
        <div className="btn">
          <img src={AscendingIcon} alt="asce" />
        </div>
        <div className="btn">
          <img src={DescendingIcon} alt="desc" />
        </div>
        <div className="create">
          <div className="create_btn" onClick={() => setCreateRoomModel(true)}>
            创建车队
          </div>
          <div className="test">
            <img src={TestIcon} alt="test" />
            <div>内测</div>
          </div>
        </div>
        <div style={{ flex: 1 }}></div>
        <div className="search">
          <Search
            className="cutomer"
            placeholder="input search text"
            enterButton
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
