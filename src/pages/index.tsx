import Head from "next/head";
import { FunctionComponent } from "react";
import { selectAuthenticatedUser } from "@stores/user.store";
import { LessonList } from "@components/lessons/LessonList";
import { ILesson } from "@typing/lesson-file.interface";
import { GetStaticProps } from "next";
import { getAllLessons } from "@services/lessons.service";
import LandingPage from "@components/LandingPage/LandingPage";
import { useAppSelector } from "@hooks/store-hook";

interface Props {
  lessons: ILesson[];
}

/**
 * Home page.
 * @constructor
 */
const Home: FunctionComponent<Props> = ({ lessons }) => {
  const user = useAppSelector(selectAuthenticatedUser);
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

// @ts-ignore It is used by Next.js behind the scenes
export const getStaticProps: GetStaticProps = async () => {
  // TODO don't load the lessons when unauthenticated
  const result = await getAllLessons();

  if ("error" in result) {
    return {
      props: {
        lessons: [],
      },
    };
  }

  const lessons = result.map(
    (lesson: ILesson) => JSON.parse(JSON.stringify(lesson)) // so all complex types are guaranteed to be serializable
  );

  return {
    props: {
      lessons,
    },
  };
};
