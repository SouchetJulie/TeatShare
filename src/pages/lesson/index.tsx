import { LessonList } from "@components/lesson/list/LessonList";
import { useAutoLogin } from "@hooks/auto-login.hook";
import { FunctionComponent } from "react";
// TODO DISPLAY LESSON MADE BY CURRENT USER

const index: FunctionComponent = () => {
  const user = useAutoLogin();

  return user ? <LessonList lessons={[]} /> : <></>;
};

export default index;
