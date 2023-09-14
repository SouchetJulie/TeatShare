import sparkles from "@public/icones/sparkles.png";
import styles from "@styles/lesson/LessonPost.module.scss";
import Image from "next/image";
import { FunctionComponent } from "react";
import Placeholder from "react-bootstrap/Placeholder";

const LessonPlaceholder: FunctionComponent = () => {
  return (
    <div className={styles.lessonContainer}>
      <div className={styles.lessonBlock1}>
        <div>
          <p aria-hidden="true">
            <Placeholder animation="glow" bg={"primary"} />
          </p>
        </div>
        <div>
          <Placeholder.Button size="lg" animation="glow" />
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
              <Image alt="sparkles"src={sparkles} width="50" height="50" />
            </div>
            <h2>D’un accès à tous les articles et vidéos.</h2>
          </div>
          <div>
            <div>
              <Image alt="sparkles"src={sparkles} width="50" height="50" />
            </div>
            <h2>Partage de fiches.</h2>
          </div>
          <div>
            <div>
              <Image alt="sparkles"src={sparkles} width="50" height="50" />
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

export default LessonPlaceholder;
