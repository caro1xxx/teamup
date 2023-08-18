import React from "react";
import DescendingIcon from "../assets/images/descending.png";
import AscendingIcon from "../assets/images/ascending.png";
import TestIcon from "../assets/images/test.png";
import { CategoryWrap } from "../style/other";
import { Input, Modal } from "antd";

import CreateRoom from "./Mod/CreateRoom";

type Props = {};

const { Search } = Input;

const Category = (props: Props) => {
  const [createRoomModel, setCreateRoomModel] = React.useState<boolean>(false);

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
        onOk={() => setCreateRoomModel(true)}
        onCancel={() => setCreateRoomModel(false)}
        footer={[]}
      >
        <CreateRoom />
      </Modal>
    </>
  );
};

export default Category;
