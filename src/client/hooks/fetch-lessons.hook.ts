import { useAutoLogin } from "@hooks/auto-login.hook";
import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { ApiErrorResponse, ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import axios, { AxiosError, AxiosResponse } from "axios";
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
 * Available filters for the `useFetchLessons` hook
 */
interface FetchLessonsParameters {
  /**
   * Whether to fetch the current user's bookmarks only
   */
  bookmarks?: boolean;
  /**
   * Whether to fetch the draft lessons only
   */
  isDraft?: boolean;
  /**
   * Fetches the lessons written by this author only, if defined
   */
  author?: string;
}

const useFetchLessons = (
  filters: FetchLessonsParameters = {}
): FetchLessonsReturns => {
  const isAuthenticated = !!useAutoLogin();
  const dispatch = useAppDispatch();
  const [lessons, setLessons] = useState<ILesson[]>([]);

  useEffect(() => {
    let isSubscribed = true;

    if (isAuthenticated) {
      const searchParams = new URLSearchParams(Object.entries(filters));

      axios
        .get<ApiResponse<{ lessons: ILesson[] }>>(`/api/lesson?${searchParams}`)
        .then(
          ({
            data: response,
          }: AxiosResponse<ApiResponse<{ lessons: ILesson[] }>>) => {
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
          }
        )
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
