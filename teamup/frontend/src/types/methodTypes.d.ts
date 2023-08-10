export interface UserInfo {
  username: string;
  password: string;
  email: string;
  code: string;
  isLoading: number;
}

export interface LoginUserInfo {
  username: string;
  password: string;
}

export interface UserDetailInfo {
  detailInfo: {
    username: string;
    create_time: number;
    email: string;
    admin: boolean;
    premium: boolean;
  };
}
