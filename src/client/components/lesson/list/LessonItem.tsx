import { getUsername } from "@client/utils/get-username.utils";
import CategoryBadge from "@components/lesson/category-badge.component";
import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import styles from "@styles/lesson-item.module.scss";
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import { IUserPublic } from "@typing/user.interface";
import axios from "axios";
import Link from "next/link";
import React, { FunctionComponent, useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  lesson: ILesson;
}

const LessonItem: FunctionComponent<Props> = ({ lesson }: Props) => {
  const dispatch = useAppDispatch();
  const [author, setAuthor] = useState<IUserPublic | undefined>(undefined);

  useEffect(() => {
    let isSubscribed = true;

    axios
      .get<ApiResponse<{ user: IUserPublic }>>(`/api/user/${lesson.authorId}`)
      .then(({ data: response }) => {
        if (isSubscribed) {
          if (response.success && !!response.data) {
            setAuthor(response.data.user);
          } else {
            dispatch(
              addAlert({
                ttl: 5000,
                message: `Problème de récupération de l'auteur pour la leçon "${lesson.title}"`,
                success: false,
              })
            );
          }
        }
      })
      .catch(() => {
        dispatch(
          addAlert({
            ttl: 5000,
            message: `Problème de récupération de l'auteur pour la leçon "${lesson.title}"`,
            success: false,
          })
        );
      });

    return (): void => {
      isSubscribed = false;
    };
  }, [setAuthor]);

  return (
    <Link href={`/lesson/${lesson._id}`}>
      <Row className={styles.card}>
        <>
          {/* Subject */}
          <Col sm={1}>
            {lesson?.subject && (
              <Badge pill bg="secondary">
                {lesson?.subject}
              </Badge>
            )}
          </Col>
          {/* Title */}
          <Col sm={12} md={3}>
            <h6 className={styles.header}>{lesson.title}</h6>
          </Col>
          {/* Subtitle */}
          <Col sm={12} md={3}>
            {lesson.subtitle && (
              <Card.Subtitle className={styles.subtitle}>
                {lesson.subtitle}
              </Card.Subtitle>
            )}
          </Col>
          {/* Categories */}
          <Col sm={2}>
            {lesson.categoryIds.length > 0 && (
              <span>
                {lesson.categoryIds.map((id: string) => (
                  <CategoryBadge key={`category-${id}`} id={id} />
                ))}
              </span>
            )}
          </Col>
        </>
        {/* Author */}
        <Col sm={2} className={styles.authorLink}>
          Écrit par{" "}
          <Link href={`/user/${lesson.authorId}`}>{getUsername(author)}</Link>
        </Col>
        {/* marque-page & aperçu */}
        <Col sm={1}>(TODO)</Col>
      </Row>
    </Link>
  );
};

export default LessonItem;
