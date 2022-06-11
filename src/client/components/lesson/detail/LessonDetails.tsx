import { FunctionComponent, RefObject, useRef } from "react";
import styles from "@styles/lesson/LessonPost.module.scss";
import { ILesson } from "@typing/lesson.interface";
// import Image from "next/image";
// import sparkles from "../../../../public/icones/sparkles.png";
import Container from "react-bootstrap/Container";
import LessonDetailsHeader from "@components/lesson/detail/LessonDetailsHeader";
import LessonDetailsPDFViewer from "@components/lesson/detail/LessonDetailsPDFViewer";

interface LessonComponentProps {
  lesson?: ILesson;
}

const LessonDetails: FunctionComponent<LessonComponentProps> = ({ lesson }) => {
  const pdfViewerBlock: RefObject<HTMLDivElement> = useRef(null);
  return (
    <Container>
      <LessonDetailsHeader lesson={lesson} />
      <Container ref={pdfViewerBlock} className={styles.lessonBlock2}>
        <LessonDetailsPDFViewer
          lesson={lesson}
          viewerWidth={pdfViewerBlock.current?.offsetWidth ?? 0}
        />
      </Container>
      {/*
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
      </div>*/}
    </Container>
  );
};
export default LessonDetails;
