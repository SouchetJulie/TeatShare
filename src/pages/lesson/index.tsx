import React, { FunctionComponent } from "react";
import { LessonList } from "@components/lesson2/LessonList";
import { useLoginRedirect } from "@hooks/login-redirect.hook";

const index: FunctionComponent = () => {
  const user = useLoginRedirect();

  return user ? <LessonList lessons={[]} /> : <></>;
};

export default index;
