import styles from "@styles/dashboard/dashboard.module.scss";
import { ILesson } from "@typing/lesson.interface";
import Link from "next/link";
import { FunctionComponent } from "react";
import Container from "react-bootstrap/Container";

interface Props {
  lessons: ILesson[];
}

const LastPosts: FunctionComponent<Props> = ({ lessons }: Props) => {
  return (
    <Container className={styles.lastPostsContainer}>
      <h4 className={styles.subTitle}>Derniers posts</h4>
      <div className={styles.lastPostsList}>
        {lessons.length ? (
          lessons.map((lesson: ILesson, index: number) => {
            return (
              <Link
                href={`/lesson/${lesson._id}`}
                key={`lesson-${index}-${lesson.title}`}
              >
                <div className={styles.post}>
                  <div className={styles.postCard}>
                    <p>Sujet : {lesson.title}</p>
                    <p>{lesson.subtitle} </p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className={styles.noLesson}>
            <p>Pas de leçons</p>
          </div>
        )}
      </div>
    </Container>
  );
};
export default LastPosts;
