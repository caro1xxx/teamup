import { nanoid } from "nanoid";

// 策略
const Strategies = {
  isNonEmpty(value: string, errorMsg: string) {
    if (value === "") return errorMsg;
  },
  minLength(value: string, errorMsg: string, min: number) {
    if (value.length < min) return errorMsg;
  },
  checkEmailFormat(value: string, errorMsg: string) {
    let pattern =
      /^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!pattern.test(value)) return errorMsg;
  },
  codeLength(value: string, errorMsg: string) {
    return value.length === 4 ? errorMsg : undefined;
  },
  comparePsd(value: string, errorMsg: string) {
    return value[0] !== value[1] ? errorMsg : undefined;
  },
  maxLength(value: string, errorMsg: string, max: number) {
    if (value.length > max) return errorMsg;
  },
  isNumber(value: number, errorMsg: string) {
    if (value !== 1 && value !== 0) return errorMsg;
  },
  isAuth(value: number | string, errorMsg: string) {
    if (value !== 1 && value !== 0 && value !== "1" && value !== "0")
      return errorMsg;
  },
};

// 验证器
export class Validator {
  constructor() {
    //@ts-ignore
    this.cache = [];
  }
  //@ts-ignore
  add(dom, rule, errorMsg, min = 0) {
    //@ts-ignore
    this.cache.push(() => {
      //@ts-ignore
      return Strategies[rule](dom, errorMsg, min);
    });
  }

  start() {
    //@ts-ignore
    for (let i = 0; i < this.cache.length; i++) {
      //@ts-ignore
      let error = this.cache[i]();
      if (error) {
        return error;
      }
    }
  }
}

// 阻止事件传播
export const stopEventPropagation = (e: any) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};

export const parseStampTime = (stamp: number) => {
  const D = new Date(stamp * 1000);
  return `${D.getFullYear()}/${D.getMonth() + 1}/${D.getDate()} ${
    D.getHours() < 10 ? "0" + D.getHours() : D.getHours()
  }:${D.getMinutes() < 10 ? "0" + D.getMinutes() : D.getMinutes()}:${
    D.getSeconds() < 10 ? "0" + D.getSeconds() : D.getSeconds()
  }`;
};

export const calculateTimeDifference = (stamp: number) => {
  const diffStamp = new Date().getTime() / 1000 - stamp;
  const diffTime =
    diffStamp > 60
      ? diffStamp > 3600
        ? diffStamp > 86400
          ? parseInt(diffStamp / 86400 + "") + "天"
          : parseInt(diffStamp / 3600 + "") + "小时"
        : parseInt(diffStamp / 60 + "") + "分钟"
      : diffStamp + "秒";
  return diffTime;
};

export const randomNumber = () => Math.floor(Math.random() * 5) + 6;

export const generatorEmtryArray = (num: number) => {
  if (num === 0) return [];
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push({ key: nanoid() });
  }
  return arr;
};

export const randomHexColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16); // 生成随机的 24 位颜色值
  return `#${randomColor}`;
};

export const textPhase = (text: string) => {
  return text.substring(0, 100) + "...";
};

export const checkVaildate = (value: string) => {
  if (value === "" || value === " " || !value) return false;
  return true;
};
