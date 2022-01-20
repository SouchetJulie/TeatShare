import { configureStore } from "@reduxjs/toolkit";
import { alertReducer } from "./alert.store";
import { userReducer } from "@stores/user.store";

export const store = configureStore({
  reducer: {
    alerts: alertReducer,
    user: userReducer,
  },
  // Ignore non-serializable content for alerts
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["alerts/addAlert"],
        // Ignore these paths in the state
        ignoredPaths: ["alerts.list"],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
