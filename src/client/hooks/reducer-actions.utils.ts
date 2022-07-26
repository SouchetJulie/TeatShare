/*
 * Actions
 */

export interface SetFieldAction<T> {
  type: "SET_FIELD";
  key: keyof T;
  value: T[keyof T];
}

export const setField = <T>(
  key: keyof T,
  value: T[keyof T]
): SetFieldAction<T> => ({
  type: "SET_FIELD",
  key,
  value,
});

export interface SetStateAction<T> {
  type: "SET_STATE";
  payload: T;
}
