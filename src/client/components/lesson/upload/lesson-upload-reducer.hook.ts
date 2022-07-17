import { SetFieldAction, SetStateAction } from "@hooks/reducer-actions.utils";
import { ILesson, ILessonCreate } from "@typing/lesson.interface";
import { Reducer, useReducer } from "react";

export const useLessonUploadReducer = (initialLesson?: ILesson) => {
  const reducer = (
    state: ILessonCreate | undefined,
    action: SetFieldAction<ILessonCreate> | SetStateAction<ILessonCreate>
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
      ILessonCreate | undefined,
      SetFieldAction<ILessonCreate> | SetStateAction<ILessonCreate>
    >
  >(
    reducer,
    Object.assign(
      {},
      { ...initialLesson, file: initialLesson?.file as unknown as File }
    )
  );
};

export const setLesson = (lesson: ILesson): SetStateAction<ILessonCreate> => ({
  type: "SET_STATE",
  payload: { ...lesson, file: lesson.file as unknown as File },
});
