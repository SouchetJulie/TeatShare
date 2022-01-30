import axios, {AxiosResponse} from "axios";
import React, {FunctionComponent, useEffect, useState} from "react";

import {LessonList} from "@components/Lessons/LessonList";
import {useAppDispatch} from "@hooks/store-hook";
import {useLoginRedirect} from "@hooks/useLoginRedirect.hook";
import {addAlert} from "@stores/alert.store";
import {LessonsApiResponse} from "@typing/api-response.interface";
import {ILesson} from "@typing/lesson-file.interface";

interface Props {
  lessons: ILesson[];
}

const index: FunctionComponent<Props> = () => {
  const user = useLoginRedirect();
  const dispatch = useAppDispatch();
  const [lessons, setLessons] = useState<ILesson[]>([]);

  useEffect(() => {
    let isSubscribed = true;

    if (user) {
      axios.get<LessonsApiResponse>("/api/lesson")
        .then(({data}: AxiosResponse<LessonsApiResponse>) => {
          if (!isSubscribed) {
            return;
          }

          if (data.error) {
            dispatch(addAlert({
              message: 'Récupération des leçons échouée.',
              success: false
            }));
            return;
          }

          // Fetch successful
          setLessons(data.lessons);
        })
    }

    return () => {
      isSubscribed = false;
    }
  }, [setLessons])

  return user ? <LessonList lessons={lessons}/> : <></>;
};

export default index;
