import { LessonList } from "@components/lesson/list/LessonList";
import { useAutoLogin } from "@hooks/auto-login.hook";
import { useFetchLessons } from "@hooks/fetch-lessons.hook";
import { FunctionComponent } from "react";

const index: FunctionComponent = () => {
  const user = useAutoLogin();
  const { lessons } = useFetchLessons({ author: user?._id });

  return <LessonList lessons={lessons} title="Mes leçons" />;
};

export default index;
