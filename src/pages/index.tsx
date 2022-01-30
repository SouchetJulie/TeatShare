import Head from "next/head";
import {FunctionComponent} from "react";
import {useSelector} from "react-redux";
import {selectAuthenticatedUser} from "@stores/user.store";
import {LessonList} from "@components/Lesson/LessonList";
import {ILesson} from "@typing/lesson-file.interface";
import {GetStaticProps} from "next";
import {getAllLessons} from "@services/lessons.service";
import LandingPage from "@components/LandingPage/LandingPage";

interface Props {
  lessons: ILesson[];
}

/**
 * Home page.
 * @constructor
 */
const Home: FunctionComponent<Props> = ({lessons}) => {
  const user = useSelector(selectAuthenticatedUser);
  const component: JSX.Element = user ? (
    <LessonList lessons={lessons}/>
  ) : (
    <LandingPage/>
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
