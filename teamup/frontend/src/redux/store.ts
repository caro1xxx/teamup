import { configureStore } from "@reduxjs/toolkit";
import notifySlice from "./modules/notifySlice";
import userSlice from "./modules/userSlice";
import chatSlice from "./modules/chatSlice";
import roomSlice from "./modules/roomSlice";

export const store = configureStore({
  reducer: {
    notify: notifySlice,
    user: userSlice,
    chat: chatSlice,
    room: roomSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
