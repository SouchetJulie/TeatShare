import { FunctionComponent } from "react";
import styles from "@styles/Lesson/LessonPost.module.scss";
import { ILesson } from "@typing/lesson-file.interface";
import Image from "next/image";

import sparkles from "../../../../public/icones/sparkles.png";

interface PostComponentProps {
  lesson: ILesson;
}

const lessonPost: FunctionComponent<PostComponentProps> = ({ lesson }) => {
  return (
    <div className={styles.lessonContainer}>
      <div className={styles.lessonBlock1}>
        <div>
          <Image src={"/"} width="50px" height="50px" />
          <p>publié le {lesson.publicationDate}</p>
        </div>
        <div>
          <h1>{lesson.title}</h1>
          <h3>Matiere du cours</h3>
        </div>
        <div>
          <button className={styles.printButton}>Imprimer</button>
          <button className={styles.downloadButton}>Télécharger PDF</button>
        </div>
      </div>
      <div className={styles.lessonBlock2}>
        <span>Emplacement du cours</span>
      </div>
      <div className={styles.lessonBlock3}>
        <div className={styles.forbiden}>
          <h3>Cet article est uniquement réservé aux inscrits</h3>
          <p>
            En vous inscrivant cela vous permet d’avoir accès à des contenus
            exclusifs :
          </p>
        </div>
        <div className={styles.avantages}>
          <div>
            <div>
              <Image src={sparkles} width="50px" height="50px" />
            </div>
            <h2>D’un accès à tous les articles et vidéos.</h2>
          </div>
          <div>
            <div>
              <Image src={sparkles} width="50px" height="50px" />
            </div>
            <h2>Partage de fiches.</h2>
          </div>
          <div>
            <div>
              <Image src={sparkles} width="50px" height="50px" />
            </div>
            <h2>Possibilité de chat en ligne avec d’autres professeurs.</h2>
          </div>
        </div>
        <div className={styles.callToAction}>
          <button className={styles.registerButton}>Je m&apos;inscris</button>
        </div>
      </div>
    </div>
  );
};
export default lessonPost;
