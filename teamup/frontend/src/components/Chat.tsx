// /* eslint-disable */
// import React, {
//   useEffect,
//   useState,
//   useReducer,
//   useRef,
//   useCallback,
// } from "react";
// import styled from "styled-components";
// import FleetBackIcon from "../assets/images/fleet_back.png";
// import { fecther } from "../utils/fecther";
// import { nanoid } from "nanoid";
// import { generatorEmtryArray, parseStampTime } from "../utils/tools";
// import { setStorage, getStorage } from "../utils/localstorage";
// import { createOrOpenDB, addItem, getAllItems } from "../utils/chatDB";
// import { useAppSelector, useAppDispatch } from "../redux/hooks";
// import { changeMessage } from "../redux/modules/notifySlice";
// import { Button, Input } from "antd";
// import "../style/custome_antd.css";
// import { MessageOutlined } from "@ant-design/icons";
// import { sendMessage } from "../redux/modules/chatSlice";

// // @ts-ignore
// const messageReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_MESSAGE":
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// };

// const BodyWrap = styled.div`
//   height: calc(100vh - 200px - 50px);
//   overflow: scroll;
// `;

// export const ChatDrawerBody = (props: {
// pk: number;
// roomName: string;
// roomId: string;
// }) => {
//   const [message, dispatchMessage] = useReducer(messageReducer, []);
//   const username = useAppSelector((state) => state.user.username) as string;
//   const msg = useAppSelector((state) => state.chat.message) as string;
//   const flag = useAppSelector((state) => state.chat.flag) as number;
// const access_token = useAppSelector(
//   (state) => state.user.access_token
// ) as string;
//   const dbIdx = useRef(1);
//   const wsRef = useRef(null);

// // 接收消息处理程序 + 存入indexedb
// const receptionMessage = async (msg: any) => {
//   const jsonMessage = JSON.parse(msg);
//   if (jsonMessage.message === "连接成功") return;

//   // 构建
//   const newItem = {
//     user: jsonMessage.username,
//     key: nanoid(),
//     message: jsonMessage.message,
//     create_time: jsonMessage.create_time,
//     who:
//       jsonMessage.username === "system"
//         ? 0
//         : jsonMessage.username === username
//         ? 1
//         : 2,
//   };

//   // 判断对应存储空间和localstorage内是否标记
//   if (!getStorage(props.roomId)) {
//     setStorage(props.roomId, 1);
//     const newDBVersion = parseInt(getStorage("db_version")) + 3;
//     setStorage("db_version", newDBVersion);
//     await createOrOpenDB(props.roomId, newDBVersion);
//   } else {
//     await createOrOpenDB(props.roomId, parseInt(getStorage("db_version")));
//   }

//   dispatchMessage({ type: "ADD_MESSAGE", payload: newItem });

//   // 不保存system发送的消息
//   if (jsonMessage.username === "system") return;
//   // 添加到数据库
//   addItem("teamup_chat_record_db", props.roomId, getStorage("db_version"), {
//     ...newItem,
//     id: dbIdx.current++,
//   });
//   moveChatBottom();
// };

// const initMessageRecord = async () => {
//   if (getStorage(props.roomId)) {
//     let result = await getAllItems(
//       "teamup_chat_record_db",
//       props.roomId,
//       getStorage("db_version")
//     );
//     result.map((item) =>
//       dispatchMessage({ type: "ADD_MESSAGE", payload: item })
//     );
//     if (result.length === 0) return;
//     dbIdx.current = result[result.length - 1].id + 4;
//     dispatchMessage({
//       type: "ADD_MESSAGE",
//       payload: {
//         create_time: new Date().getTime() / 1000,
//         id: dbIdx.current - 2,
//         key: nanoid(),
//         message: "以上为历史消息",
//         user: "system",
//         who: 0,
//       },
//     });
//     moveChatBottom();
//   }
// };

