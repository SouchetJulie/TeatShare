import { LessonList } from "@components/lesson/LessonList";
import { useAppDispatch, useAppSelector } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { selectIsAuthenticated } from "@stores/user.store";
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson-file.interface";
import axios, { AxiosError, AxiosResponse } from "axios";
import Head from "next/head";
import { FunctionComponent, useEffect, useState } from "react";
import LandingPage from "../client/components/landing_page/LandingPage";
import { getAxiosErrorMessage } from "../client/utils/get-axios-error.utils";

/**
 * Home page.
 * @constructor
 */
const Home: FunctionComponent = () => {
  const isAuthenticated: boolean = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const [lessons, setLessons] = useState<ILesson[]>([]);

  useEffect(() => {
    let isSubscribed = true;

    if (isAuthenticated) {
      axios
        .get<ApiResponse<{ lessons: ILesson[] }>>("/api/lesson?isDraft=false")
        .then(
          ({
            data: { data, success },
          }: AxiosResponse<ApiResponse<{ lessons: ILesson[] }>>) => {
            if (!success) {
              dispatch(
                addAlert({
                  message: "Impossible de récupérer la liste des leçons",
                  success: false,
                  ttl: 3000,
                })
              );
            } else if (isSubscribed) {
              setLessons(data?.lessons ?? []);
            }
          }
        )
        .catch((reason: AxiosError) => {
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

  const component: JSX.Element = isAuthenticated ? (
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
