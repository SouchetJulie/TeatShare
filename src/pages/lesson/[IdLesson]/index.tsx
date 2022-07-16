import LessonDetails from "@components/lesson/detail/LessonDetails";
import { useFetchLesson } from "@hooks/fetch-lesson.hook";
import { ILesson } from "@typing/lesson.interface";

const LessonDetailsPage = () => {
  const lesson: ILesson | undefined = useFetchLesson();

  return <LessonDetails lesson={lesson} />;
};

export default LessonDetailsPage;
