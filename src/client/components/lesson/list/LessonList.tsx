import { useLessonFilterReducer } from "@components/lesson/list/lesson-filter-reducer.hook";
import { LessonListFilter } from "@components/lesson/list/LessonListFilter.component";
import styles from "@styles/lesson/lesson-list.module.scss";
import { ILesson } from "@typing/lesson.interface";
import { FunctionComponent } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LessonItem from "./LessonItem";

interface Props {
  lessons: ILesson[];
}

export const LessonList: FunctionComponent<Props> = ({ lessons }: Props) => {
  const [filters, filterDispatch] = useLessonFilterReducer();

  const filteredLessons = lessons.filter((lesson: ILesson) => {
    return (
      Object.entries(lesson)
        .map(([key, value]) => {
          // Compare the value of the filter with the value of the lesson
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
    <Container className="my-4 mb-5">
      <LessonListFilter filters={filters} filterDispatch={filterDispatch} />
      <Row className={`${styles.lessonContainer} my-4`}>
        {filteredLessons.map((lesson: ILesson) => (
          <LessonItem key={`lesson-item-${lesson._id}`} lesson={lesson} />
        ))}
      </Row>
    </Container>
  );
};
