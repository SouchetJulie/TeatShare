import {
  FetchLessonsParameters,
  getLessons,
} from "@client/services/lesson.service";
import { useAppDispatch, useAppSelector } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { selectIsAuthenticated } from "@stores/user.store";
import { ApiErrorResponse, ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getAxiosErrorMessage } from "../utils/get-axios-error.utils";

/**
 * Returns for the `useFetchLessons` hook
 */
interface FetchLessonsReturns {
  /**
   * Whether there currently is an authenticated user
   */
  isAuthenticated: boolean;
  /**
   * The list of fetched lessons
   */
  lessons: ILesson[];
}

/**
 * Hook for fetching lessons. Fetches all lessons by default.
 * @param {FetchLessonsParameters} filters The parameters to filter the lessons
 * @return {FetchLessonsReturns} The lessons and whether there is an authenticated user
 */
const useFetchLessons = (
  filters: FetchLessonsParameters = {}
): FetchLessonsReturns => {
  const isAuthenticated: boolean = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const [lessons, setLessons] = useState<ILesson[]>([]);

  useEffect(() => {
    let isSubscribed = true;

    if (isAuthenticated) {
      getLessons(filters)
        .then((response: ApiResponse<{ lessons: ILesson[] }>) => {
          if (!response.success) {
            dispatch(
              addAlert({
                message: "Impossible de récupérer la liste des leçons",
                success: false,
                ttl: 3000,
              })
            );
          } else if (isSubscribed) {
            setLessons(response.data?.lessons ?? []);
          }
        })
        .catch((reason: AxiosError<ApiErrorResponse>) => {
          console.log(
            "Erreur récupération des leçons",
            getAxiosErrorMessage(reason)
          );
          dispatch(
            addAlert({
              message: "Impossible de récupérer la liste des leçons",
              success: false,
              ttl: 3000,
            })
          );
        });
    }

    return (): void => {
      isSubscribed = false;
    };
  }, [setLessons, isAuthenticated]);

  return { isAuthenticated, lessons };
};

export { useFetchLessons };
export type { FetchLessonsReturns };
