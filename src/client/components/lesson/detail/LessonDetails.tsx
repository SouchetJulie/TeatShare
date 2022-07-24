import LessonDetailsHeader from "@components/lesson/detail/LessonDetailsHeader";
import LessonDetailsPDFViewer from "@components/lesson/detail/LessonDetailsPDFViewer";
import { ILesson } from "@typing/lesson.interface";
import Head from "next/head";
import { FunctionComponent } from "react";
import Container from "react-bootstrap/Container";

interface LessonComponentProps {
  lesson?: ILesson;
}

const LessonDetails: FunctionComponent<LessonComponentProps> = ({ lesson }) => {
  return (
    <>
      <Head>
        <title>TeatShare - "{lesson?.title}"</title>
      </Head>
      <Container>
        <LessonDetailsHeader lesson={lesson} />
        <LessonDetailsPDFViewer lesson={lesson} />
      </Container>
    </>
  );
};
export default LessonDetails;
