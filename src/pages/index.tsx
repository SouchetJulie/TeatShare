import { LessonList } from "@components/lesson/list/LessonList";
import { useFetchLessons } from "@hooks/fetch-lessons.hook";
import Head from "next/head";
import { FunctionComponent } from "react";
import LandingPage from "../client/components/landing_page/LandingPage";

/**
 * Home page.
 * @constructor
 */
const Home: FunctionComponent = () => {
  const { isAuthenticated, lessons } = useFetchLessons({ isDraft: false });

  const component: JSX.Element = isAuthenticated ? (
    <LessonList lessons={lessons} title="Liste des leçons" />
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
