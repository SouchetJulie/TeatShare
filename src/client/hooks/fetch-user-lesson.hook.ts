import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import axios, { AxiosResponse } from "axios";

import { useState } from "react";

export const useFetchUserLessons = (idList: string[] | []): ILesson[] => {
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const dispatch = useAppDispatch();

  idList.forEach((id) => {
    axios
      .get<ApiResponse<{ lesson: ILesson }>>(`/api/lesson/${id}`)
      .then(({ data }: AxiosResponse<any>) => {
        if (data.success && data.data?.lesson) {
          setLessons((prevState) => [...prevState, data.data?.lesson]);
        } else {
          addAlert({ message: data.error, success: false, ttl: 2000 });
        }
      })
      .catch((err: Error) => {
        dispatch(addAlert({ message: err.message, success: false, ttl: 2000 }));
      });
  });

  return lessons;
};
