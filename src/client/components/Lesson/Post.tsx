import { FunctionComponent } from "react";
import styles from "@styles/Lesson/Post.module.scss";

interface PostComponentProps {
  lesson: any;
}

const post: FunctionComponent<PostComponentProps> = ({ lesson }) => {
  return (
    <>
      <div className={styles.lessonBlock1}>
        <div>picture</div>
        <div>{lesson.title}</div>
        <div>
          <button>Imprimer</button>
          <button>Télécharger PDF</button>
        </div>
      </div>
    </>
  );
};
export default post;
