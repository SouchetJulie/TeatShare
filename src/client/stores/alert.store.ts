import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@stores/store";
import { ReactNode } from "react";

export interface IAlert {
  message: ReactNode;
  success: boolean;
  id: number;
  ttl?: number;
}

// State
interface AlertState {
  list: IAlert[];
  counter: number;
}

const initialState: AlertState = {
  list: [],
  counter: 0,
};

// Reducers
const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (
      state: AlertState,
      action: PayloadAction<Omit<IAlert, "id">>
    ) => {
      state.list.push({
        ...action.payload,
        id: state.counter,
      });
      state.counter++;
    },
    removeAlert: (state: AlertState, action: PayloadAction<number>) => {
      state.list = state.list.filter(
        (alert: IAlert) => alert.id !== action.payload
      );
    },
  },
});

// Selector
const selectAlerts = (state: RootState) => state.alerts.list;

export const { addAlert, removeAlert } = alertSlice.actions;
export const { reducer: alertReducer } = alertSlice;
export { selectAlerts };
