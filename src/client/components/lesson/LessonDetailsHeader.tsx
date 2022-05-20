import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import styles from "@styles/lesson/LessonPost.module.scss";
import Image from "next/image";

import { ILesson } from "@typing/lesson-file.interface";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {
  BookmarkCheck,
  BookmarkCheckFill,
  Download,
  Printer,
} from "react-bootstrap-icons";
import dayjs from "dayjs";
import avatarLogo from "@assets/logos/avatar_placeholder.png";
import axios from "axios";
import { IUserPublic } from "@typing/user.interface";
import { addAlert } from "@stores/alert.store";
import { ApiResponse } from "@typing/api-response.interface";
import { useAppDispatch } from "@hooks/store-hook";
import LessonBookmark from "@components/lesson/LessonBookmark";

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
  console.log("data: ", lesson);
  const sparkles = undefined;
  const avatar = sparkles ? sparkles : avatarLogo;

  useEffect(() => {
    if (lesson?.authorId) {
      axios
        .get<ApiResponse<{ user: IUserPublic }>>(`/api/user/${lesson.authorId}`)
        .then(({ data }) => {
          console.log(data.data);
          setAuthor(data.data?.user);
          // TODO  addAlert({ message: data.error, success: false, ttl: 2000 });
        })
        .catch((err: Error) => {
          dispatch(
            addAlert({ message: err.message, success: false, ttl: 2000 })
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
          src={avatar}
          width="70px"
          height="70px"
        />
        <p>
          {author?.firstName ?? ""} {author?.lastName ?? ""}
        </p>
        {author?.subjects.length ? (
          <p>Professeur de {author?.subjects.join(", ")} </p>
        ) : (
          <></>
        )}
        <p>publié le {formatDate ?? ""}</p>
      </Col>
      <Col
        xs={12}
        md={6}
        className=" d-flex justify-content-center align-items-center flex-column"
      >
        <h1>{lesson?.title ?? ""}</h1>
        {/* <h3>{lesson}</h3> */}
      </Col>
      <Col xs={12} md={3} className={styles.headerAction}>
        <Button variant="none">
          <Download color="black" size={30} />
        </Button>
        <Button variant="none">
          <Printer color="black" size={30} />
        </Button>
        <Button variant="none">
          <LessonBookmark
            isBookmarked={lesson && author?.bookmarkIds.includes(lesson._id!)}
          />
        </Button>
      </Col>
    </Row>
  );
};

export default LessonDetailsHeader;
