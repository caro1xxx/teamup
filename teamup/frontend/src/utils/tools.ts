// export const checkComplete = (
//   target: any,
//   data: any,
//   exclude?: string[]
// ): boolean => {
//   for (let i in target) {
//     if (!data[i] && !exclude?.includes(i)) {
//       return false;
//     }
//   }
//   return true;
// };

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
