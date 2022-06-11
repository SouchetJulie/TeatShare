import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@stores/store";
import { IUserPublic } from "@typing/user.interface";

// State
interface UserState {
  authenticatedUser?: IUserPublic;
}

const initialState: UserState = {
  authenticatedUser: undefined,
};

// Reducers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state: UserState,
      action: PayloadAction<IUserPublic | undefined>
    ) => {
      state.authenticatedUser = action.payload;
    },
    clearUser: (state: UserState) => {
      state.authenticatedUser = undefined;
    },
    addBookmark: (
      state: UserState,
      action: PayloadAction<string> // lesson id
    ) => {
      state.authenticatedUser?.bookmarkIds.push(action.payload);
    },
    removeBookmark: (
      state: UserState,
      action: PayloadAction<string> // lesson id
    ) => {
      const bookmarkIndex: number | undefined =
        state.authenticatedUser?.bookmarkIds.findIndex(
          (lessonId: string) => lessonId === action.payload
        );
      if (bookmarkIndex !== undefined && bookmarkIndex >= 0)
        state.authenticatedUser?.bookmarkIds.splice(bookmarkIndex, 1);
    },
  },
});

// Selector
const selectAuthenticatedUser = (state: RootState): IUserPublic | undefined =>
  state.user.authenticatedUser;
const selectIsAuthenticated = (state: RootState): boolean =>
  !!state.user.authenticatedUser;

export const { setUser, clearUser, addBookmark, removeBookmark } =
  userSlice.actions;
export const { reducer: userReducer } = userSlice;
export { selectAuthenticatedUser, selectIsAuthenticated };
