import LessonDetailsPDFViewer from "@components/lesson/detail/LessonDetailsPDFViewer";
import { LessonUploadForm } from "@components/lesson/upload/form/LessonUploadForm.component";
import { useAutoLogin } from "@hooks/auto-login.hook";
import styles from "@styles/lesson/upload.module.scss";
import { ILesson } from "@typing/lesson.interface";
import { FunctionComponent } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

interface LessonUploadProps {
  lesson?: ILesson;
}

const LessonUpload: FunctionComponent<LessonUploadProps> = ({
  lesson,
}: LessonUploadProps) => {
  useAutoLogin(); // Route guard

  return (
    <Container>
      <Row>
        <h1 className={styles.uploadPageTitle}>
          {lesson ? "Modifier une leçon" : "Créer une leçon"}
        </h1>
        <LessonUploadForm lesson={lesson} />
      </Row>
      {lesson && (
        <Row>
          <LessonDetailsPDFViewer lesson={lesson} />
        </Row>
      )}
    </Container>
  );
};

export default LessonUpload;
