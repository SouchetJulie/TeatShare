import LessonDetailsPDFViewer from "@components/lesson/detail/LessonDetailsPDFViewer";
import { LessonUploadForm } from "@components/lesson/upload/form/LessonUploadForm.component";
import { useAutoLogin } from "@hooks/auto-login.hook";
import styles from "@styles/lesson/upload.module.scss";
import { ILesson } from "@typing/lesson.interface";
import Head from "next/head";
import Link from "next/link";
import { FunctionComponent } from "react";
import { EyeFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
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
    <>
      <Head>
        <title>
          TeatShare -{" "}
          {lesson ? `Modifier "${lesson.title}"` : "Créer une leçon"}
        </title>
      </Head>
      <Container>
        <Row className={styles.uploadPageTitle}>
          <Col sm="auto" as="h1" className="text-primary">
            {lesson ? <>Modifier une leçon</> : "Créer une leçon"}
          </Col>
          {lesson && (
            <Col sm={1}>
              <Link href={`/lesson/${lesson._id}`}>
                <Button
                  variant="outline-primary"
                  className="border-0 p-2 rounded-circle"
                >
                  <EyeFill size={30} />
                </Button>
              </Link>
            </Col>
          )}
        </Row>
        <LessonUploadForm lesson={lesson} />
        {lesson && (
          <Row>
            <LessonDetailsPDFViewer lesson={lesson} />
          </Row>
        )}
      </Container>
    </>
  );
};

export default LessonUpload;
