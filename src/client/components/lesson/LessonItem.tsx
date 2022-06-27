import CategoryBadge from "@components/lesson/category-badge.component";
import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import styles from "@styles/lesson-item.module.scss";
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson-file.interface";
import { IUserPublic } from "@typing/user.interface";
import axios from "axios";
import Link from "next/link";
import React, { FunctionComponent, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import NavLink from "react-bootstrap/NavLink";

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

  const authorName =
    `${author?.firstName ?? ""} ${author?.lastName ?? ""}`.trim() ||
    author?.email ||
    "";

  return (
    <Card className={styles.card}>
      {/* Title */}
      <h6 className={styles.header}>
        <NavLink
          href={`/lesson/${lesson._id}`}
          className="p-0 stretched-link text-dark"
        >
          {lesson.title}
        </NavLink>
      </h6>
      {/* Subtitle */}
      {lesson.subtitle && (
        <Card.Subtitle className={styles.subtitle}>
          {lesson.subtitle}
        </Card.Subtitle>
      )}
      {/* Categories */}
      {lesson.categoryIds.length > 0 && (
        <span>
          {lesson.categoryIds.map((id: string) => (
            <CategoryBadge key={`category-${id}`} id={id} />
          ))}
        </span>
      )}
      {/* Author */}
      <span className={styles.authorLink}>
        Écrit par <Link href={`/user/${lesson.authorId}`}>{authorName}</Link>
      </span>
      <div>{/* marque-page & aperçu */}</div>
    </Card>
  );
};

export default LessonItem;
