import { ILesson } from "@typing/lesson.interface";
import Link from "next/link";
import React, { FunctionComponent } from "react";
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
              <React.Fragment key={`lesson-${index}-${lesson.title}`}>
                <Link href={`/lesson/${lesson._id}`}>
                  <div className={styles.post}>
                    <div className={styles.postCard}>
                      <p>Sujet : {lesson.title}</p>
                      <p>{lesson.subtitle} </p>
                    </div>
                  </div>
                </Link>
              </React.Fragment>
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
