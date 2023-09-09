import { getStorage } from "./localStorage";

export function getCurrentDateFormatted() {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2); // 获取年份的最后两位
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 月份从0开始，需要+1，并且确保两位数
  const day = today.getDate().toString().padStart(2, "0"); // 日确保两位数

  const formattedDate = `20${year}.${month}.${day}`;
  return formattedDate;
}

export const isLogin = () => {
  return getStorage("accessToken") ? true : false;
};

export const getCurrentTs = () => {
  return parseInt(new Date().getTime() / 1000 + "");
};
