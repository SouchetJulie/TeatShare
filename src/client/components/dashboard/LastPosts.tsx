import { ILesson } from "@typing/lesson.interface";
import Link from "next/link";
import { FunctionComponent } from "react";
import Container from "react-bootstrap/Container";
import styles from "../../styles/dashboard/dashboard.module.scss";

interface Props {
  lessons: ILesson[];
}

const LastPosts: FunctionComponent<Props> = ({ lessons }: Props) => {
  // console.log(lessons);
  return (
    <Container className={styles.lastPostsContainer}>
      <h4 className={styles.subTitle}>Mes derniers posts</h4>
      <div className={styles.lastPostsList}>
        {lessons.length ? (
          lessons.map((lesson: ILesson, index: number) => {
            return (
              <Link href={`/lesson/${lesson._id}`}>
                <div
                  className={styles.post}
                  key={`lesson-${index}-${lesson.title}`}
                >
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
            <p>Vous n'avez pas de leçons</p>
          </div>
        )}
      </div>
    </Container>
  );
};
export default LastPosts;
