import React, { FunctionComponent } from "react";
import Container from "react-bootstrap/Container";
import { GetStaticProps } from "next";

import LessonItem from "@components/lessons/LessonItem";
import { getAllLessons } from "@services/lessons.service";
import { ILesson } from "@typing/lesson-file.interface";

interface Props {
  lessons: ILesson[];
}

const Lessons: FunctionComponent<Props> = ({ lessons }: Props) => (
  <Container>
    {lessons.map((lesson: ILesson) => (
      <LessonItem key={`lesson-item-${lesson._id}`} lesson={lesson} />
    ))}
  </Container>
);

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

export default Lessons;
