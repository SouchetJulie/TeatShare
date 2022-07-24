import { SetFieldAction, SetStateAction } from "@hooks/reducer-actions.utils";
import { ILesson } from "@typing/lesson.interface";
import { Dispatch, Reducer, useReducer } from "react";

type LessonWithoutNotFilterable = Omit<
  ILesson,
  | "file"
  | "publicationDate"
  | "creationDate"
  | "lastModifiedDate"
  | "bookmarkCount"
  | "title"
  | "subtitle"
>;

type LessonDateFilters = {
  publicationDateBefore: string;
  publicationDateAfter: string;
  creationDateBefore: string;
  creationDateAfter: string;
  lastModifiedDateBefore: string;
  lastModifiedDateAfter: string;
};

type LessonBookmarkFilters = {
  bookmarksAbove: number;
  bookmarksBelow: number;
};

type LessonTextFilter = {
  text: string;
};

type LessonFilter = Partial<
  LessonWithoutNotFilterable &
    LessonBookmarkFilters &
    LessonDateFilters &
    LessonTextFilter
>;

const useLessonFilterReducer = () => {
  const reducer = (
    state: LessonFilter,
    action: SetFieldAction<LessonFilter> | SetStateAction<LessonFilter>
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
      LessonFilter,
      SetFieldAction<LessonFilter> | SetStateAction<LessonFilter>
    >
  >(reducer, {});
};

type LessonFilterDispatch = Dispatch<
  SetFieldAction<LessonFilter> | SetStateAction<LessonFilter>
>;
type LessonFilterState = LessonFilter;

export { useLessonFilterReducer };
export type { LessonFilterDispatch, LessonFilterState, LessonFilter };
