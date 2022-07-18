import { ILesson, ILessonCreate } from "@typing/lesson.interface";
import { Reducer, useReducer } from "react";

export const useLessonUploadReducer = (initialLesson?: ILesson) => {
  const reducer = (
    state: ILessonCreate | undefined,
    action: LessonSetField | LessonSetLesson
  ) => {
    switch (action.type) {
      case "SET_FIELD":
        return {
          ...state,
          [action.key]: action.value,
        };
      case "SET_LESSON":
        return action.payload;
      default:
        return state;
    }
  };

  return useReducer<
    Reducer<ILessonCreate | undefined, LessonSetField | LessonSetLesson>
  >(
    reducer,
    Object.assign(
      {},
      { ...initialLesson, file: initialLesson?.file as unknown as File }
    )
  );
};

/*
 * Actions
 */
export interface LessonSetField {
  type: "SET_FIELD";
  key: keyof ILessonCreate;
  value: ILessonCreate[keyof ILessonCreate];
}

export const setField = (
  key: keyof ILessonCreate,
  value: ILessonCreate[keyof ILessonCreate]
): LessonSetField => ({
  type: "SET_FIELD",
  key,
  value,
});

export interface LessonSetLesson {
  type: "SET_LESSON";
  payload: ILessonCreate;
}

export const setLesson = (lesson: ILesson): LessonSetLesson => ({
  type: "SET_LESSON",
  payload: { ...lesson, file: lesson.file as unknown as File },
});
