import React, { useEffect } from "react";
import { Wrap, ItemWrap, BottomOptions } from "../style/room";
import PeopleItem from "./PeopleItem";
import ChatDrawerTitle from "./Chat/ChatDrawerTitle";
import ChatDrawerTeam from "./Chat/ChatDrawerTeam";
import ChatHint from "./Chat/ChatHint";
import ChatDrawerBody from "./Chat/ChatDrawerBody";
import ChatMessageInput from "./Chat/ChatMessageInput";
import ChatInputOptions from "./Chat/ChatInputOptions";
import ChatUserPayState from "./Chat/ChatUserPayState";
import ChatPayCode from "./Chat/ChatPayCode";
import SelfMail from "./Mod/SelfMail";

// assets
import ShareIcon from "../assets/images/share.png";
import FavoriteIcon from "../assets/images/favorite.png";
import UnFavoriteIcon from "../assets/images/unfavorite.png";
import LoadingMoreIcon from "../assets/images/loadingmore.png";
import MsgIcon from "../assets/images/msg.png";

// tools
import { nanoid } from "nanoid";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useLocation } from "react-router-dom";
import { fecther } from "../utils/fecther";
import { changeMessage } from "../redux/modules/notifySlice";
import {
  randomNumber,
  generatorEmtryArray,
  textPhase,
  checkVaildate,
} from "../utils/tools";
import { Skeleton, Drawer, Empty, Modal, Spin, Badge } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getStorage, setStorage } from "../utils/localstorage";
import {
  messageReducer,
  payStateReducer,
  payStateInitialState,
} from "../utils/reducers";
import { createOrOpenDB, addItem, getAllItems } from "../utils/chatDB";
import ClipboardJS from "clipboard";
import { LoadingMore } from "../style/other";

// types
import type { MenuProps } from "antd";
import { RoomInfo } from "../types/paramsTypes";
import {
  RoomItemProps,
  TeamInfoProps,
  UserToRoomInfoProps,
} from "../types/componentsPropsTypes";
import { changeSearchValue } from "../redux/modules/roomSlice";

const loadingEmtryArray = generatorEmtryArray(randomNumber());

// memo
const areChatTeamEqual = (prevProps: any, nextProps: any) => {
  return (
    prevProps.data.type === nextProps.data.type &&
    prevProps.data.level === nextProps.data.level &&
    prevProps.data.state === nextProps.data.state &&
    prevProps.data.price === nextProps.data.price &&
    prevProps.data.isHomeowner === nextProps.data.isHomeowner &&
    prevProps.data.max_quorum === nextProps.data.max_quorum &&
    prevProps.data.surplus === nextProps.data.surplus &&
    prevProps.data.isJoin === nextProps.data.isJoin
  );
};
const areChatHint = (prevProps: any, nextProps: any) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};
const areChatDrawerBodyEqual = (prevProps: any, nextProps: any) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};
const areInputOptionsEqual = (prevProps: any, nextProps: any) => {
  if (prevProps.users.length === nextProps.users.length) {
    for (let i = 0; i < prevProps.users.length; i++) {
      if (prevProps.users[i].key !== nextProps.users[i].key) {
        return false;
      }
    }
  } else {
    return false;
  }
  return prevProps.currentSelectUser === nextProps.currentSelectUser;
};

const MemoChatDrawerTeam = React.memo(ChatDrawerTeam, areChatTeamEqual);
const MemoChatHint = React.memo(ChatHint, areChatHint);
const MemoChatDrawerBody = React.memo(ChatDrawerBody, areChatDrawerBodyEqual);
const MemoInputOptions = React.memo(ChatInputOptions, areInputOptionsEqual);

