import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useFetchLesson = (): ILesson | undefined => {
  const router = useRouter();
  const [lesson, setLesson] = useState<ILesson | undefined>(undefined);
  const id = router.query.IdLesson;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.isReady) {
      axios
        .get<ApiResponse<{ lesson: ILesson }>>(`/api/lesson/${id}`)
        .then(({ data }) => {
          if (data.success) {
            setLesson(data.data?.lesson);
          } else {
            addAlert({ message: data.error, success: false, ttl: 2000 });
          }
        })
        .catch((err: Error) => {
          dispatch(
            addAlert({ message: err.message, success: false, ttl: 2000 })
          );
        });
    }
  }, [router.isReady]);

  return lesson;
};
