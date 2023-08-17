export const messageReducer = (state: any, action: any) => {
  switch (action.type) {
    case "push":
      return [...state, action.payload];
    case "clear":
      return [];
    default:
      return state;
  }
};

export const payStateReducer = (state: any, action: any) => {
  switch (action.type) {
    case "push":
      return {
        isDeparture: true,
        selfPayCode: action.payload.selfPayCode,
        expire_time: action.payload.expire_time,
        payState: action.payload.payState,
        price: action.payload.price,
        all: [...state.all, action.payload],
      };
    case "init":
      return {
        isDeparture: true,
        selfPayCode: action.payload.selfPayCode,
        expire_time: action.payload.expire_time,
        payState: action.payload.payState,
        price: action.payload.price,
        all: [...action.payload],
      };
    case "flushQr":
      return {
        isDeparture: state.isDeparture,
        selfPayCode: state.selfPayCode,
        expire_time: action.payload.expire_time,
        payState: state.payState,
        price: state.price,
        all: [...state.all],
      };
    default:
      return state;
  }
};

export const payStateInitialState = {
  isDeparture: false,
  selfPayCode: "",
  expire_time: 0,
  payState: 0,
  price: 0,
  all: [
    {
      order_id: "",
      price: 99,
      qrcode: "",
      state: 0,
      user: "",
      avatorColor: "",
    },
  ],
};
