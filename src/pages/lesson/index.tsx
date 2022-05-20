import React, { FunctionComponent } from "react";
import { LessonList } from "../../client/components/lessssssson/LessonList";
import { useLoginRedirect } from "@hooks/login-redirect.hook";

const index: FunctionComponent = () => {
  const user = useLoginRedirect();

  return user ? <LessonList lessons={[]} /> : <></>;
};

export default index;
