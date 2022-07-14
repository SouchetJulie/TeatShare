import avatarLogo from "@assets/logos/avatar_placeholder.png";
import { getUser } from "@client/services/user.service";
import { getAxiosErrorMessage } from "@client/utils/get-axios-error.utils";
import { getUsername } from "@client/utils/get-username.utils";
import CategoryBadge from "@components/category/category-badge.component";
import LessonBookmark from "@components/lesson/LessonBookmark";
import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import styles from "@styles/lesson/LessonPost.module.scss";
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import { IUserPublic } from "@typing/user.interface";
import { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Download, Printer } from "react-bootstrap-icons";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// eslint-disable-next-line camelcase

interface LessonHeaderComponentProps {
  lesson?: ILesson;
}

const LessonDetailsHeader: FunctionComponent<LessonHeaderComponentProps> = ({
  lesson,
}) => {
  const [author, setAuthor] = useState<IUserPublic | undefined>(undefined);
  const dispatch = useAppDispatch();

  const formatDate: string = useMemo(
    () => dayjs(lesson?.publicationDate).format("DD/MM/YYYY"),
    [lesson?.publicationDate]
  );

  useEffect(() => {
    if (lesson?.authorId) {
      getUser(lesson.authorId)
        .then(({ data }: AxiosResponse<ApiResponse<{ user: IUserPublic }>>) => {
          setAuthor(data.data?.user);
        })
        .catch((err: AxiosError) => {
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
        <p>publié le {formatDate ?? ""}</p>
      </Col>
      <Col
        xs={12}
        md={6}
        className=" d-flex justify-content-center align-items-center flex-column"
      >
        <h1>{lesson?.title ?? ""}</h1>
        <ListGroup horizontal className="align-items-center">
          {lesson?.grade && (
            <Badge className="mx-1" pill bg="secondary">
              {lesson?.grade}
            </Badge>
          )}
          {lesson?.subject && (
            <Badge className="mx-1" pill bg="primary">
              {lesson?.subject}
            </Badge>
          )}
          {lesson?.categoryIds.map((id: string) => (
            <CategoryBadge key={`category-${id}`} id={id} />
          ))}
        </ListGroup>
      </Col>
      <Col xs={12} md={3} className={styles.headerAction}>
        <Button variant="none">
          <Download color="black" size={30} />
        </Button>
        <Button variant="none">
          <Printer color="black" size={30} />
        </Button>
        <LessonBookmark lessonId={lesson?._id ?? ""} size={30} />
      </Col>
    </Row>
  );
};

export default LessonDetailsHeader;
