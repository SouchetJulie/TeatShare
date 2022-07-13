import LessonDetails from "@components/lesson/detail/LessonDetails";
import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const IdLesson = () => {
  const router = useRouter();
  const [lesson, setlesson] = useState<ILesson | undefined>();
  const id = router.query.IdLesson;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.isReady) {
      axios
        .get<ApiResponse<{ lesson: ILesson }>>(`/api/lesson/${id}`)
        .then(({ data }) => {
          if (data.success) {
            setlesson(data.data?.lesson);
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

  return <LessonDetails lesson={lesson} />;
};

export default IdLesson;