//   const fromSubToSendMessage = async () => {
//     if (!wsRef.current) return;
//     try {
//       // @ts-ignore
//       wsRef.current.send(JSON.stringify({ message: msg, username }));
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const moveChatBottom = () => {
//     setTimeout(() => {
//       let ponit = document.getElementById("point");
//       if (ponit === null) return;
//       ponit.scrollIntoView({
//         behavior: "smooth",
//         block: "end",
//         inline: "nearest",
//       });
//     }, 1000);
//   };

//   const initWs = useCallback(() => {
//     if (!wsRef.current && wsRef.current !== undefined) {
//       console.log(wsRef.current);
//       // @ts-ignore
//       wsRef.current = new WebSocket(
//         `ws://192.168.31.69/ws/room/${props.pk}/${access_token}/`
//       );
//       // @ts-ignore
//       wsRef.current.onopen = function () {
//         initMessageRecord();
//         // @ts-ignore
//         wsRef.current.onmessage = (event) => receptionMessage(event.data);
//       };
//     }
//   }, [null]);

//   useEffect(() => {
//     initWs();
//     return () => {
//       // @ts-ignore
//       wsRef.current.close();
//     };
//   }, [null]);

//   useEffect(() => {
//     if (msg === "" || !msg) return;
//     fromSubToSendMessage(); // eslint-disable-next-line
//   }, [flag]);

//   return (
//     <BodyWrap>
// {message.map((item: any) => {
//   return (
//     <MessageItem
//       key={item.key}
//       user={item.user}
//       message={item.message}
//       who={item.who}
//       create_time={item.create_time}
//     />
//   );
// })}
// <div id="point"></div>
//     </BodyWrap>
//   );
// };

// const MsgItemWrap = styled.div<{ $who: number }>`
//   position: relative;
//   display: flex;
//   vertical-align: top;
//   justify-content: ${(props) =>
//     props.$who === 0 ? "center" : props.$who === 1 ? "end" : "start"};
//   align-items: center;
//   .system {
//     color: #636363;
//     font-size: 12px;
//     margin: 10px 0px;
//     cursor: pointer;
//     user-select: none;
//   }
//   .other {
//     margin: 20px 0px;
//     padding: 10px;
//     color: #000;
//     border-radius: 3px;
//     max-width: 300px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     background-color: #fff;
//   }
//   .self {
//     margin: 20px 0px;
//     background-color: #05b665;
//     padding: 10px;
//     color: #000;
//     border-radius: 3px;
//     max-width: 300px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }
//   .time {
//     position: absolute;
//     right: ${(props) => (props.$who === 1 ? "0px" : "")};
//     left: ${(props) => (props.$who === 2 ? "0px" : "")};
//     bottom: 0px;
//     font-size: 10px;
//     color: white;
//     cursor: pointer;
//     user-select: none;
//     font-weight: lighter;
//   }
// `;

// const MessageItem = (props: {
//   user: string;
//   message: string;
//   who: number;
//   create_time: number;
// }) => {
//   return (
//     <MsgItemWrap $who={props.who}>
//       <div
//         className={
//           props.who === 0 ? "system" : props.who === 1 ? "self" : "other"
//         }
//       >
//         {props.message}
//         {props.who !== 0 ? (
//           <div className="time">{parseStampTime(props.create_time)}</div>
//         ) : null}
//       </div>
//     </MsgItemWrap>
//   );
// };

// const { Search } = Input;

// const checkVaildate = (value: string) => {
//   if (value === "" || value === " " || !value) return false;
//   return true;
// };

// const InputWrap = styled.div`
//   position: absolute;
//   bottom: 0px;
//   height: 50px;
//   width: 450px;
//   .cutomer .ant-input-search-button {
//     background-color: #05b665;
//     color: #fff;
//     border-color: #05b665;
//     box-shadow: none;
//   }
//   .cutomer .ant-input-search-button:hover {
//     background-color: #2a9263ac;
//     border-color: #2a9263ac;
//     box-shadow: none;
//   }
//   .cutomer :hover {
//     border-color: #2a9263ac;
//     box-shadow: none;
//   }
//   .cutomer :focus,
//   :hover,
//   .ant-input-focused {
//     border-color: #2a9263ac;
//     box-shadow: none;
//   }
// `;

// export const ChatMessageInput = (props: {}) => {
//   const [inputContent, setInputContent] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useAppDispatch();

//   const send = () => {
//     if (isLoading) return;
//     setIsLoading(true);
//     if (!checkVaildate(inputContent)) {
//       dispatch(changeMessage([`请有效字符`, false]));
//       return;
//     }
//     dispatch(sendMessage(inputContent));
//     setInputContent("");
//     setTimeout(() => setIsLoading(false), 500);
//   };

//   const onKeyDownEnter = (event: any) => {
//     if (event.code !== "Enter") return;
//     send();
//   };

//   return (
//     <InputWrap onKeyDown={onKeyDownEnter}>
// <Search
//   value={inputContent}
//   onChange={(e) => setInputContent(e.target.value)}
//   size="large"
//   className="cutomer"
//   placeholder="请输入消息"
//   enterButton={<MessageOutlined />}
//   onSearch={send}
//   loading={isLoading}
// />
//     </InputWrap>
//   );
// };

export const x = 1;
