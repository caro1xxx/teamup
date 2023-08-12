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
  };
  open: (roomInfo: RoomInfo) => void;
};
