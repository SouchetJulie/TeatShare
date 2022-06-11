import React, { FunctionComponent } from "react";
import { LessonList } from "@components/lesson/list/LessonList";
import { useAutoLogin } from "@hooks/auto-login.hook";
// TODO DISPLAY LESSON MADE BY CURRENT USER

const index: FunctionComponent = () => {
  const user = useAutoLogin();

  return user ? <LessonList lessons={[]} /> : <></>;
};

export default index;
