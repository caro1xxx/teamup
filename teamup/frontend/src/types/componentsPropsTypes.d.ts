export type RoomItemProps = {
  room: {
    roomName: string;
    key: string;
    roomId: string;
    online: number;
    pk: number;
    teammate: {
      username: string;
      key: string;
      avatorColor: string;
    }[];
    surplus: number;
    description: string;
    favorited: number;
    state: number;
  };
  open: (roomInfo: RoomInfo) => void;
  favorite: (roomPk: number, type: number) => Promise<void>;
};

export type TeamInfoProps = {
  type: number;
  level: string;
  state: number;
  price: number;
  isHomeowner: boolean;
  max_quorum: number;
  surplus: number;
  surplusEmtryArray: { key: string }[];
  join_users: { key: string; name: string; avatorColor: string }[];
  isJoin: boolean;
};

export type UserToRoomInfoProps = {
  isDrawer: boolean;
  roomName: string;
  roomId: string;
  pk: number;
  key: string;
};

export type InfoState = {
  content: string;
  key: string;
  sendTime: number;
  send: string;
};

export type FavoriteState = {
  roomName: string;
  key: string;
  surplus: number;
  pk: number;
  roomId: string;
  type: string;
  state: number;
};

export type ActivityListState = {
  key: string;
  begin_time: number;
  end_time: number;
  image: string;
};

export interface ResultActivityListState {
  model: string;
  pk: number;
  fields: ActivityListState;
}

export type OrderFieldsState = {
  key: string;
  username: string;
  seat_number: number;
  password: number;
  seat_code: number;
  user_buy_expire_time: number;
};

export interface OrderState {
  model: string;
  pk: number;
  fields: OrderFieldsState;
}
