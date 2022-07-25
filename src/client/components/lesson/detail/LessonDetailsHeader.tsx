import avatarLogo from "@assets/logos/avatar_placeholder.png";
import { getUser } from "@client/services/user.service";
import { getAxiosErrorMessage } from "@client/utils/get-axios-error.utils";
import { getUsername } from "@client/utils/get-username.utils";
import CategoryBadge from "@components/category/CategoryBadge.component";
import { GradeBadge } from "@components/grade/GradeBadge.component";
import LessonBookmark from "@components/lesson/button/LessonBookmark";
import { LessonDelete } from "@components/lesson/button/LessonDelete.component";
import { LessonEdit } from "@components/lesson/button/LessonEdit.component";
import { SubjectBadge } from "@components/subject/subject-badge.component";
import { useAppDispatch, useAppSelector } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { selectAuthenticatedUser } from "@stores/user.store";
import styles from "@styles/lesson/LessonPost.module.scss";
import { ApiErrorResponse, ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import { IUserPublic } from "@typing/user.interface";
import { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";
// @ts-ignore
import { saveAs } from "file-saver";
import Image from "next/image";
import printJS from "print-js";
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
  const fileURL: string = `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_BUCKET_NAME}/${lesson?.file.filepath}`;

  const formatDate: string = useMemo(
    () => dayjs(lesson?.publicationDate).format("DD/MM/YYYY"),
    [lesson?.publicationDate]
  );

  // Print method
  const handlePrint = () => {
    printJS(fileURL);
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

  return (
    <Row className={styles.lessonHeader}>
      <Col xs={12} md={3}>
        <Image
          placeholder={"blur"}
          className={styles.blockImage}
          src={avatarLogo}
          width="70px"
          height="70px"
        />
        <p>{getUsername(author)}</p>
        {author?.subjects?.length && (
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
