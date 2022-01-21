import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@stores/store";
import { IUserPublic } from "@typing/user.interface";

// State
interface UserState {
  authenticatedUser?: IUserPublic;
}

const initialState: UserState = {
  authenticatedUser: null,
};

// Reducers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<IUserPublic>) => {
      state.authenticatedUser = action.payload;
    },
    resetUser: (state: UserState) => {
      state.authenticatedUser = null;
    },
  },
});

// Selector
const selectAuthenticatedUser = (state: RootState): IUserPublic =>
  state.user.authenticatedUser;
const selectIsAuthenticated = (state: RootState): boolean =>
  !!state.user.authenticatedUser;

export const { setUser, resetUser } = userSlice.actions;
export const { reducer: userReducer } = userSlice;
export { selectAuthenticatedUser, selectIsAuthenticated };
