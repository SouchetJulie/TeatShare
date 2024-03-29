import { filterLesson } from "@components/lesson/list/filter-lesson";
import { useLessonFilterReducer } from "@components/lesson/list/lesson-filter-reducer.hook";
import { LessonListFilter } from "@components/lesson/list/LessonListFilter.component";
import styles from "@styles/lesson/lesson-list.module.scss";
import { ILesson } from "@typing/lesson.interface";
import Head from "next/head";
import { FunctionComponent } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LessonListItem from "./LessonListItem";

interface Props {
  lessons: ILesson[];
  title: string;
  showAdvancedFilters?: boolean;
}

export const LessonList: FunctionComponent<Props> = ({
  lessons,
  title,
  showAdvancedFilters = false,
}: Props) => {
  const [filters, filterDispatch] = useLessonFilterReducer();

  const filteredLessons = lessons.filter((lesson) =>
    filterLesson(filters, lesson)
  );

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
        <LessonListFilter
          filters={filters}
          filterDispatch={filterDispatch}
          showAdvancedFilters={showAdvancedFilters}
        />
        <div className={styles.lessonContainer}>
          {filteredLessons.map((lesson: ILesson) => (
            <LessonListItem key={`lesson-item-${lesson._id}`} lesson={lesson} />
          ))}
        </div>
      </Container>
    </>
  );
};
