import React, { FunctionComponent } from "react";
import { LessonList } from "@components/lessons/LessonList";
import { useLoginRedirect } from "@hooks/useLoginRedirect.hook";
import { GetStaticProps } from "next";
import { getAllLessons } from "@services/lessons.service";
import { ILesson } from "@typing/lesson-file.interface";

// @ts-ignore It is used by Next.js behind the scenes
export const getStaticProps: GetStaticProps = async () => {
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

interface Props {
  lessons: ILesson[];
}

const index: FunctionComponent<Props> = ({ lessons }) => {
  const user = useLoginRedirect();

  return user ? <LessonList lessons={lessons} /> : <></>;
};

export default index;
