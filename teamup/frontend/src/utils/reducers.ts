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
      return { isDeparture: true, all: [...state.all, action.payload] };
    case "init":
      return { isDeparture: true, all: [...action.payload] };
    default:
      return state;
  }
};

export const payStateInitialState = {
  isDeparture: false,
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
