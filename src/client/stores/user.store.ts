import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@stores/store";
import {IUserPublic} from "@typing/user.interface";

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
    setUser: (state: UserState, action: PayloadAction<IUserPublic | undefined>) => {
      state.authenticatedUser = action.payload;
    },
    resetUser: (state: UserState) => {
      state.authenticatedUser = undefined;
    },
  },
});

// Selector
const selectAuthenticatedUser = (state: RootState): IUserPublic | undefined =>
  state.user.authenticatedUser;
const selectIsAuthenticated = (state: RootState): boolean =>
  !!state.user.authenticatedUser;

export const {setUser, resetUser} = userSlice.actions;
export const {reducer: userReducer} = userSlice;
export {selectAuthenticatedUser, selectIsAuthenticated};
