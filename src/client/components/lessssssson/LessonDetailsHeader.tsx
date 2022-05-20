import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "@styles/Lesson/LessonPost.module.scss";
import Image from "next/image";

import { ILesson } from "@typing/lesson-file.interface";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BookmarkCheck } from "react-bootstrap-icons";
import dayjs from "dayjs";
import avatarLogo from "@assets/logos/avatar_placeholder.png";
import axios from "axios";
import { IUserPublic } from "@typing/user.interface";
import { addAlert } from "@stores/alert.store";
import { ApiResponse } from "@typing/api-response.interface";
import { useAppDispatch } from "@hooks/store-hook";

interface LessonHeaderComponentProps {
  lesson?: ILesson;
}

const LessonDetailsHeader: FunctionComponent<LessonHeaderComponentProps> = ({
  lesson,
}) => {
  const [author, setAuthor] = useState<IUserPublic | undefined>(undefined);
  const dispatch = useAppDispatch();
  const formatDate: string = dayjs(lesson?.publicationDate).format(
    "DD/MM/YYYY"
  );

  const sparkles = undefined;
  const avatar = sparkles ? sparkles : avatarLogo;

  useEffect(() => {
    if (lesson?.authorId) {
      axios
        .get<ApiResponse<{ user: IUserPublic }>>(`/api/user/${lesson.authorId}`)
        .then(({ data }) => {
          setAuthor(data.data?.user);
          addAlert({ message: data.error, success: false, ttl: 2000 });
        })
        .catch((err: Error) => {
          dispatch(
            addAlert({ message: err.message, success: false, ttl: 2000 })
          );
        });
    }
  }, []);

  return (
    <Row className={styles.lessonHeader}>
      <Col xs={12} md={3}>
        <Image
          placeholder={"blur"}
          className={styles.blockImage}
          src={avatar}
          width="70px"
          height="70px"
        />
        <p>
          {author?.firstName ?? ""} {author?.lastName ?? ""}
        </p>
        <p>Professeur de {author?.subjects.join(", ") ?? ""} </p>
        <p>publié le {formatDate ?? ""}</p>
      </Col>
      <Col
        xs={12}
        md={6}
        className=" d-flex justify-content-center align-items-center flex-column"
      >
        <h1>{lesson?.title ?? ""}</h1>
        {/* <h3>{lessssssson}</h3> */}
      </Col>
      <Col xs={12} md={3} className={styles.headerAction}>
        <Button variant="primary">Imprimer</Button>
        <Button variant="secondary-light">Télécharger PDF</Button>
        <Button variant="none">
          <BookmarkCheck color="black" size={40} />
        </Button>
      </Col>
    </Row>
  );
};

export default LessonDetailsHeader;
