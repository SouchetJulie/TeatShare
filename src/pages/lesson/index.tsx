import React, { FunctionComponent } from "react";
import { LessonList } from "@components/lesson/LessonList";
import { useLoginRedirect } from "@hooks/login-redirect.hook";
// TODO DISPLAY LESSON MADE BY CURRENT USER

const index: FunctionComponent = () => {
  const user = useLoginRedirect();

  return user ? <LessonList lessons={[]} /> : <></>;
};

export default index;
