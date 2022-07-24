import { useLessonFilterReducer } from "@components/lesson/list/lesson-filter-reducer.hook";
import { LessonListFilter } from "@components/lesson/list/LessonListFilter.component";
import styles from "@styles/lesson/lesson-list.module.scss";
import { ILesson } from "@typing/lesson.interface";
import Head from "next/head";
import { FunctionComponent } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LessonItem from "./LessonItem";

interface Props {
  lessons: ILesson[];
  title: string;
}

export const LessonList: FunctionComponent<Props> = ({
  lessons,
  title,
}: Props) => {
  const [filters, filterDispatch] = useLessonFilterReducer();

  const filteredLessons = lessons.filter((lesson: ILesson) => {
    return (
      Object.entries(lesson)
        .map(([key, value]) => {
          // Keep the lesson if its value includes the corresponding filter value
          return (
            !filters[key as keyof ILesson] ||
            filters[key as keyof ILesson] === value ||
            (typeof value === "string" &&
              typeof filters[key as keyof ILesson] === "string" &&
              value.includes(filters[key as keyof ILesson] as string))
          );
        })
        // Keep lessons that match all filters
        .every(Boolean)
    );
  });

  return (
    <>
      <Head>
        <title>TeatShare - {title}</title>
      </Head>
      <Container>
        <Row className="mt-5 justify-content-center">
          <Col sm="auto" as="h1" className="text-secondary">
            {title}
          </Col>
        </Row>
        <LessonListFilter filters={filters} filterDispatch={filterDispatch} />
        <Row className={`${styles.lessonContainer} my-4`}>
          {filteredLessons.map((lesson: ILesson) => (
            <LessonItem key={`lesson-item-${lesson._id}`} lesson={lesson} />
          ))}
        </Row>
      </Container>
    </>
  );
};
