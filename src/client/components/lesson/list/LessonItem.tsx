import { getUser } from "@client/services/user.service";
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
import styles from "@styles/lesson/lesson-item.module.scss";
import { ILesson } from "@typing/lesson.interface";
import { IUserPublic } from "@typing/user.interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  lesson: ILesson;
}

const LessonItem: FunctionComponent<Props> = ({ lesson }: Props) => {
  const router = useRouter();
  const user = useAppSelector(selectAuthenticatedUser);
  const dispatch = useAppDispatch();
  const [author, setAuthor] = useState<IUserPublic | undefined>(undefined);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    getUser(lesson.authorId)
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

  const goToLesson = (): void => {
    router.push(`/lesson/${lesson._id}`);
  };

  const prepareLessonFetch = (): void => {
    setIsHovering(true);
    setTimeout(() => {
      if (isHovering) router.prefetch(`/lesson/${lesson._id}`);
    }, 500);
  };

  return (
    <Row
      className={styles.card}
      onClick={goToLesson}
      onMouseEnter={prepareLessonFetch}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Subject */}
      <Col sm={1} className={styles.column}>
        {lesson?.grade && <GradeBadge grade={lesson.grade} />}
        {lesson?.subject && <SubjectBadge subject={lesson.subject} />}
      </Col>
      {/* Title */}
      <Col sm={12} md={3} className={styles.column}>
        <h6 className={`${styles.header} ${styles.column}`}>
          <Link href={`/lesson/${lesson._id}`} passHref>
            <a>{lesson.title}</a>
          </Link>
        </h6>
      </Col>
      {/* Subtitle */}
      <Col sm={12} md={3} className={styles.column}>
        {lesson.subtitle && (
          <Card.Subtitle className={styles.subtitle}>
            {lesson.subtitle}
          </Card.Subtitle>
        )}
      </Col>
      {/* Categories */}
      <Col sm={2} className={styles.column}>
        {lesson.categoryIds.length > 0 && (
          <span>
            {lesson.categoryIds.map((id: string) => (
              <CategoryBadge key={`category-${id}`} id={id} />
            ))}
          </span>
        )}
      </Col>
      {/* Author */}
      <Col sm={2} className={styles.column}>
        Écrit par{" "}
        <Link href={`/user/${lesson.authorId}`}>{getUsername(author)}</Link>
      </Col>
      {/* marque-page, aperçu, modification */}
      <Col sm={1}>
        {user && author?._id === user?._id && (
          <>
            <LessonEdit lessonId={lesson._id} size={20} />
            <LessonDelete
              size={20}
              lessonId={lesson._id}
              lessonTitle={lesson.title}
            />
          </>
        )}
        <LessonBookmark lessonId={lesson._id ?? ""} size={20} />
      </Col>
    </Row>
  );
};

export default LessonItem;
