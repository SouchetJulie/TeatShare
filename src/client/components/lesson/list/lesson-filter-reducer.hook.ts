import { SetFieldAction, SetStateAction } from "@hooks/reducer-actions.utils";
import { ILesson } from "@typing/lesson.interface";
import { Dispatch, Reducer, useReducer } from "react";

export const useLessonFilterReducer = () => {
  const reducer = (
    state: Partial<ILesson>,
    action: SetFieldAction<Partial<ILesson>> | SetStateAction<Partial<ILesson>>
  ) => {
    switch (action.type) {
      case "SET_FIELD":
        return {
          ...state,
          [action.key]: action.value,
        };
      case "SET_STATE":
        return action.payload;
      default:
        return state;
    }
  };

  return useReducer<
    Reducer<
      Partial<ILesson>,
      SetFieldAction<Partial<ILesson>> | SetStateAction<Partial<ILesson>>
    >
  >(reducer, {});
};

export type LessonFilterDispatch = Dispatch<
  SetFieldAction<Partial<ILesson>> | SetStateAction<Partial<ILesson>>
>;
export type LessonFilterState = Partial<ILesson>;
