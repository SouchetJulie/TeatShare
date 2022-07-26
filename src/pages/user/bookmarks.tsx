import { LessonList } from "@components/lesson/list/LessonList";
import { useAutoLogin } from "@hooks/auto-login.hook";
import { useFetchLessons } from "@hooks/fetch-lessons.hook";
import Head from "next/head";
import { FunctionComponent } from "react";

const ForLater: FunctionComponent = () => {
  useAutoLogin(); // route guard
  const { lessons } = useFetchLessons({ bookmarks: true });
  return (
    <>
      <Head>
        <title>TeatShare - Mes Signets</title>
      </Head>
      <LessonList lessons={lessons} />
    </>
  );
};
export default ForLater;