const Room = () => {
  /*tools */
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isLogin = useAppSelector((state) => state.user.isLogin) as boolean;
  const username = useAppSelector((state) => state.user.username) as string;
  const access_token = useAppSelector(
    (state) => state.user.access_token
  ) as string;
  const createRoomFlag = useAppSelector((state) => state.room.flag) as number;
  const createRoomData = useAppSelector((state) => state.room.newCreate) as any;
  const orderby = useAppSelector((state) => state.room.orderBy) as
    | string
    | null;
  const search = useAppSelector((state) => state.room.search) as string | null;

  /*state */
  const [RoomList, setRoomList] = React.useState([
    {
      roomName: "",
      key: nanoid(),
      roomId: "",
      state: 0,
      online: 0,
      teammate: [{ username: "", key: nanoid(), avatorColor: "pink" }],
      surplus: 0,
      description: "",
      pk: 0,
      favorited: 0,
      stateType: 1,
    },
  ]);
  const [TeamInfo, setTeamInfo] = React.useState<TeamInfoProps>({
    level: "",
    type: 1,
    price: 99,
    state: 0,
    isHomeowner: false,
    max_quorum: 0,
    surplus: 0,
    surplusEmtryArray: [{ key: "" }],
    join_users: [{ key: "", name: "", avatorColor: "" }],
    isJoin: false,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToRoomInfo, setUserToRoomInfo] =
    React.useState<UserToRoomInfoProps>({
      isDrawer: false,
      roomName: "",
      roomId: "",
      pk: 0,
      key: "",
    });
  const [message, dispatchMessage] = React.useReducer(messageReducer, []);
  const websocketRef = React.useRef<WebSocket | null>(null);
  const dbIdx = React.useRef(1);
  const [allPayState, dispatchPayState] = React.useReducer(
    payStateReducer,
    payStateInitialState
  );
  const isOpenQrRef = React.useRef(false);
  const [currentSelectUser, setcurrentSelectUser] = React.useState("");
  const [items, setUsers] = React.useState<MenuProps["items"]>([
    { key: "", label: <div></div> },
  ]);
  const [emailModel, setMailModel] = React.useState(false);
  const beforeSaveUserOpenRoom = React.useRef<RoomInfo | null>();
  const currentPageNumRef = React.useRef(1);
  const sumPageNum = React.useRef(1);
  const [loadingMoreState, setLoadingMoreState] = React.useState(0);
  const [isCloseWs, setisCloseWs] = React.useState(false);

  /*request */
  const getTypeOfRooms = async (
    type: string,
    orderby?: string | null,
    searchValue?: string | null,
    clear?: boolean | null
  ) => {
    let result = await fecther(
      `room/?type=${type.split("/")[2]}&order_by=${
        orderby ? orderby : "None"
      }&search=${searchValue ? searchValue : "None"}&page_num=${
        searchValue ? 1 : currentPageNumRef.current
      }`,
      {},
      "get"
    );
    if (result.code !== 200) dispatch(changeMessage([result.message, false]));
    else {
      let roomList: any = [];
      sumPageNum.current = result.page_count;
      result.data.forEach((item: any, index: number) => {
        roomList.push({
          pk: item.pk,
          roomName: item.name,
          key: nanoid(),
          roomId: item.uuid,
          online: item.message_count,
          teammate: [],
          state: item.state,
          surplus: item.surplus,
          description: textPhase(item.description),
          favorited: item.favorited ? 1 : 0,
          stateType: item.stateType,
        });
        item.users.forEach((item: any) => {
          roomList[index].teammate.push({
            username: item.user,
            key: nanoid(),
            avatorColor: item.avator_color,
          });
        });
      });
      if (currentPageNumRef.current == sumPageNum.current) {
        setLoadingMoreState(2);
      } else {
        setLoadingMoreState(0);
      }
      if (clear) {
        setRoomList(roomList);
      } else {
        setRoomList([...RoomList, ...roomList]);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // 获取车队信息
  const getTeamInfo = async (pk: number) => {
    let result = await fecther(`team/?pk=${pk}`, {}, "get");
    if (result.code !== 200) return;
    let oldValue: TeamInfoProps = {
      level: "",
      type: 1,
      price: 99,
      isHomeowner: false,
      state: 0,
      max_quorum: 0,
      surplus: 0,
      surplusEmtryArray: [{ key: "" }],
      join_users: [{ key: "", name: "", avatorColor: "" }],
      isJoin: false,
    };
    oldValue.isHomeowner = result.data.homeowner === username ? true : false;
    oldValue.level = result.data.level;
    oldValue.state = result.data.state;
    oldValue.type = result.data.type;
    oldValue.price = result.data.price;
    oldValue.max_quorum = result.data.max_quorum;
    oldValue.surplus = result.data.surplus;
    oldValue.surplusEmtryArray = generatorEmtryArray(result.data.surplus);
    oldValue.join_users = [];
    result.data.users.forEach((item: any) => {
      oldValue.join_users.push({
        key: nanoid(),
        name: item.username,
        avatorColor: item.avator_color,
      });
      if (item.username === username) oldValue.isJoin = true;
    });
    setTeamInfo(oldValue);
  };

  /**methods */
  // 打开房间
  const openRoom = (roomInfo: RoomInfo) => {
    for (let i = 0; i < RoomList.length; i++) {
      if (RoomList[i].pk === roomInfo.pk) {
        if (RoomList[i].stateType === 2) {
          if (!isLogin) {
            dispatch(changeMessage(["该车队类型「自备邮箱」,请登录", false]));
          } else if (localStorage.getItem("selfMail") === null) {
            beforeSaveUserOpenRoom.current = roomInfo;
            setMailModel(true);
          } else {
            getTeamInfo(roomInfo.pk);
            const data = { ...roomInfo, isDrawer: true };
            setUserToRoomInfo(data);
          }
          return;
        }
      }
    }
    getTeamInfo(roomInfo.pk);
    const data = { ...roomInfo, isDrawer: true };
    setUserToRoomInfo(data);
  };

  // 关闭房间
  const closeRoom = () => {
    if (websocketRef.current !== null) {
      websocketRef.current.close();
      websocketRef.current = null;
    }
    isOpenQrRef.current = false;
    setUserToRoomInfo({ ...userToRoomInfo!, isDrawer: false });
  };

  // join team
  const joinTeam = async () => {
    if (!checkIslogin()) {
      dispatch(changeMessage([`请先登录或注册`, false]));
      return;
    }
    if (TeamInfo.isHomeowner) {
      dispatch(changeMessage([`队长禁止退出车队`, false]));
      return;
    }
    let result = await fecther(
      "team/",
      { room_id: userToRoomInfo.pk },
      TeamInfo.isJoin ? "delete" : "post"
    );
    if (result.code === 200) {
      let oldValue = { ...TeamInfo };
      if (oldValue.isJoin) {
        for (let i = 0; i < oldValue.join_users.length; i++) {
          if (oldValue.join_users[i].name === username) {
            oldValue.join_users.splice(i, 1);
            break;
          }
        }
        TeamInfo.surplusEmtryArray.push({ key: nanoid() });
        oldValue.surplus = oldValue.surplus - 1;
      } else {
        oldValue.surplus = oldValue.surplus + 1;
        TeamInfo.surplusEmtryArray.shift();
        oldValue.join_users.push({
          key: nanoid(),
          name: username,
          avatorColor: getStorage("avator_color"),
        });
      }
      setTeamInfo({ ...oldValue, isJoin: TeamInfo.isJoin ? false : true });
      getTeamInfo(userToRoomInfo.pk);
    }
    dispatch(
      changeMessage([result.message, result.code === 200 ? true : false])
    );
  };

  const checkIslogin = () => {
    if (!isLogin) return false;
    return true;
  };

  // 读取历史消息
  const initMessageRecord = React.useCallback(async () => {
    if (getStorage(userToRoomInfo.roomId)) {
      let result = await getAllItems(
        "teamup_chat_record_db",
        userToRoomInfo.roomId,
        getStorage("db_version")
      );
      result.map((item) => dispatchMessage({ type: "push", payload: item }));
      if (result.length === 0) return;
      dbIdx.current = result[result.length - 1].id + 4;
      dispatchMessage({
        type: "ADD_MESSAGE",
        payload: {
          create_time: new Date().getTime() / 1000,
          id: dbIdx.current - 2,
          key: nanoid(),
          message: "以上为历史消息",
          user: "system",
          who: 0,
        },
      });
    }
  }, [userToRoomInfo.pk]);

  // 接收消息处理程序 + 存入indexedb
  const receptionMessage = async (msg: any) => {
    const jsonMessage = JSON.parse(msg);
    if (jsonMessage.message === "连接成功") return;

    // 构建
    const newItem = {
      user: jsonMessage.username,
      key: nanoid(),
      message: jsonMessage.aite
        ? `@${jsonMessage.aite}${jsonMessage.message}`
        : jsonMessage.message,
      create_time: jsonMessage.create_time,
      who:
        jsonMessage.username === "system"
          ? 0
          : jsonMessage.username === username
          ? 1
          : 2,
    };
    // 判断对应存储空间和localstorage内是否标记
    if (!getStorage(userToRoomInfo.roomId)) {
      setStorage(userToRoomInfo.roomId, 1);
      const newDBVersion = parseInt(getStorage("db_version")) + 3;
      setStorage("db_version", newDBVersion);
      await createOrOpenDB(userToRoomInfo.roomId, newDBVersion);
    } else {
      await createOrOpenDB(
        userToRoomInfo.roomId,
        parseInt(getStorage("db_version"))
      );
    }

    dispatchMessage({ type: "push", payload: newItem });

    // 不保存system发送的消息
    if (jsonMessage.username === "system") {
      if (jsonMessage.message.includes("已付款")) {
        const payedUsername = jsonMessage.message.split("已付款")[0];
        listenWsToPaySuccess(payedUsername);
      } else if (jsonMessage.message === "全员付款完毕") {
        listenWsToAllPayed();
      } else if (jsonMessage.message.includes("已发车")) {
        listenWsToDeparture();
      } else if (jsonMessage.message.includes("账号分配成功")) {
        listenWsToAccount();
      }
      return;
    }
    // 添加到数据库
    addItem(
      "teamup_chat_record_db",
      userToRoomInfo.roomId,
      getStorage("db_version"),
      {
        ...newItem,
        id: dbIdx.current++,
      }
    );
  };

  const connectRoom = React.useCallback(async () => {
    if (!websocketRef.current || websocketRef.current.readyState === 3) {
      dispatchMessage({ type: "clear" });
      setisCloseWs(false);
      websocketRef.current = new WebSocket(
        `ws://192.168.31.69/ws/room/${userToRoomInfo.pk}/${access_token}/`
        // `ws://198.211.58.237/ws/room/${userToRoomInfo.pk}/${access_token}/`
      );
      websocketRef.current.onopen = function () {
        initMessageRecord();
        if (!websocketRef.current) return;
        websocketRef.current.onmessage = (event) => {
          receptionMessage(event.data);
        };
      };
      // websocketRef.current.onerror = () => {
      //   console.log("error");
      // };
      websocketRef.current.onclose = () => {
        setisCloseWs(true);
      };
      getAllPayState();
    }
  }, [userToRoomInfo.pk]);

  const sendMessage = (value: string) => {
    if (!checkVaildate(value)) {
      dispatch(changeMessage([`请有效字符`, false]));
      return;
    }
    if (!websocketRef.current) return;
    websocketRef.current.send(
      JSON.stringify({
        message: value,
        username,
        aite: currentSelectUser ? currentSelectUser : "None",
      })
    );
    selectAiteUser("");
  };

  // 发车
  const departure = async () => {
    if (TeamInfo.state !== 0) return;
    let result = await fecther(
      "handler/",
      { room_id: userToRoomInfo.pk },
      "post"
    );
    if (result.code === 200) {
      setTeamInfo({ ...TeamInfo, state: 1 });
    }
    dispatch(
      changeMessage([result.message, result.code === 200 ? true : false])
    );
    await getAllPayState();
    isOpenQrRef.current = true;
  };

  // 获取全员支付状态
  const getAllPayState = async () => {
    let result = await fecther(
      `paystate/?room_pk=${userToRoomInfo.pk}`,
      {},
      "get"
    );
    if (result.code !== 200) {
      dispatchPayState({ type: "clear" });
      return;
    }
    for (let i = 0; i < result.data.length; i++) {
      if (result.data[i].user === username) {
        result.data["selfPayCode"] = result.data[i].qrcode;
        result.data["expire_time"] = result.data[i].create_time + 60 * 3;
        result.data["price"] = result.data[i].price;
        result.data["payState"] = result.data[i].state;
        result.data["discountPrice"] = result.data[i].discountPrice;
        result.data["order_id"] = result.data[i].order_id;
        break;
      }
    }
    dispatchPayState({ type: "init", payload: result.data });
  };

  // 刷新二维码
  const flushQr = async () => {
    let result = await fecther(
      "paystate/",
      { room_id: userToRoomInfo.pk },
      "put"
    );
    if (result.code !== 200) return;
    // fetch
    dispatchPayState({
      type: "flushQr",
      payload: {
        expire_time: parseInt(new Date().getTime() / 1000 + "") + 3 * 60,
      },
    });
  };

  // @选择用户
  const selectAiteUser = (user: string) => {
    setcurrentSelectUser(user);
  };

  // 获取@列表
  const getUsers = async () => {
    if (items && items[0] && items[0].key !== "") return;
    let result = await fecther(
      `handler/?room_pk=${userToRoomInfo.pk}`,
      {},
      "get"
    );
    if (result.code !== 200) return;
    const data = [{ key: "", label: "" }];
    if (result.data.length === 0) {
      data.push({
        key: nanoid(),
        // @ts-ignore
        label: <div>暂无</div>,
      });
    } else {
      result.data.forEach((item: string) => {
        if (item !== username) {
          data.push({
            key: nanoid(),
            // @ts-ignore
            label: (
              <div onClick={() => selectAiteUser(item)}>
                {"@" + item}
                {item === result.leader ? (
                  <span style={{ marginLeft: "10px", color: "#05b665" }}>
                    队长
                  </span>
                ) : null}
              </div>
            ),
          });
        }
      });
    }
    data.splice(0, 1);
    setUsers([...data]);
  };

  // 接收来自websocket的  已付款消息
  const listenWsToPaySuccess = (user: string) => {
    if (user === "") return;
    dispatchPayState({
      type: "changePayState",
      payload: { successUser: user, username: username },
    });
  };

  // 接收来自websocket的 全体支付完毕
  const listenWsToAllPayed = () => {
    getTeamInfo(userToRoomInfo.pk);
  };

  // 接收来自websocket的 已发车
  const listenWsToDeparture = () => {
    getAllPayState();
  };

  // 接收来自websocket的 账号已发送
  const listenWsToAccount = () => {
    getTeamInfo(userToRoomInfo.pk);
  };

  // 收藏
  const favoriteRoom = async (roomPk: number, type: number) => {
    if (!isLogin) {
      dispatch(changeMessage(["请先登录或注册", false]));
      return;
    }
    let result = await fecther("handler/", { room_pk: roomPk, type }, "put");
    if (result.code === 200) {
      let newValue = [...RoomList];
      newValue.forEach((item) => {
        if (item.pk === roomPk) {
          item.favorited = item.favorited === 1 ? 0 : 1;
        }
      });
      setRoomList(newValue);
    }
    dispatch(
      changeMessage([result.message, result.code === 200 ? true : false])
    );
  };

  // 进入自备邮箱房间 前执行操作
  const afterSaveUserMailOpenRoom = () => {
    setMailModel(false);
    if (!beforeSaveUserOpenRoom.current) return;
    openRoom(beforeSaveUserOpenRoom.current);
  };

  // 加载更多
  const loadingMoreRooms = () => {
    if (currentPageNumRef.current >= sumPageNum.current || isLoading) return;
    currentPageNumRef.current += 1;
    setLoadingMoreState(1);
    getTypeOfRooms(location.pathname, "", "", false);
  };

  // close ws
  const closeWs = () => {
    if (websocketRef.current && websocketRef.current.readyState === 1) {
      websocketRef.current.close();
    }
  };

  // reconnect
  const reconnect = () => {
    setisCloseWs(false);
    connectRoom();
  };

  // 使用折扣码
  const useDiscount = async (code: string) => {
    let result = await fecther(
      "paystate/",
      {
        orderId: allPayState.order_id,
        discountCode: code,
        roomId: userToRoomInfo.pk,
      },
      "post"
    );
    if (result.code === 200) {
      dispatchPayState({
        type: "changeOrderDiscountPrice",
        payload: {
          discountPrice: result.discountPrice,
        },
      });
    }
    dispatch(
      changeMessage([result.message, result.code === 200 ? true : false])
    );
  };

  // listen router
  useEffect(() => {
    setIsLoading(true);
    getTypeOfRooms(location.pathname, "", "", true); // eslint-disable-next-line
  }, [location.pathname]);

  // ws
  useEffect(() => {
    if (!checkIslogin()) return;
    if (websocketRef.current === null && userToRoomInfo.pk !== 0) {
      connectRoom();
      setUsers([]);
      getUsers();
    }

    return () => {};
  }, [userToRoomInfo.pk]);

  // listen new room
  useEffect(() => {
    if (createRoomFlag === 0) return;
    let newValue = [...RoomList];
    newValue.unshift({
      pk: createRoomData.pk,
      roomName: createRoomData.name,
      key: nanoid(),
      state: 0,
      roomId: createRoomData.uuid,
      online: 28,
      teammate: [
        {
          avatorColor: createRoomData.users[0].avator_color,
          username: createRoomData.users[0].user,
          key: nanoid(),
        },
      ],
      surplus: createRoomData.surplus,
      description: textPhase(createRoomData.description),
      favorited: 0,
      stateType: createRoomData.stateType,
    });
    setRoomList(newValue);
  }, [createRoomFlag]);

  // order by room
  useEffect(() => {
    if (!orderby) return;
    setIsLoading(true);
    getTypeOfRooms(location.pathname, orderby, "", true);
  }, [orderby]);

  // search by room
  useEffect(() => {
    if (!search) return;
    setIsLoading(true);
    getTypeOfRooms(location.pathname, "", search, true);
    dispatch(changeSearchValue(null));
  }, [search]);

  return (
    <>
      <Wrap>
        <Drawer
          style={{ position: "relative" }}
          title={
            userToRoomInfo && (
              <ChatDrawerTitle
                roomName={userToRoomInfo.roomName}
                roomId={userToRoomInfo.roomId}
              />
            )
          }
          placement="right"
          open={userToRoomInfo && userToRoomInfo.isDrawer}
          onClose={closeRoom}
          width="500px"
        >
          <MemoChatDrawerTeam
            data={TeamInfo}
            join={joinTeam}
            departure={departure}
          />
          <MemoChatHint />
          <MemoChatDrawerBody
            isCloseWs={isCloseWs}
            message={message}
            isLogin={isLogin}
            reconnect={reconnect}
            roomName={TeamInfo.level}
            roomType={TeamInfo.type}
          />
          <BottomOptions>
            <div className="options">
              <MemoInputOptions
                users={items}
                currentSelectUser={currentSelectUser}
              />
              {isLogin && allPayState.isDeparture ? (
                <>
                  <ChatUserPayState data={allPayState.all} />
                  <ChatPayCode
                    useDiscount={useDiscount}
                    flushQr={flushQr}
                    isOpenQr={isOpenQrRef.current}
                    price={allPayState.price}
                    qrcode={allPayState.selfPayCode}
                    expire_time={allPayState.expire_time}
                    payState={allPayState.payState}
                    discountPrice={allPayState.discountPrice}
                  />
                </>
              ) : null}
            </div>
            <ChatMessageInput
              isCloseWs={isCloseWs}
              closeWs={closeWs}
              send={sendMessage}
              isLogin={isLogin}
            />
          </BottomOptions>
        </Drawer>
        {isLoading ? (
          <>
            {loadingEmtryArray?.map((item) => {
              return <LoadingItem key={item.key} />;
            })}
          </>
        ) : (
          <>
            <>
              {RoomList.length === 0 ? (
                <div className="empty">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="没有找到车队哦 *_*"
                  />
                </div>
              ) : (
                <>
                  {RoomList.map((item, index) => {
                    return (
                      <Item
                        room={item}
                        key={item.key}
                        open={openRoom}
                        favorite={favoriteRoom}
                      />
                    );
                  })}
                </>
              )}
            </>
          </>
        )}

        <Modal
          title="该车队类型为「自备邮箱」,填写完毕后进入车队"
          centered
          open={emailModel}
          onCancel={() => setMailModel(false)}
          footer={[]}
          width={420}
        >
          <SelfMail open={afterSaveUserMailOpenRoom} />
        </Modal>
      </Wrap>

      {isLoading ? null : (
        <>
          {loadingMoreState !== 2 ? (
            <LoadingMore>
              {loadingMoreState === 0 ? (
                <div className="btnbody" onClick={loadingMoreRooms}>
                  加载更多车队
                  <img width={20} src={LoadingMoreIcon} alt="more" />
                </div>
              ) : (
                <Spin indicator={antIcon} />
              )}
            </LoadingMore>
          ) : null}
        </>
      )}
    </>
  );
};

export default Room;

const Item = (props: RoomItemProps) => {
  const heightline = useAppSelector(
    (state) => state.room.heightLinePk
  ) as number;

  React.useEffect(() => {
    const clipboard = new ClipboardJS(".shareicon");
    return () => {
      clipboard.destroy();
    };
  }, []);

  return (
    <ItemWrap
      style={{
        animation:
          props.room.pk === heightline
            ? "newLoadinghighlight 1s ease-in-out"
            : "",
      }}
    >
      <div
        className="title"
        onClick={() =>
          props.open({
            roomName: props.room.roomName,
            key: props.room.key,
            roomId: props.room.roomId,
            pk: props.room.pk,
          })
        }
      >
        <div>{props.room.roomName}</div>
        <div className="roomid">#{props.room.roomId}</div>
      </div>
      <div className="options">
        <img
          src={ShareIcon}
          alt="share"
          className="shareicon"
          data-clipboard-text={`https://${window.location.hostname}/shareroom?id=${props.room.roomId}`}
        />
        <img
          onClick={() =>
            props.favorite(props.room.pk, props.room.favorited === 1 ? 0 : 1)
          }
          src={props.room.favorited ? FavoriteIcon : UnFavoriteIcon}
          alt="favorite"
        />

        <Badge
          color={"#05b665"}
          count={props.room.online}
          size="small"
          overflowCount={99}
        >
          <img src={MsgIcon} alt="msg" />
        </Badge>
      </div>

      <div
        className="description"
        onClick={() =>
          props.open({
            roomName: props.room.roomName,
            key: props.room.key,
            roomId: props.room.roomId,
            pk: props.room.pk,
          })
        }
      >
        <div>{props.room.description}</div>
      </div>
      <div
        className="people_list"
        onClick={() =>
          props.open({
            roomName: props.room.roomName,
            key: props.room.key,
            roomId: props.room.roomId,
            pk: props.room.pk,
          })
        }
      >
        {props.room.teammate.map((item, index) => {
          return (
            <PeopleItem
              key={item.key}
              people={item}
              state={props.room.state}
              index={index}
              surplus={props.room.surplus}
            />
          );
        })}
      </div>
    </ItemWrap>
  );
};

const LoadingItem = () => {
  return (
    <ItemWrap>
      <div className="title">
        <Skeleton.Input active block />
      </div>
      <div className="description">
        <Skeleton active />
      </div>
      <div className="people_list">
        <Skeleton.Avatar active className="loading_avator" />
        <Skeleton.Avatar active className="loading_avator" />
        <Skeleton.Avatar active className="loading_avator" />
        <Skeleton.Avatar active className="loading_avator" />
        <Skeleton.Avatar active className="loading_avator" />
      </div>
    </ItemWrap>
  );
};

const antIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: "#05b665" }} spin />
);
