import { LessonList } from "@components/lesson/list/LessonList";
import { useAutoLogin } from "@hooks/auto-login.hook";
import { useFetchLessons } from "@hooks/fetch-lessons.hook";
import { FunctionComponent } from "react";

const ForLater: FunctionComponent = () => {
  useAutoLogin(); // route guard
  const { lessons } = useFetchLessons({ bookmarks: true });
  return <LessonList lessons={lessons} title="Mes signets" />;
};
export default ForLater;
