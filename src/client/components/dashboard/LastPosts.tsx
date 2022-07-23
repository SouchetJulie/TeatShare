import { FunctionComponent } from "react";
import Container from "react-bootstrap/Container";
import styles from "../../styles/dashboard/dashboard.module.scss";

interface Props {}

const LastPosts: FunctionComponent<Props> = ({}: Props) => {
  const tab = [1, 2, 3, 4, 5, 6, 7, 1, 1, 1, 1, 1, 1, 1];
  return (
    <Container className={styles.lastPostsContainer}>
      <h3>Mes derniers posts</h3>
      <div className={styles.lastPostsList}>
        {tab.map(() => {
          return (
            <div className={styles.post}>
              <div className={styles.postCard}>
                <p>Sujet : Lorem Ipsum</p>
                <p>Lorem Ipsum is simply dummy text </p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};
export default LastPosts;
