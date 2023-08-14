export type RoomInfo = {
  roomName: string;
  roomId: string;
  key: string;
  pk: number;
  isDrawer: boolean;
};

export type TeamInfo = {
  max_quorum: number;
  surplus: number;
  surplusEmtryArray: {
    key: string;
  }[];
  join_users: {
    key: string;
    name: string;
  }[];
};
