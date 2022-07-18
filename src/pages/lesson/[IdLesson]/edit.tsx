import LessonUpload from "@components/lesson/upload/LessonUpload.component";
import { useFetchLesson } from "@hooks/fetch-lesson.hook";
import { ILesson } from "@typing/lesson.interface";

const EditLessonPage = () => {
  const lesson: ILesson | undefined = useFetchLesson();

  return <LessonUpload lesson={lesson} />;
};

export default EditLessonPage;
