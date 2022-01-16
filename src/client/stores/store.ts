import {configureStore} from "@reduxjs/toolkit";
import {alertReducer} from "./alert.store";

export const store = configureStore({
  reducer: {
    alerts: alertReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
