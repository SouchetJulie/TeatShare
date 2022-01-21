import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import NavLink from "react-bootstrap/NavLink";

import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import styles from "@styles/lesson-item.module.scss";
import { ILesson } from "@typing/lesson-file.interface";
import { IUserPublic } from "@typing/user.interface";
import { createEmptyUser } from "@utils/create-empty-user";

interface Props {
  lesson: ILesson;
}

const LessonItem: FunctionComponent<Props> = ({ lesson }: Props) => {
  const dispatch = useAppDispatch();
  const [author, setAuthor] = useState<IUserPublic>(createEmptyUser());

  useEffect(() => {
    let isSubscribed = true;

    axios
      .get(`/api/user/${lesson.authorId}`)
      .then(({ data }) => {
        if (isSubscribed) {
          if (data.success) {
            setAuthor(data.user);
          } else {
            dispatch(
              addAlert({
                message: `Problème de lecture de l'auteur de la leçon "${lesson.title}"`,
                success: false,
              })
            );
          }
        }
      })
      .catch(() =>
        dispatch(
          addAlert({
            message: `Problème de lecture de l'auteur de la leçon "${lesson.title}"`,
            success: false,
          })
        )
      );

    return (): void => {
      isSubscribed = false;
    };
  }, [setAuthor]);

  return (
    <Card className={styles.card}>
      <div>{/* badges */}</div>
      <div className={styles.main}>
        <h6 className={styles.header}>
          <NavLink
            href={`/api/lesson/${lesson._id}`}
            className="p-0 stretched-link text-dark"
          >
            {lesson.title}
          </NavLink>
          <span>{/* hashtags */}</span>
          <span className={styles.authorLink}>
            Écrit par{" "}
            <Link href={`/api/user/${lesson.authorId}`}>
              {`${author.firstName} ${author.lastName}`}
            </Link>
          </span>
        </h6>
        {lesson.subtitle && (
          <Card.Subtitle className={styles.subtitle}>
            {lesson.subtitle}
          </Card.Subtitle>
        )}
      </div>
      <div>{/* marque-page & aperçu */}</div>
    </Card>
  );
};

export default LessonItem;