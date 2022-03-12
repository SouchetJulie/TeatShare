import Head from "next/head";
import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthenticatedUser } from "@stores/user.store";
import { LessonList } from "@components/Lesson/LessonList";
import { ILesson } from "@typing/lesson-file.interface";
import LandingPage from "@components/LandingPage/LandingPage";
import { useAppDispatch } from "@hooks/store-hook";
import axios, { AxiosResponse } from "axios";
import { LessonsApiResponse } from "@typing/api-response.interface";
import { addAlert } from "@stores/alert.store";

/**
 * Home page.
 * @constructor
 */
const Home: FunctionComponent = () => {
  const user = useSelector(selectAuthenticatedUser);
  const dispatch = useAppDispatch();
  const [lessons, setLessons] = useState<ILesson[]>([]);

  useEffect(() => {
    let isSubscribed = true;

    if (user) {
      axios
        .get<LessonsApiResponse>("/api/lesson")
        .then(({ data }: AxiosResponse<LessonsApiResponse>) => {
          if (!isSubscribed) {
            return;
          }

          if (data.error) {
            dispatch(
              addAlert({
                message: "Récupération des leçons échouée.",
                success: false,
              })
            );
            return;
          }

          // Fetch successful
          setLessons(data.lessons);
        });
    }

    return () => {
      isSubscribed = false;
    };
  }, [setLessons]);

  const component: JSX.Element = user ? (
    <LessonList lessons={lessons} />
  ) : (
    <LandingPage />
  );
  return (
    <>
      <Head>
        <title>TeatShare - Accueil</title>
      </Head>
      {component}
    </>
  );
};

export default Home;
