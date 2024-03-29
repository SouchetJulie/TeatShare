import { getLessonFileURL } from "@client/services/lesson.service";
import { getUser } from "@client/services/user.service";
import { getAxiosErrorMessage } from "@client/utils/get-axios-error.utils";
import { getUsername } from "@client/utils/get-username.utils";
import CategoryBadge from "@components/category/CategoryBadge.component";
import { GradeBadge } from "@components/grade/GradeBadge.component";
import LessonBookmark from "@components/lesson/button/LessonBookmark";
import { LessonDelete } from "@components/lesson/button/LessonDelete.component";
import { LessonEdit } from "@components/lesson/button/LessonEdit.component";
import { SubjectBadge } from "@components/subject/subject-badge.component";
import { Avatar } from "@components/ui/Avatar";
import { useAppDispatch, useAppSelector } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { selectAuthenticatedUser } from "@stores/user.store";
import styles from "@styles/lesson/LessonPost.module.scss";
import { ApiErrorResponse, ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import { IUserPublic } from "@typing/user.interface";
import { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import Link from "next/link";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Download, Printer } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface LessonHeaderComponentProps {
  lesson?: ILesson;
}

const LessonDetailsHeader: FunctionComponent<LessonHeaderComponentProps> = ({
  lesson,
}) => {
  const [author, setAuthor] = useState<IUserPublic | undefined>(undefined);
  const user = useAppSelector(selectAuthenticatedUser);
  const dispatch = useAppDispatch();
  const fileURL: string = getLessonFileURL(lesson);

  const formatDate: string = useMemo(
    () => dayjs(lesson?.publicationDate).format("DD/MM/YYYY"),
    [lesson?.publicationDate]
  );

  // Print method
  const handlePrint = () => {
    // This needs to be a dynamic import to avoid the SSR,
    // since print-js requires the `window` object to work
    import("print-js").then(({ default: printJS }) => {
      printJS({
        printable: fileURL,
        type: "pdf",
        style: "A4",
        showModal: true,
        modalMessage: "Un instant...",
      });
    });
  };
  // Download Method
  const downloadPDF = () => {
    const nameToPrint: string = lesson?.title + ".pdf";
    saveAs(fileURL, nameToPrint);
  };

  useEffect(() => {
    if (lesson?.authorId) {
      getUser(lesson.authorId)
        .then(
          ({
            data: response,
          }: AxiosResponse<ApiResponse<{ user: IUserPublic }>>) => {
            if (response.success) {
              setAuthor(response.data?.user);
            }
          }
        )
        .catch((err: AxiosError<ApiErrorResponse>) => {
          dispatch(
            addAlert({
              message: getAxiosErrorMessage(err),
              success: false,
              ttl: 2000,
            })
          );
        });
    }
  }, [lesson?.authorId]);

  const authorLink: string =
    author?._id === user?._id ? "/dashboard" : `/dashboard/${author?._id}`;

  return (
    <Row className={styles.lessonHeader}>
      <Col xs={12} md={3}>
        <Avatar user={author} size={70} />
        <p>
          <Link href={authorLink}>{getUsername(author)}</Link>
        </p>
        {author && author.subjects.length > 0 && (
          <p>Professeur de {author?.subjects?.join(", ")} </p>
        )}
        <p>Publié le {formatDate ?? ""}</p>
      </Col>
      <Col
        xs={12}
        md={6}
        className="d-flex justify-content-center align-items-center flex-column"
      >
        <h1>{lesson?.title ?? ""}</h1>
        <ListGroup horizontal className={styles.tagList}>
          {lesson?.grade && <GradeBadge grade={lesson.grade} />}
          {lesson?.subject && <SubjectBadge subject={lesson.subject} />}
          {lesson?.categoryIds.map((id: string) => (
            <CategoryBadge key={`category-${id}`} id={id} />
          ))}
        </ListGroup>
      </Col>
      <Col xs={12} md={3} className={styles.headerAction}>
        {user && author?._id === user?._id && (
          <>
            <LessonEdit lessonId={lesson?._id} size={30} />
            <LessonDelete
              size={30}
              lessonId={lesson?._id}
              lessonTitle={lesson?.title}
            />
          </>
        )}
        <LessonBookmark lessonId={lesson?._id ?? ""} size={30} />
        <Button
          variant="outline-secondary"
          className="border-0 rounded-circle"
          onClick={downloadPDF}
        >
          <Download size={30} />
        </Button>
        <Button
          variant="outline-secondary"
          className="border-0 rounded-circle"
          onClick={handlePrint}
        >
          <Printer size={30} />
        </Button>
      </Col>
    </Row>
  );
};

export default LessonDetailsHeader;
