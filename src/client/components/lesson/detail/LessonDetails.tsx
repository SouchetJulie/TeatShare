import LessonDetailsHeader from "@components/lesson/detail/LessonDetailsHeader";
import LessonDetailsPDFViewer from "@components/lesson/detail/LessonDetailsPDFViewer";
import styles from "@styles/lesson/LessonPost.module.scss";
import { ILesson } from "@typing/lesson.interface";
import { FunctionComponent, RefObject, useRef } from "react";
import Container from "react-bootstrap/Container";

interface LessonComponentProps {
  lesson?: ILesson;
}

const LessonDetails: FunctionComponent<LessonComponentProps> = ({ lesson }) => {
  const pdfViewerBlock: RefObject<HTMLDivElement> = useRef(null);
  return (
    <Container>
      <LessonDetailsHeader lesson={lesson} />
      <Container ref={pdfViewerBlock} className={styles.lessonBlock2}>
        <LessonDetailsPDFViewer
          lesson={lesson}
          viewerWidth={pdfViewerBlock.current?.offsetWidth ?? 0}
        />
      </Container>
    </Container>
  );
};
export default LessonDetails;
